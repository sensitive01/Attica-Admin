import * as dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import SupplierServices from "services/SupplierServices";
import Title from "components/form/Title";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useSupplierSubmit = (id) => {
  const [formData, setFormData] = useState({});
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState(null);
  const [title, setDfd] = useState(null);
  const [addressLine, setFfd] = useState(null);
  const [area, setVfd] = useState(null);
  const [gst, d] = useState(null);

  const settings = useSelector((state) => state.setting);
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
    const { title, addressLine, area, city, state, pinCode, status, gst } =
      data;
    console.log("Supplier data", data);
    try {
      setIsSubmitting(true);
      let supplierData = {
        supplierName: title,
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
        const res = await SupplierServices.updateSupplier(id, supplierData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await SupplierServices.addSupplier(supplierData);
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
          const res = await SupplierServices.getSupplierById(id);
          if (res) {
            // console.log('res coupon', res);
            setResData(res);
            setValue("title", res.supplierName);
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

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
    supplierName: title,
    addressLine,
    area,
    city,
    state,
    pinCode,
    // products,
    status,
    gst,
    setSelectedProducts,
    setState,
    setPinCode,
    setCity,
    // selectedProducts,
    products: selectedProducts,
  };
};

export default useSupplierSubmit;
