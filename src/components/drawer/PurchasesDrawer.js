import React, { useState, useEffect } from "react";
import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useCouponSubmit from "hooks/useCouponSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import ParentCategory from "components/category/ParentCategory";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";

const CreatePurchase = (id) => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const onSubmit = async (data) => {
    const purchase = {
      title: selectedSupplier ? selectedSupplier.label : "",
      category: selectedCategory,
      quantity: data.quantity,
      price: data.price,
      products: selectedProduct ? [selectedProduct] : [],
    };

    try {
      const response = await fetch(
        "https://attica.onrender.com/api/purchases/addpurchases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchase),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create purchase");
      }
      const responseData = await response.json();
      toast.success("Purchase created:");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log("Purchase created:", responseData);
    } catch (error) {
      toast.error("Error creating purchase:");
      console.error("Error creating purchase:", error);
    }
  };

  useEffect(() => {
    // Fetch the products data from the API
    fetch("https://attica.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get("https://attica.onrender.com/api/category");
        const data = response.data;
        const options = data.flatMap((parentCategory) => ({
          value: parentCategory._id,
          label: parentCategory.name.en,
          isParent: true,
          children: parentCategory.children.map((child) => ({
            value: child._id,
            label: child.name.en,
            isParent: false,
          })),
        }));

        setCategoryOptions(options);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryData();
  }, []);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("https://attica.onrender.com/api/supplier/");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title title={"Add Purchases"} />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Seller Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={suppliers.map((supplier) => ({
                    value: supplier._id,
                    label: supplier.supplierName,
                  }))}
                  value={selectedSupplier}
                  name="title"
                  onChange={(selected) => setSelectedSupplier(selected)}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Category : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={(selected) => setSelectedCategory(selected)}
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
                  placeholder={"20ml"}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Purchases Price : " />
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

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Products : "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title.en,
                  }))}
                  value={selectedProduct}
                  onChange={(selected) => setSelectedProduct(selected)}
                />
              </div>
            </div>

            <DrawerButton title="Purchases" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CreatePurchase;
// const CouponDrawer = ({ id }) => {
  // Previous code remains the same

//   const handleSupplierChange = (selected) => {
//     setSelectedSupplier(selected);
//     // Preserve quantity if already set
//     if (!quantity) {
//       setQuantity("");
//     }
//     // Preserve price if already set
//     if (!price) {
//       setPrice("");
//     }
//   };

//   const handleCategoryChange = (selected) => {
//     setSelectedCategory(selected);
//     // Preserve quantity if already set
//     if (!quantity) {
//       setQuantity("");
//     }
//     // Preserve price if already set
//     if (!price) {
//       setPrice("");
//     }
//   };

//   const handleProductChange = (selected) => {
//     setSelectedProduct(selected);
//     // Preserve quantity if already set
//     if (!quantity) {
//       setQuantity("");
//     }
//     // Preserve price if already set
//     if (!price) {
//       setPrice("");
//     }
//   };

//   return (
//     // Previous JSX code remains the same
//     <>
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
//         <Title
//           register={register}
//           handleSelectLanguage={handleSelectLanguage}
//           title={id ? t("Update Purchases") : t("Add Purchases")}
//           description={id ? t("Update Coupon Description") : t("Add Coupon Description")}
//         />
//       </div>
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Previous form fields */}
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={t("Seller Name")} />
//             <div className="col-span-8 sm:col-span-4">
//               <Select
//                 options={suppliers.map((supplier) => ({ value: supplier._id, label: supplier.supplierName }))}
//                 value={selectedSupplier}
//                 name="title"
//                 onChange={handleSupplierChange}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={t("Category : ")} />
//             <div className="col-span-8 sm:col-span-4">
//               <Select options={categoryOptions} value={selectedCategory} onChange={handleCategoryChange} />
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={"Quantity : "} />
//             <div className="col-span-8 sm:col-span-4">
//               <Input
//                 name="quantity"
//                 {...register("quantity")}
//                 type="text"
//                 value={quantity}
//                 placeholder={"20ml"}
//                 onChange={(event) => setQuantity(event.target.value)}
//                 className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//               />
//             </div>
//           </div>
//           {/* Similar handling for price and products */}
//         </form>
//       </Scrollbars>
//     </>
//   );
// };

// export default CouponDrawer;

