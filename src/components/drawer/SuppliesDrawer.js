import React, { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import axios from "axios";
const CreateSupplies = (id) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onSubmit = async (data) => {
    const Supplies = {
      title: data.title,
      // category: selectedCategories,
      quantity: data.quantity,
      price: data.price,
      products: selectedProducts,
    };
    try {
      const response = await fetch("https://attica.onrender.com/api/supplies/addSupplies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Supplies),
      });

      if (!response.ok) {
        throw new Error("Failed to create Supplies");
      }
      const responseData = await response.json();
      toast.success("Supplies created:");
      console.log("Supplies created:", responseData);
    } catch (error) {
      toast.error("Error creating Supplies:");
      console.error("Error creating Supplies:", error);
    }
  };
  useEffect(() => {
    // Fetch the products data from the API
    fetch('https://attica.onrender.com/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setSelectedCategory(e.target.value);
    } else if (e.target.name === "products") {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedProductsData = selectedOptions.map((option) => {
        const product = products.find((prod) => prod._id === option.value);
        return { id: option.value, title: product ? product.title.en : "" };
      });
      setSelectedProducts(selectedProductsData);
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('https://attica.onrender.com/api/category');
        const data = response.data;
  
        const options = data.flatMap(parentCategory => {
          const parentName = parentCategory.parentName;
          const parentIcon = '👩‍👧'; // Icon for parent categories
          const children = parentCategory.children.map(childCategory => ({
            value: childCategory._id,
            label: childCategory.name.en,
            icon: '👶' // Icon for children categories
          }));
          return [
            {
              value: parentCategory._id,
              label: parentName + parentIcon,
              isParent: true
            },
            ...children
          ];
        });
  
        setCategoryOptions(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategoryData();
  }, []);
  
  
  const handleCategoryChange = (selectedOptions) => {
    const selectedParents = selectedOptions.filter(option => option.isParent);
  
    const selectedChildren = selectedOptions.filter(option => !option.isParent);
  
    setSelectedCategories([...selectedParents, ...selectedChildren]);
  };
  
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          title={("Add Supplies")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Supplier Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`title`, {
                    required: "TItle is required!",
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="title"
                  type="text"
                  placeholder={("Supplier Name")}
                  onChange={(event) => setTitle(event.target.value)}
                  // require
                />
                {/* <Error errorName={errors.title} /> */}
              </div>
            </div>
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Category : ")} />
              <div className="col-span-8 sm:col-span-4">
                <MultiSelect
                  isMulti
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  name="category"
                />
              </div>
            </div> */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Quantity : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="quantity"
                  {...register("quantity")}
                  type="text"
                  value={quantity}
                  placeholder={("20ml")}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Price : " />
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
                  // <Error errorName={errors.price} />
                  />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Products : ")} />
              <div className="col-span-8 sm:col-span-4">
              <MultiSelect
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.title.en,
                  }))}
                  value={selectedProducts}
                  onChange={setSelectedProducts}
                  labelledBy="Select"
                  multi
                />               
              </div>
            </div>
            <DrawerButton title="supplies" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
export default CreateSupplies;


