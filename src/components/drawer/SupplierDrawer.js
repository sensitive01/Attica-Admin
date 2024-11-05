import { useForm } from "react-hook-form";
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
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import ParentCategory from "components/category/ParentCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
const CreatePurchase = ({ id }) => {
  const [supplierId, setSupplierId] = useState(id);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
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
    axios
      .get("https://attica.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        toast.error("Error fetching products:", error);
        console.error("Error fetching products:", error);
      });
  }, []);
  const onSubmit = async (data) => {
    handleUpdate();
    const { title, addressLine, area, status, gst } = data;
    const purchase = {
      supplierName: title,
      addressLine,
      area,
      city,
      state,
      pinCode,
      products: selectedProducts,
      status,
      gst,
    };
    try {
      const response = await axios.post(
        "https://attica.onrender.com/api/supplier/add",
        purchase
      );
      if (response.status === 200) {
        toast.success("Supplier created");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log("Purchase created:", response.data);
      }
    } catch (error) {
      toast.error("Error creating Supplier");
      console.error("Error creating purchase:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://attica.onrender.com/api/supplier/${supplierId}`, formData);
      if (response.status === 200) {
        toast.success('Supplier updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error('Error updating Supplier');
      console.error('Error updating Supplier:', error);
    }
  };

  useEffect(() => {
    const fetchSupplierById = async () => {
      try {
        const response = await axios.get(`https://attica.onrender.com/api/supplier/${supplierId}`);
        const { data } = response;
        setFormData((prevData) => ({
          ...prevData,
          supplierName: data.title,
          addressLine: data.addressLine,
          area: data.area,
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
          products: data.selectedProducts,
          status: data.status,
          gst: data.gst
        }));

      } catch (error) {
        toast.error("Error fetching supplier data:", error);
        console.error("Error fetching supplier data:", error);
      }
    };


    fetchSupplierById();
  }, [supplierId]);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title title={"Add Supplier"} />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Supplier Name : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register("title", {
                    required: "Supplier Name is required!",
                  })}
                  name="title"
                  type="text"
                  placeholder="Supplier Name"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Address Line : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="addressLine"
                  {...register("addressLine")}
                  type="text"
                  placeholder="Address Line"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Area : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="area"
                  {...register("area")}
                  type="text"
                  placeholder="Area"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("City : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="city"
                  {...register("city")}
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("State : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="state"
                  value={state}
                  {...register("state")}
                  type="text"
                  placeholder="State"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Pincode : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="pinCode"
                  value={pinCode}
                  {...register("pinCode")}
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
                {/* MultiSelect component for selecting products */}
                <MultiSelect
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title.en,
                  }))}
                  value={selectedProducts}
                  onChange={setSelectedProducts}
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
            <DrawerButton title="Supplier" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
export default CreatePurchase;



