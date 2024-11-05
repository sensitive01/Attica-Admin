import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import ProductionServices from "services/ProductionServices";
import { notifyError, notifySuccess } from "utils/toast";
import { Input,Button } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import Select from "react-select";
import axios from "axios";
import { t } from "i18next";
import { FiPlus,FiTrash } from "react-icons/fi";

const CouponDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState(null);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ProductsItem, setProductsItem] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, reset },
  } = useForm();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}productItem`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const variantOptions = data.map((product) => ({
          value: product.variants,
          label: product.variants,
        }));
        setVariantOptions(variantOptions);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductChange = (selected) => {
    setSelectedProduct(selected);

    if (selected) {
      // Find the selected product by _id
      const selectedProduct = products.find(
        (product) => product._id === selected.value
      );

      if (selectedProduct) {
        setSelectedVariants({
          value: selectedProduct.variants,
          label: selectedProduct.variants,
        });
      } else {
        setSelectedVariants(null);
      }
    } else {
      setSelectedVariants(null);
    }
  };
  useEffect(() => {
    // Fetch the products data from the API using the environment variable
    fetch(`${process.env.REACT_APP_API_BASE_URL}items`)
      .then((response) => response.json())
      .then((data) => setProductsItem(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const addItem = () => {
    setSelectedItems([...selectedItems, { item: null, quantity: 0 }]);
    console.log("Selected Items:", selectedItems);
  };
  // Function to remove an item from the selected items list
  const removeItem = (index) => {
    // Check if there is more than one item in the selectedItems array
    if (selectedItems.length > 1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(index, 1);
      setSelectedItems(updatedItems);
      console.log("Selected Items:", updatedItems);
    } else {
      console.log("At least one item must remain in selectedItems array.");
    }
  };
  const onSubmit = async (data) => {
    console.log("coupon data", data);
    try {
      setIsSubmitting(true);
      const couponData = {
        title: selectedProduct ? selectedProduct.label : "",
        quantity: data.quantity,
        price: data.price,
        products: [selectedProduct],
        variants: [selectedVariants],
        selectedItems: selectedItems.map((item) => ({
          item: {
            value: item.item.value,
            label: item.item.label,
          },
          quantity: item.quantity,
        })),
      };
      if (id) {
        const res = await ProductionServices.updateProduction(id, couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Production updated successfully");
        console.log(res);
        reset(); // reset the form after successful submission
        closeDrawer();
      } else {
        const res = await ProductionServices.createProduction(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Production added successfully");

        reset(); // reset the form after successful submission
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
    }
  };
  useEffect(() => {
    // Reset state when drawer is opened
    //     if (isDrawerOpen) {
    //       setSelectedSupplier(null);
    //       setSelectedCategory(null);
    //       setQuantity("");
    //       setPrice("");
    //       setSelectedProduct(null);
    //       setResData({});
    //       clearErrors(); // Clear form errors
    //     }
    //   }, [isDrawerOpen, clearErrors]);

    //   useEffect(() => {
    //     // Handle form data initialization and updates
    //     if (!isDrawerOpen) {
    //       setResData({});
    //       setValue("selectedSupplier", "");
    //       setValue("selectedCategory", "");
    //       setValue("quantity", "");
    //       setValue("price", "");
    //       setValue("selectedProduct", "");
    //       setValue("title", "");
    //       clearErrors("selectedSupplier");
    //       clearErrors("selectedCategory");
    //       clearErrors("quantity");
    //       clearErrors("price");
    //       clearErrors("selectedProduct");
    //       clearErrors("title");

    //       return;
    //     }

    if (id) {
      (async () => {
        try {
          const res = await ProductionServices.getProductionById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title[language || "en"]);

            setQuantity(res.quantity);
            setPrice(res.price);
            setSelectedProduct({
              value: res.products[0].value,
              label: res.products[0].label,
            });
            const transformedSelectedItems = res.selectedItems.map((item) => ({
              item: {
                value: item.item.value,
                label: item.item.label,
              },
              quantity: item.quantity,
            }));

            // Set the transformed selectedItems state
            setSelectedItems(transformedSelectedItems);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [
    id,
    setValue,
    setSelectedProduct,

    setQuantity,
    setPrice,
    setLanguage,
    language,
  ]);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("Update Production") : t("Add Production")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
           <center> <span>Select The Raw Materials From the Below Select Box</span></center>
            <br />
            <Button
              // id="styleButton"
              onClick={addItem}
              className="rounded-md h-12"
            >
              <span className="mr-2">
                <FiPlus />
              </span>
              {t("Add")}
            </Button>
            {/* <button id="styleButton" className="col-span-4" onClick={addItem}>
              +
            </button> */}
            {selectedItems.map((selected, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 col-span-8 sm:col-span-4"
              >
                <Select
                  id="alignSelect"
                  name={`item-${index}`}
                  className="col-span-5 h-12"
                  options={
                    ProductsItem &&
                    ProductsItem.map((product) => ({
                      value: product._id,
                      label: product.title.en,
                    }))
                  }
                  value={selected.item || null}
                  onChange={(selectedOption) => {
                    const updatedItems = [...selectedItems];
                    updatedItems[index].item = selectedOption;
                    setSelectedItems(updatedItems);
                  }}
                />
                <Input
                  style={{ marginBottom: "10px" }}
                  type="number"
                  className="border h-12 text-sm  col-span-5 block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  value={selected.quantity}
                  onChange={(e) => {
                    const updatedItems = [...selectedItems];
                    updatedItems[index].quantity = e.target.value;
                    setSelectedItems(updatedItems);
                  }}
                />
                <Button
              // id="styleButton"
              onClick={() => removeItem(index)}
              className=" btn btn-danger  rounded-sm h-12 "
              id="removeItem"
              style={{backgroundColor:"#ff0000", marginBottom:"10px"}}
            >
              <span className="mr-2">
              <b> <FiTrash style={{color:"#ffffff",}} /></b>
              </span>
              {/* {t("Remove")} */}
            </Button>
                {/* <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white col-span-4 w-full"
                >
                  -
                </button> */}
              </div>
            ))}
            <br />
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Items : "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title,
                  }))}
                  value={selectedProduct}
                  onChange={handleProductChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Variants: "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  name="variants"
                  options={variantOptions}
                  value={selectedVariants}
                  isDisabled={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Quantity : "} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="quantity"
                  {...register("quantity")}
                  type="text"
                  value={quantity}
                  placeholder="20"
                  onChange={(event) => setQuantity(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Production Price : " />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="price"
                  {...register("price")}
                  type="number"
                  value={price}
                  placeholder="200$"
                  maxValue={2000}
                  minValue={1}
                  label="Price"
                  onChange={(event) => setPrice(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <DrawerButton id={id} title="Purchase" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;



