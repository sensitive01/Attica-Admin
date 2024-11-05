import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDraweer from "components/drawer/ProductDraweer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductTable = ({ currency, lang }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [products, setProducts] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        const response = await axios.get(
          "https://attica.onrender.com/api/productItem/"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product items:", error);
      }
    };

    fetchProductItems();
  }, []);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDraweer currency={currency} id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {product.image[0] ? (
                  <Avatar src={product.image[0]} alt="product" />
                ) : (
                  <Avatar
                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                    alt="product"
                  />
                )}

                <div>
                  <h2 className="text-sm font-medium">
                    {typeof product.title === "object"
                      ? product.title.en
                      : product.title}
                  </h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {typeof product.description === "object"
                  ? product.description.en
                  : product.description}
              </span>
            </TableCell>
            {/* <TableCell>
              <div>
                {product.selectedItems.map((selectedItem, index) => (
                  <div key={index}>
                    <span>items: {selectedItem.item.label}</span>
                    <br />
                    <span>quantity: {selectedItem.quantity}</span>
                  </div>
                ))}
              </div>
            </TableCell> */}
            <TableCell>
              {/* {product.variants.map((variants, index) => (
                <div key={index}>
                  Size: {variants.size}, Color: {variants.color}
                </div>
              ))}{" "}              */}
              <p>{product.variants}</p>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product._id}
                product={product}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(product.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
