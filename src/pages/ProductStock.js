import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import ProductionServices from "services/ProductionServices";
import useAsync from "hooks/useAsync";
import PageTitle from "components/Typography/PageTitle";

const ItemStock = () => {
  const { data } = useAsync(ProductionServices.getProductions);
  const [itemStockData, setItemStockData] = useState([]);

  const { t } = useTranslation();
  const generateItemStock = () => {
    const itemStockMap = new Map();
  
    data?.forEach((purchase) => {
      purchase.products.forEach((product) => {
        const itemLabel = product.label;
        const purchaseQuantity = parseInt(purchase.quantity);
  
        const existingItemData = itemStockMap.get(itemLabel);
  
        if (existingItemData) {
          const updatedStockcount = existingItemData.stockcount + purchaseQuantity;
          const updatedLastStockQuantity = purchaseQuantity;
          const updatedLastStockDate = purchase.createdAt;
  
          itemStockMap.set(itemLabel, {
            ...existingItemData,
            stockcount: updatedStockcount,
            lastStock: {
              quantity: updatedLastStockQuantity,
              date: updatedLastStockDate,
            },
          });
        } else {
          itemStockMap.set(itemLabel, {
            category: purchase?.variants[0]?.label,
            item: product.label,
            stockcount: purchaseQuantity,
            lastStock: {
              quantity: purchaseQuantity,
              date: purchase.createdAt,
            },
          });
        }
      });
    });
  
    // Merge and update the items in itemStockData
    const updatedItemStockData = itemStockData.map((item) => {
      const newItemData = itemStockMap.get(item.item);
      return newItemData ? newItemData : item;
    });
  
    // Add new items that were not present before
    itemStockMap.forEach((value, key) => {
      if (!itemStockData.some((item) => item.item === key)) {
        updatedItemStockData.push(value);
      }
    });
  
    // Set the updated itemStockData
    setItemStockData(updatedItemStockData);
  };
  
  // const generateItemStock = () => {
  //   const itemStockMap = new Map();

  //   data?.forEach((purchase) => {
  //     purchase.products.forEach((product) => {
  //       const itemLabel = product.label;

  //       const existingItemData = itemStockMap.get(itemLabel);
  //       const purchaseQuantity = parseInt(purchase.quantity);

  //       if (existingItemData) {
  //         const updatedStockcount =
  //           existingItemData.stockcount + purchaseQuantity;
  //         const updatedLastStockQuantity = purchaseQuantity;
  //         const updatedLastStockDate = purchase.createdAt;

  //         itemStockMap.set(itemLabel, {
  //           ...existingItemData,
  //           stockcount: updatedStockcount,
  //           lastStock: {
  //             quantity: updatedLastStockQuantity,
  //             date: updatedLastStockDate,
  //           },
  //         });
  //       } else {
  //         itemStockMap.set(itemLabel, {
  //           category: purchase?.variants[0]?.label,
  //           item: product.label,
  //           stockcount: purchaseQuantity,
  //           lastStock: {
  //             quantity: purchaseQuantity,
  //             date: purchase.createdAt,
  //           },
  //         });
  //       }
  //     });
  //   });

  //   const itemStock = Array.from(itemStockMap.values());

  //   setItemStockData(itemStock);
  // };

  useEffect(() => {
    if (data) {
      generateItemStock();
    }
  }, [data]);

  return (
    <>
      <PageTitle>{t("Production Stock")}</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t("S No")}</TableCell>
              <TableCell>{t("Item")}</TableCell>
              <TableCell>{t("Category")}</TableCell>
              <TableCell>{t("Stock Count")}</TableCell>
              <TableCell>{t("Last Stock")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {itemStockData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stockcount}</TableCell>
                <TableCell>
                  Quantity: {item.lastStock.quantity}
                  <br />
                  Date: {new Date(item.lastStock.date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemStock;
