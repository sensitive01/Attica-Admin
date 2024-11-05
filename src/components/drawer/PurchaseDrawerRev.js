import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import PurchasesServices from "services/PurchaseServices";
import { notifyError, notifySuccess } from "utils/toast";
import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import Select from "react-select";
import axios from "axios";
import { t } from "i18next";
const CouponDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const settings = useSelector((state) => state.setting);
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, reset },
  } = useForm();

  useEffect(() => {
    fetch("https://attica.onrender.com/api/items")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        const allCategories = data.products.reduce((acc, product) => {
          product.categories.forEach((category) => {
            acc[category._id] = category.name.en; // Assuming English localization for category names
          });
          return acc;
        }, {});
        setCategoryOptions(
          Object.entries(allCategories).map(([value, label]) => ({
            value,
            label,
          }))
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const handleProductChange = (selected) => {
    setSelectedProduct(selected);
    // Find the connected category for the selected product and set it as the selected category
    const connectedCategory =
      selected &&
      products.find((product) => product._id === selected.value).categories[0];
    if (connectedCategory) {
      setSelectedCategory({
        value: connectedCategory._id,
        label: connectedCategory.name.en,
      });
    }
  };
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

  const onSubmit = async (data) => {
    console.log("coupon data", data);
    try {
      setIsSubmitting(true);
      const couponData = {
        title: selectedSupplier ? selectedSupplier.label : "",
        category: selectedCategory,
        quantity: data.quantity,
        price: data.price,
        products: selectedProduct ? [selectedProduct] : [],
      };
      if (id) {
        const res = await PurchasesServices.updatePurchase(id, couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);

        console.log(res);
        reset(); // reset the form after successful submission
        closeDrawer();
      } else {
        const res = await PurchasesServices.addPurchases(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);

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
    if (isDrawerOpen) {
      setSelectedSupplier(null);
      setSelectedCategory(null);
      setQuantity("");
      setPrice("");
      setSelectedProduct(null);
      setResData({});
      clearErrors(); // Clear form errors
    }
  }, [isDrawerOpen, clearErrors]);

  useEffect(() => {
    // Handle form data initialization and updates
    if (!isDrawerOpen) {
      setResData({});
      setValue("selectedSupplier", "");
      setValue("selectedCategory", "");
      setValue("quantity", "");
      setValue("price", "");
      setValue("selectedProduct", "");
      setValue("title", "");
      clearErrors("selectedSupplier");
      clearErrors("selectedCategory");
      clearErrors("quantity");
      clearErrors("price");
      clearErrors("selectedProduct");
      clearErrors("title");

      return;
    }

    if (id) {
      (async () => {
        try {
          const res = await PurchasesServices.getPurchasesById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title[language || "en"]);
            setSelectedSupplier({
              value: res.selectedSupplier,
              label: res.title,
            });
            setSelectedCategory({
              value: res.category[0].value,
              label: res.category[0].label,
            });
            setQuantity(res.quantity);
            setPrice(res.price);
            setSelectedProduct({
              value: res.products[0].value,
              label: res.products[0].label,
            });
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
    setSelectedCategory,
    setSelectedSupplier,
    setQuantity,
    setPrice,
    setLanguage,
    language,
  ]);
  const handleSupplierChange = (selected) => {
    setSelectedSupplier(selected);
    // Preserve quantity if already set
    if (!quantity) {
      setQuantity("");
    }
    // Preserve price if already set
    if (!price) {
      setPrice("");
    }
  };
  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    // Preserve quantity if already set
    if (!quantity) {
      setQuantity("");
    }
    // Preserve price if already set
    if (!price) {
      setPrice("");
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("Update Purchases") : t("Add Purchases")}         
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Supplier Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={suppliers.map((supplier) => ({
                    value: supplier._id,
                    label: supplier.supplierName,
                  }))}
                  value={selectedSupplier}
                  name="title"
                  // onChange={(selected) => setSelectedSupplier(selected)}
                  onChange={handleSupplierChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Items : "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title.en,
                  }))}
                  value={selectedProduct}
                  onChange={handleProductChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Category : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  isDisabled={true} // Disable manual category selection
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
                  placeholder={"20"}
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
           
            <DrawerButton
              id={id}
              title="Purchase"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;


