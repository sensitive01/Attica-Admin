// import { useForm } from 'react-hook-form';
// import React, { useState, useEffect, useRef } from 'react';
// import { Input } from "@windmill/react-ui";
// import DrawerButton from "components/form/DrawerButton";
// import Error from "components/form/Error";
// import InputArea from "components/form/InputArea";
// import InputValue from "components/form/InputValue";
// import LabelArea from "components/form/LabelArea";
// import SwitchToggle from "components/form/SwitchToggle";
// import SwitchToggleFour from "components/form/SwitchToggleFour";
// import Title from "components/form/Title";
// import Uploader from "components/image-uploader/Uploader";
// import useCouponSubmit from "hooks/useCouponSubmit";
// import { t } from "i18next";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { MultiSelect } from "react-multi-select-component";
// import ParentCategory from "components/category/ParentCategory";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select';
// import axios from "axios";
// import TestMap from "components/map/TestMap";
// const CreatePurchase = (id,coordinates) => {
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [formData, setFormData] = useState({});
//   const { register, handleSubmit } = useForm();
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [pincode, setPincode] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'products') {
//       const selectedOptions = Array.from(e.target.selectedOptions);
//       const selectedProductsData = selectedOptions.map((option) => {
//         const product = products.find((prod) => prod._id === option.value);
//         return { value: option.value, label: product ? product.title.en : '' };
//       });
//       setSelectedProducts(selectedProductsData);
//     } else if (name === 'state') {
//       setState(value);
//     } else if (name === 'pincode') {
//       setPincode(value);
//     } else if (name === 'city') {
//       setCity(value);
//     }
//     setFormData({ ...formData, [name]: value });
//   };
//   useEffect(() => {
//     axios.get('https://attica.onrender.com/api/products')
//       .then(response => {
//         setProducts(response.data.products);
//       })
//       .catch(error => {
//         toast.error('Error fetching products:', error);
//         console.error('Error fetching products:', error);
//       });
//   }, []);
//   const onSubmit = async (data) => {
//     const { title, addressLine, area, status, gst, latitude, longitude } = data;
//     const purchase = {
//       SellerName: title,
//       addressLine,
//       area,
//       city,
//       state,
//       pincode,
//       products: selectedProducts,
//       status,
//       gst,
//       latitude,
//       longitude
//     };
//     try {
//       const response = await axios.post('https://attica.onrender.com/api/Seller/add', purchase);

//       if (response.status === 200) {
//         toast.success('Seller created');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
//         console.log('Purchase created:', response.data);
//       }
//     } catch (error) {
//       toast.error('Error creating Seller');
//       console.error('Error creating purchase:', error);
//     }
//   };
  
//   return (
//     <>
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
//         <Title
//           title={("Add Seller")}
//         />
//       </div>
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Seller Name : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   {...register('title',
//                     { required: 'Seller Name is required!' })}
//                   name="title"
//                   type="text"
//                   placeholder="Seller Name"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Address Line : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="addressLine"
//                   {...register('addressLine')}
//                   type="text"
//                   placeholder="Address Line"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Area : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="area"
//                   {...register('area')}
//                   type="text"
//                   placeholder="Area"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("City : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="city"
//                   {...register('city')}
//                   type="text"
//                   placeholder="City"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("State : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="state"
//                   value={state}
//                   {...register('state')}
//                   type="text"
//                   placeholder="State"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Pincode : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="pincode"
//                   value={pincode}
//                   {...register('pincode')}
//                   type="text"
//                   placeholder="Pin Code"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Products: ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <MultiSelect
//                   options={products.map(product => ({
//                     value: product._id,
//                     label: product.title.en
//                   }))}
//                   value={selectedProducts}
//                   onChange={setSelectedProducts}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Status : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="status"
//                   {...register('status')}
//                   type="text"
//                   placeholder="Status"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("GST : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="gst"
//                   {...register('gst')}
//                   type="text"
//                   placeholder="GST"
//                   onChange={handleChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Map View : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <TestMap />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Latitude : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   readOnly
//                   // value={coordinates.lat}
//                   value={coordinates.lat !== '' ? parseFloat(coordinates.lat).toFixed(7) : ''}
//                   type="text"
//                   placeholder="Latitude"
//                   name='latitude'
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Longitude : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   readOnly
//                   value={coordinates.lng !== '' ? parseFloat(coordinates.lng).toFixed(7) : ''}
//                   type="text"
//                   name='longitude'
//                   placeholder="Longitude"
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//           </div>
//           <DrawerButton title="Seller" />
//         </form>
//       </Scrollbars>
//     </>
//   );
// };
// export default CreatePurchase





// // import React, { useState, useEffect } from 'react';
// // import { Input } from "@windmill/react-ui";
// // import DrawerButton from "components/form/DrawerButton";
// // import Error from "components/form/Error";
// // import InputArea from "components/form/InputArea";
// // import InputValue from "components/form/InputValue";
// // import LabelArea from "components/form/LabelArea";
// // import SwitchToggle from "components/form/SwitchToggle";
// // import SwitchToggleFour from "components/form/SwitchToggleFour";
// // import Title from "components/form/Title";
// // import Uploader from "components/image-uploader/Uploader";
// // import useCouponSubmit from "hooks/useCouponSubmit";
// // import { t } from "i18next";
// // import { Scrollbars } from "react-custom-scrollbars-2";
// // import { MultiSelect } from "react-multi-select-component";
// // import ParentCategory from "components/category/ParentCategory";
// // import { useForm } from 'react-hook-form';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Select from 'react-select';
// // import axios from "axios";

// // const CreatePurchase = (id) => {
// //   const [title, setTitle] = useState("");
// //   const [quantity, setQuantity] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({});
// //   const { register, handleSubmit } = useForm();
// //   const [categoryOptions, setCategoryOptions] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState(null);

// //   const onSubmit = async (data) => {
// //     const purchase = {
// //       title: data.title,
// //       category: selectedCategory,
// //       quantity: data.quantity,
// //       price: data.price,
// //       products: selectedProduct ? [selectedProduct] : [],
// //     };

// //     try {
// //       const response = await fetch("https://attica.onrender.com/api/purchases/addpurchases", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(purchase),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to create purchase");
// //       }
// //       const responseData = await response.json();
// //       toast.success("Purchase created:");
// //       console.log("Purchase created:", responseData);
// //     } catch (error) {
// //       toast.error("Error creating purchase:");
// //       console.error("Error creating purchase:", error);
// //     }
// //   };
// //   useEffect(() => {
// //     // Fetch the products data from the API
// //     fetch('https://attica.onrender.com/api/products')
// //       .then(response => response.json())
// //       .then(data => setProducts(data.products))
// //       .catch(error => console.error('Error fetching products:', error));
// //   }, []);

// //   useEffect(() => {
// //     const fetchCategoryData = async () => {
// //       try {
// //         const response = await axios.get('https://attica.onrender.com/api/category');
// //         const data = response.data;
// //         const options = data.flatMap(parentCategory => {
// //           return {
// //             value: parentCategory._id,
// //             label: parentCategory.parentName,
// //             isParent: true,
// //           };
// //         });
        
// //         setCategoryOptions(options);
// //       } catch (error) {
// //         console.error('Error fetching categories:', error);
// //       }
// //     };
  
// //     fetchCategoryData();
// //   }, []);

// //   return (
// //     <>
// //       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
// //         <Title title={("Add Purchases")} />
// //       </div>
// //       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
// //             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
// //               <LabelArea label={t("Product Name")} />
// //               <div className="col-span-8 sm:col-span-4">
// //                 <Input {...register(`title`, { required: "TItle is required!", })}
// //                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
// //                   name="title"
// //                   type="text"
// //                   placeholder={("Item Name")}
// //                   onChange={(event) => setTitle(event.target.value)}
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
// //               <LabelArea label={t("Category : ")} />
// //               <div className="col-span-8 sm:col-span-4">
// //                 <MultiSelect
// //                   options={categoryOptions}
// //                   value={selectedCategory}
// //                   onChange={(selected) => setSelectedCategory(selected[0])}
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
// //               <LabelArea label={("Quantity : ")} />
// //               <div className="col-span-8 sm:col-span-4">
// //                 <Input name="quantity" {...register("quantity")}
// //                   type="text"
// //                   value={quantity}
// //                   placeholder={("20ml")}
// //                   onChange={(event) => setQuantity(event.target.value)}
// //                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
// //               <LabelArea label="Purchases Price : " />
// //               <div className="col-span-8 sm:col-span-4">
// //                 <Input name="price" {...register("price")}
// //                   type="number"
// //                   value={price}
// //                   placeholder="200$"
// //                   maxValue={2000}
// //                   minValue={1}
// //                   label="Price"
// //                   onChange={(event) => setPrice(event.target.value)}
// //                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
// //               <LabelArea label={("Products : ")} />
// //               <div className="col-span-8 sm:col-span-4">
// //                 <MultiSelect options={products.map((product) => ({
// //                   value: product._id,
// //                   label: product.title.en,
// //                 }))}
// //                   value={selectedProduct}
// //                   onChange={(selected) => setSelectedProduct(selected[0])}
// //                   labelledBy="Select"
// //                 />
// //               </div>
// //             </div>
            
// //             <DrawerButton title="Purchases" />
// //           </div>
// //         </form>
// //       </Scrollbars>      
// //     </>
// //   );
// // };

// // export default CreatePurchase;

import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Uploader from "components/image-uploader/Uploader";
// import useSellerSubmit from "hooks/useSellerSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import SellerServices from "services/SellerServices";
import Title from "components/form/Title";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestMap from "components/map/TestMap";

const SellerRevDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState(null);
  const [title, setDfd] = useState(null);
  const [addressLine, setFfd] = useState(null);
  const [area, setVfd] = useState(null);
  const [gst, d] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "products") {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedProductsData = selectedOptions.map((option) => {
        const product = products.find((prod) => prod._id === option.value);
        return { value: option.value, label: product ? product.title.en : "" };
      });
      setSelectedProducts(selectedProductsData);
    } else if (name === "state") {
      setState(value);
    } else if (name === "pinCode") {
      setPinCode(value);
    } else if (name === "city") {
      setCity(value);
    }
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    // Fetch the products data from the API
    fetch("https://attica.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));

    setSelectedProducts(
      products.filter((product) =>
        selectedProducts.some((selected) => selected.value === product._id)
      )
    );
  }, []);
  const onSubmit = async (data) => {
    const { title, addressLine, area, city, state, pinCode, status, gst } =
      data;

    try {
      let SellerData = {
        SellerName: title,
        addressLine,
        area,
        city,
        state,
        pinCode,
        status,
        gst,
        products: selectedProducts,
      };
      if (id) {
        const res = await SellerServices.updateSeller(id, SellerData);
        setIsUpdate(true);
        notifySuccess("Seller updated successfully");
        // toast.success("Seller updated successfully");
        closeDrawer();
      } else {
        const res = await SellerServices.addSeller(SellerData);
        setIsUpdate(true);
        notifySuccess("Seller created");
        // toast.success("Seller created");

        // Close the drawer on successful operation
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
      toast.error(err.response.data.message || "An error occurred");
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
    // Reset form fields if drawer is open
    if (isDrawerOpen) {
      for (const field of ['title', 'addressLine', 'area', 'city', 'state', 'pinCode', 'status', 'gst']) {
        setValue(field, '');
        clearErrors(field);
      }
      setSelectedProducts([]);
      setLanguage(lang);
      setResData({});
    }
  }, [isDrawerOpen, setValue, clearErrors, lang]);

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("title");
      setValue("products");
      setValue("status");
      setValue("gst");
      setValue("city");
      setValue("addressLine");
      setValue("area");
      setValue("state");
      setValue("pinCode");
      setLanguage(lang);
      setValue("language", language);

      clearErrors("title");
      clearErrors("products");
      clearErrors("status");
      clearErrors("gst");
      clearErrors("city");
      clearErrors("addressLine");
      clearErrors("area");
      clearErrors("state");
      clearErrors("pinCode");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await SellerServices.getSellerById(id);
          if (res) {
            // console.log('res coupon', res);
            setResData(res);
            setValue("title", res.SellerName);
            setValue("products", res.products);
            setValue("gst", res.gst);
            setValue("addressLine", res.addressLine);
            setValue("area", res.area);
            setValue("state", res.state);
            setValue("status", res.status);
            setValue("city", res.city);
            setValue("pinCode", res.pinCode);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("Update Seller")}
          // description={t("UpdateCouponDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddSeller")}
          // description={t("AddCouponDescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.title} />
              <LabelArea label={t("Seller Name : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register("title", {
                    required: "Seller Name is required!",
                  })}
                  name="title"
                  type="text"
                  placeholder="Seller Name"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.addressLine} />
              <LabelArea label={t("Address Line : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="addressLine"
                  {...register("addressLine", {
                    required: "Address Line is required!",
                  })}
                  type="text"
                  placeholder="Address Line"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.area} />
              <LabelArea label={t("Area : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="area"
                  {...register("area", { required: "Area is required!" })}
                  type="text"
                  placeholder="Area"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.city} />
              <LabelArea label={t("City : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="city"
                  {...register("city", { required: "City is required!" })}
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.state} />
              <LabelArea label={t("State : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="state"
                  value={state}
                  {...register("state", { required: "State is required!" })}
                  type="text"
                  placeholder="State"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.pinCode} />
              <LabelArea label={t("Pincode : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="pinCode"
                  value={pinCode}
                  {...register("pinCode", {
                    required: "Pin Code is required!",
                  })}
                  type="text"
                  placeholder="Pin Code"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Products: ")} />
              <div className="col-span-8 sm:col-span-4">
                <MultiSelect
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title.en,
                  }))}
                  value={selectedProducts}
                  onChange={setSelectedProducts} // Update the onChange handler to setSelectedProducts
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Status : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="status"
                  {...register("status")}
                  type="text"
                  placeholder="Status"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("GST : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="gst"
                  {...register("gst")}
                  type="text"
                  placeholder="GST"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Map View : ")} />
              <div className="col-span-8 sm:col-span-4">
                <TestMap />
              </div>
            </div>
            <DrawerButton
              id={id}
              title="Seller"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
export default SellerRevDrawer;

