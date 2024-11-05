import * as dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import PurchasesServices from "services/PurchaseServices";
import { notifyError, notifySuccess } from "utils/toast";

const usePurchaseSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [title, setTitle] = useState("");
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
  const { settingItem } = settings;
  const globalSetting = settingItem.find(
    (value) => value.name === "globalSetting"
  );

  const currency = globalSetting?.default_currency || "$";
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
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
        console.log(res);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await PurchasesServices.addPurchases(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
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
            setValue("title", res.title);
            setValue("category", res.category);
            setValue("quantity", res.quantity);
            setValue("price", res.price);
            if (!selectedProduct) {
              setSelectedProduct(res.selectedProduct);
            }
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, setSelectedProduct, language, lang]);

  return {
    register: {
      title: title,
      // category: category,
      quantity: quantity,
      price: price,
      selectedProduct: selectedProduct,
    },
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    isSubmitting,
    setDiscountType,
    handleSelectLanguage,
    register,
    handleSubmit,
    setValue,
    clearErrors,
  };
};
export default usePurchaseSubmit;
