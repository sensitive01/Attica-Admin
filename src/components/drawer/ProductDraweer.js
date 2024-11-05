import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import ProductItemServices from "services/ProductItemServices"; // Add this import statement
import { notifyError, notifySuccess } from "utils/toast";
import { Input, Textarea } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import Select from "react-select";
import axios from "axios";
import { t } from "i18next";
import Uploader from "components/image-uploader/Uploader";
const CouponDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, lang } = useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState([]);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // State to manage selected items and quantities
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, reset },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const productData = {
        title: data.title,
        description: data.description,
        image: imageUrl,
        variants: data.variant,
        // selectedItems: selectedItems.map((item) => ({
        //   item: {
        //     value: item.item.value,
        //     label: item.item.label,
        //   },
        //   quantity: item.quantity,
        // })),
      };
      if (id) {
        const res = await ProductItemServices.updateProductItem(
          id,
          productData
        );
        setIsSubmitting(false);
        notifySuccess(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        reset();
        closeDrawer();
      } else {
        const res = await ProductItemServices.createProductItem(productData);
        setIsSubmitting(false);
        notifySuccess(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setResData({
          imageUrl: res.data.image || [],
          variants: res.data.variants || [],
        });
        reset();
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
    if (isDrawerOpen) {
      setValue("title", "");
      setValue("description", "");
      setImageUrl([]);
      setResData({});

      clearErrors();
    }
  }, [isDrawerOpen, clearErrors]);
  useEffect(() => {
    // Handle form data initialization and updates
    if (!isDrawerOpen) {
      setResData({});
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await ProductItemServices.getProductItemById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title);
            setValue("description", res.description);
            setVariants(res.variant);
            setImageUrl(res.image);
            // const transformedSelectedItems = res.selectedItems.map((item) => ({
            //   item: {
            //     value: item.item.value,
            //     label: item.item.label,
            //   },
            //   quantity: item.quantity,
            // }));

            // // Set the transformed selectedItems state
            // setSelectedItems(transformedSelectedItems);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, setLanguage, language]);

//   useEffect(() => {
//     // Fetch the products data from the API using the environment variable
//     fetch(`${process.env.REACT_APP_API_BASE_URL}items`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products))
//       .catch((error) => console.error("Error fetching products:", error));
// }, []);

//   const addItem = () => {
//     setSelectedItems([...selectedItems, { item: null, quantity: 0 }]);
//     console.log("Selected Items:", selectedItems);
//   };
//   // Function to remove an item from the selected items list
//   const removeItem = (index) => {
//     // Check if there is more than one item in the selectedItems array
//     if (selectedItems.length > 1) {
//       const updatedItems = [...selectedItems];
//       updatedItems.splice(index, 1);
//       setSelectedItems(updatedItems);
//       console.log("Selected Items:", updatedItems);
//     } else {
//       console.log("At least one item must remain in selectedItems array.");
//     }
//   };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("Update Product Item") : t("Add Product Item")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            {" "}
            {/* <button onClick={addItem}>+</button>
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
                    products &&
                    products.map((product) => ({
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
                style={{marginBottom:"10px"}}
                  type="number"
                  className="border h-12 text-sm  col-span-5 block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  value={selected.quantity}
                  onChange={(e) => {
                    const updatedItems = [...selectedItems];
                    updatedItems[index].quantity = e.target.value;
                    setSelectedItems(updatedItems);
                  }}
                />
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white col-span-2"
                >
                  -
                </button>
              </div>
            ))}
            <br /> */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`title`, { required: "Title is required!" })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="title"
                  type="text"
                  placeholder={"Product Name"}
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Description")} />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", { required: false })}
                  name="description"
                  placeholder={"Product Description"}
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Image")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  product
                  folder="product"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t("Variant")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant"
                  name="variant"
                  type="text"
                  placeholder={t("Variants")}
                />
              </div>
            </div>
            <DrawerButton
              id={id}
              title="Product Item"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;
