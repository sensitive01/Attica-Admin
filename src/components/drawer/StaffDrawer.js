import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useStaffSubmit from "hooks/useStaffSubmit";
import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";
import SelectRole from "components/form/SelectRole";
import DrawerButton from "components/form/DrawerButton";


const StaffDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    handleSelectLanguage,
  } = useStaffSubmit(id);
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Image" />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      folder="admin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Name" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Staff name"
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Password" />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        required
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    ) : (
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    )}

                    <Error errorName={errors.password} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Contact Number" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Contact Number"
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="text"
                      placeholder="Phone number"
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Joining Date" />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      label="Joining Date"
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("StaffJoiningDate")}
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Role" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectRole register={register} label="Role" name="role" />
                    <Error errorName={errors.role} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title="Staff" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;

// import React, { useState, useEffect } from 'react';
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

// const CouponDrawer = ({ id }) => {
//   const [products, setProducts] = useState([])
//   const [formData, setFormData]= useState({})
//   const {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     setImageUrl,
//     imageUrl,
//     published,
//     setPublished,
//     currency,
//     discountType,
//     setDiscountType,
//     isSubmitting,
//     handleSelectLanguage,
//   } = useCouponSubmit(id);

//   useEffect(() => {
//     // Fetch the products data from the API
//     fetch('https://attica.onrender.com/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);
//   const handleChange = e => {
//     if (e.target.name === 'products') {
//       const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
//       setFormData({...formData, products: selectedProducts});
//     } else {
//       setFormData({...formData, [e.target.name]: e.target.value});
//     }
//   };

//   return (
//     <>
//       <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
//         {id ? (
//           <Title
//             register={register}
//             // handleSelectLanguage={handleSelectLanguage}
//             title={t("UpdateCoupon")}
//             description={t("UpdateCouponDescription")}
//           />
//         ) : (
//           <Title
//             register={register}
//             // handleSelectLanguage={handleSelectLanguage}
//             title={("Add Supplier")}
//           />
//         )}
//       </div>

//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
//             {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("CouponBannerImage")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Uploader
//                   imageUrl={imageUrl}
//                   setImageUrl={setImageUrl}
//                   folder="coupon"
//                 />
//               </div>
//             </div> */}

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Suuplier Id")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Supplier Id"
//                   name="title"
//                   type="text"
//                   placeholder={("Supplier1")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Supplier Name")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Supplier Name"
//                   name="title"
//                   type="text"
//                   placeholder={("Abc Supplier")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Gst Number")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Gst Number"
//                   name="Gst"
//                   type="text"
//                   placeholder={("29GGGGG1314R9Z6")}
//                 />
//                 <Error errorName={errors.couponCode} />
//               </div>
//             </div>

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Addressline")} />
//               <div className="col-span-8 sm:col-span-4">
//                 {/* <Input
//                   {...register(`endTime`, {
//                     required: "Coupon Validation End Time",
//                   })}
//                   label="Addressline"
//                   name="endTime"
//                   type="datetime-local"
//                   placeholder={t("CouponValidityTime")}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 /> */}
//                 <InputArea
//                   register={register}
//                   label="Addressliner"
//                   name="Gst"
//                   type="text"
//                   placeholder={("123 Main Street, apt 4B")}
//                 />
//                 <Error errorName={errors.endTime} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Area")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Area"
//                   name="title"
//                   type="text"
//                   placeholder={("123 Main Street")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>     <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("City")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="City"
//                   name="title"
//                   type="text"
//                   placeholder={("San Diego")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>     <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("State")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="State"
//                   name="title"
//                   type="text"
//                   placeholder={("CA")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>     <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Pin Code")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Pin Code"
//                   name="title"
//                   type="text"
//                   placeholder={("919111")}
//                 />
//                 <Error errorName={errors.title} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Products")} />
//               <div className="col-span-8 sm:col-span-4">
                
//             <select name="products" multiple value={formData.products} onChange={handleChange}>
//               {products.map(product => (
//                 <option key={product._id} value={product._id}>
//                   {product.title.en}
//                 </option>
//               ))}
//             </select>
//                 <Error errorName={errors.couponCode} />
//               </div>
//             </div>


//             {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("DiscountType")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <SwitchToggleFour
//                   handleProcess={setDiscountType}
//                   processOption={discountType}
//                 />
//                 <Error errorName={errors.discountType} />
//               </div>
//             </div> */}
//             {/* 
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("Discount")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputValue
//                   product
//                   register={register}
//                   maxValue={discountType ? 99 : 1000}
//                   minValue={1}
//                   label="Discount"
//                   name="discountPercentage"
//                   type="number"
//                   placeholder={discountType ? "Percentage" : "Fixed Amount"}
//                   currency={discountType ? "%" : currency}
//                 />

//                 <Error errorName={errors.discountPercentage} />
//               </div>
//             </div> */}

//             {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={t("MinimumAmount")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputValue
//                   product
//                   register={register}
//                   maxValue={200000}
//                   minValue={100}
//                   label="Minimum Amount"
//                   name="minimumAmount"
//                   type="number"
//                   placeholder={t("MinimumAmountPlasholder")}
//                   currency={currency}
//                 />
//                 <Error errorName={errors.minimumAmount} />
//               </div>
//             </div> */}

//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Status")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <SwitchToggle
//                   handleProcess={setPublished}
//                   processOption={published}
//                 />
//                 <Error errorName={errors.productType} />
//               </div>
//             </div>
//           </div>

//           <DrawerButton id={id} title="Supplier" isSubmitting={isSubmitting} />
//         </form>
//       </Scrollbars>
//     </>
//   );
// };

// export default CouponDrawer;
