// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
//   TableRow,
// } from "@windmill/react-ui";import { useTranslation } from "react-i18next";
// import PurchaseServices from "services/PurchaseServices";
// import useAsync from "hooks/useAsync";
// import PageTitle from "components/Typography/PageTitle";

// const ItemStock = () => {
//   const { data } = useAsync(PurchaseServices.getAllPurchases);
//   const [itemStockData, setItemStockData] = useState([]);

//   const { t } = useTranslation();

//   const generateItemStock = async() => {
//     const itemStockMap = new Map();

//     data?.forEach((purchase) => {
//       purchase.products.forEach((product) => {
//         const itemLabel = product.label;

//         const existingItemData = itemStockMap.get(itemLabel);

//         if (existingItemData) {
//           // Check if the existing item stock count is higher than the current purchase quantity
//           if (existingItemData.stockcount > parseInt(purchase.quantity)) {
//             itemStockMap.set(itemLabel, {
//               ...existingItemData,
//               stockcount: existingItemData.stockcount - parseInt(purchase.quantity)* -1,
//               lastStock: {
//                 quantity: parseInt(purchase.quantity) , // Negative quantity for reduction
//                 vendor: purchase.title,
//                 date: purchase.createdAt,
//               },
//             });
//           }
//           else {
//             // Increment the stock count when new purchases are made for the same item
//             itemStockMap.set(itemLabel, {
//               ...existingItemData,
//               stockcount: existingItemData.stockcount + parseInt(purchase.quantity),
//               lastStock: {
//                 quantity: parseInt(purchase.quantity),
//                 vendor: purchase.title,
//                 date: purchase.createdAt,
//               },
//             });
//           }
//         } else {
//           itemStockMap.set(itemLabel, {
//             category: purchase.category[0]?.label,
//             item: product.label,
//             stockcount: parseInt(purchase.quantity),
//             lastStock: {
//               quantity: parseInt(purchase.quantity),
//               vendor: purchase.title,
//               date: purchase.createdAt,
//             },
//           });
//         }
//       });
//     });

//     const itemStock = Array.from(itemStockMap, ([item, values]) => ({
//       ...values,
//     }));

//     setItemStockData(itemStock);
//   };

//   useEffect(() => {
//     if (data) {
//       generateItemStock();
//     }
//   }, [data]);

//   return (
//     <>
//       <PageTitle>{t("Item Stock")}</PageTitle>

//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell>{t("S No")}</TableCell>
//               <TableCell>{t("Category")}</TableCell>
//               <TableCell>{t("Item")}</TableCell>
//               <TableCell>{t("Stock Count")}</TableCell>
//               <TableCell>
//                 {t("Last Stock")}
//                 {/* <br/>
//                 {t("Quantity")}, {t("Vendor")}, {t("Date")} */}
//               </TableCell>
//             </tr>
//           </TableHeader>
//           {itemStockData.length > 0 && (
//             <TableBody>
//               {itemStockData.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{item.category}</TableCell>
//                   <TableCell>{item.item}</TableCell>
//                   <TableCell>{item.stockcount}</TableCell>
//                   <TableCell>
//                    Quantity :  {item.lastStock.quantity}
//                    <br/>
//                    Vendor : {item.lastStock.vendor}
//                    <br/>
//                    Date :  {item.lastStock.date}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default ItemStock;

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
import PurchaseServices from "services/PurchaseServices";
import useAsync from "hooks/useAsync";
import PageTitle from "components/Typography/PageTitle";

const ItemStock = () => {
  const { data } = useAsync(PurchaseServices.getAllPurchases);
  const [itemStockData, setItemStockData] = useState([]);
  const [remainingStock, setRemainingStock] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const storedItemStockData = localStorage.getItem("itemStockData");
    if (storedItemStockData) {
      setItemStockData(JSON.parse(storedItemStockData));
    }
  }, []);

  const saveItemStockDataToLocalStorage = (data) => {
    const stockcountData = data.map((item) => ({
      item: item.item,
      stockcount: item.stockcount,
    }));

    localStorage.setItem("itemStockData", JSON.stringify(stockcountData));
  };

  const generateItemStock = () => {
    const itemStockMap = new Map();

    data?.forEach((purchase) => {
      purchase.products.forEach((product) => {
        const itemLabel = product.label;

        const existingItemData = itemStockMap.get(itemLabel);

        if (existingItemData) {
          if (existingItemData.stockcount > parseInt(purchase.quantity)) {
            itemStockMap.set(itemLabel, {
              ...existingItemData,
              stockcount:
                existingItemData.stockcount - parseInt(purchase.quantity) * -1,
              lastStock: {
                quantity: parseInt(purchase.quantity),
                vendor: purchase.title,
                date: purchase.createdAt,
              },
            });
          } else {
            itemStockMap.set(itemLabel, {
              ...existingItemData,
              stockcount:
                existingItemData.stockcount + parseInt(purchase.quantity),
              lastStock: {
                quantity: parseInt(purchase.quantity),
                vendor: purchase.title,
                date: purchase.createdAt,
              },
            });
          }
        } else {
          itemStockMap.set(itemLabel, {
            category: purchase.category[0]?.label,
            item: product.label,
            stockcount: parseInt(purchase.quantity),
            lastStock: {
              quantity: parseInt(purchase.quantity),
              vendor: purchase.title,
              date: purchase.createdAt,
            },
          });
        }
      });
    });

    const itemStock = Array.from(itemStockMap, ([item, values]) => ({
      ...values,
    }));

    setItemStockData(itemStock);
    saveItemStockDataToLocalStorage(itemStock);
  };

  const calculateRemainingStock = () => {
    fetch("https://attica.onrender.com/api/productions/")
      .then((response) => response.json())
      .then((productionData) => {
        const tempRemainingStockMap = new Map();

        productionData.forEach((production) => {
          production.selectedItems.forEach((selectedItem) => {
            const matchingItem = itemStockData.find(
              (itemData) => itemData.item === selectedItem.item.label
            );

            if (matchingItem) {
              const existingStock =
                tempRemainingStockMap.get(selectedItem.item.label) || 0;
              const newStock = existingStock + selectedItem.quantity;
              tempRemainingStockMap.set(selectedItem.item.label, newStock);
            }
          });
        });

        const remainingStockData = Array.from(
          tempRemainingStockMap,
          ([item, quantity]) => {
            const matchingItem = itemStockData.find(
              (itemData) => itemData.item === item
            );

            if (matchingItem) {
              const remaining = Math.max(matchingItem.stockcount - quantity, 0);
              return { item, remainingStock: remaining };
            }

            return null;
          }
        ).filter(Boolean); // Filter out the null entries

        setRemainingStock(remainingStockData);
      })
      .catch((error) => {
        console.error("Error fetching production data:", error);
      });
  };

  useEffect(() => {
    if (data) {
      generateItemStock();
    }
  }, [data]);

  useEffect(() => {
    calculateRemainingStock();
  }, [itemStockData]);

  return (
    <>
      <PageTitle>{t("Item Stock")}</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t("S No")}</TableCell>
              <TableCell>{t("Category")}</TableCell>
              <TableCell>{t("Item")}</TableCell>
              <TableCell>{t("Purchased Stock Count")}</TableCell>
              <TableCell>{t("Remaining Count")}</TableCell>
                <TableCell>{t("Last Stock")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {itemStockData.map((item, index) => {
              const matchingRemainingStock = remainingStock.find(
                (stock) => stock.item === item.item
              );
              const remainingCount = matchingRemainingStock
                ? matchingRemainingStock.remainingStock
                : 0;

              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.stockcount}</TableCell>
                  <TableCell>{remainingCount}</TableCell>
                  <TableCell>
                    Quantity: {item.lastStock.quantity}&nbsp;&nbsp;&nbsp;
                    Vendor: {item.lastStock.vendor}&nbsp;&nbsp;&nbsp; 
                    Date:{" "}
                    {item.lastStock.date}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemStock;
