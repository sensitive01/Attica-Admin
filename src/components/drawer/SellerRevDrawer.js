import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Uploader from "components/image-uploader/Uploader";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { useContext, useEffect, useState, useRef } from "react";
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
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button, Label } from "@windmill/react-ui";
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
  const [sellerCoordinates, setSellerCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const updateSellerCoordinates = (newCoordinates) => {
    setLatitude(newCoordinates.lat.toString());
    setLongitude(newCoordinates.lng.toString());
  };
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
  // Update the onSubmit function to include the updated sellerCoordinates values
  const onSubmit = async (data) => {
    const {
      title,
      addressLine,
      area,
      city,
      state,
      pinCode,
      status,
      gst,
      latitude,
      longitude,
    } = data;
    try {
      let SellerData = {
        SellerName: title,
        addressLine,
        area,
        city,
        state,
        pincode: pinCode, // Update pincode field name to lowercase
        status,
        gst,
        products: selectedProducts,
        latitude: null,
        longitude: null,
      };

      if (id) {
        const res = await SellerServices.updateSeller(id, SellerData);
        setIsUpdate(true);
        notifySuccess("Seller updated successfully");
        closeDrawer();
      } else {
        const res = await SellerServices.addSeller(SellerData);
        setIsUpdate(true);
        notifySuccess("Seller created");
        console.log(res);
        closeDrawer();
      }
    } catch (err) {
      const errorMessage =
        err && err.response && err.response.data
          ? err.response.data.message
          : err.message;
      notifyError(errorMessage);
      toast.error(errorMessage || "An error occurred");
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
      for (const field of [
        "title",
        "addressLine",
        "area",
        "city",
        "state",
        "pinCode",
        "status",
        "gst",
      ]) {
        setValue(field, "");
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
            setValue("latitude", res.latitude);
            setValue("longitude", res.longitude);
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
                <MapComponent updateCoordinates={updateSellerCoordinates} />
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Latitude : ")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      readOnly
                      value={latitude}
                      type="text"
                      placeholder="Latitude"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="latitude"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Longitude : ")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      readOnly
                      value={longitude}
                      type="text"
                      placeholder="Longitude"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="longitude"
                    />
                  </div>
                </div>{" "}
              </div>
            </div>
            <DrawerButton id={id} title="Seller" isSubmitting={isSubmitting} />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
const Map = ({ updateCoordinates }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [sellerCoordinates, setSellerCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const mapRef = useRef(null);
  const platform = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  useEffect(() => {
    const H = window.H;
    platform.current = new H.service.Platform({
      apikey: "Jl6ENjAFQcXesu1RImYS-JlVRaYNzhu3Beyu-zY6aPE",
    });
    map.current = new H.Map(
      mapRef.current,
      platform.current.createDefaultLayers().vector.normal.map,
      {
        center: currentPosition,
        zoom: 5,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(map.current)
    );
    const ui = H.ui.UI.createDefault(
      map.current,
      platform.current.createDefaultLayers()
    );
    marker.current = new H.map.Marker(currentPosition, {
      volatility: true,
      draggable: true,
    });
    map.current.addObject(marker.current);
    map.current.addEventListener("tap", (e) => {
      const newCoord = map.current.screenToGeo(
        e.currentPointer.viewportX,
        e.currentPointer.viewportY
      );
      marker.current.setGeometry(newCoord);
      setCurrentPosition({ lat: newCoord.lat, lng: newCoord.lng });
    });
    setSellerCoordinates(currentPosition);
    return () => {
      mapRef.current = null;
      platform.current.dispose();
    };
  }, []);
  const handleSubmit = () => {
    console.log("Submitted Latitude:", currentPosition.lat.toFixed(7));
    console.log("Submitted Longitude:", currentPosition.lng.toFixed(7));
    updateCoordinates(currentPosition); // Pass updated coordinates
  };

  return (
    <>
      <div ref={mapRef} style={{ flex: 1, height: "100%", width: "100%" }} />
      <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Latitude : "} style={{ color: "#ffffff" }} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={currentPosition.lat.toFixed(7)}
              type="text"
              placeholder="Latitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name="latitude"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Longitude : "} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={currentPosition.lng.toFixed(7)}
              type="text"
              placeholder="Longitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name="longitude"
            />
          </div>
        </div>
        <Button
          id="styleButton"
          className="mt-4 h-12 w-full"
          title="Submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};
const MapComponent = (updateSellerCoordinates) => {
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const updateCoordinates = (newCoordinates) => {
    setCoordinates(newCoordinates); // Update the coordinates state
    updateSellerCoordinates(newCoordinates); // Call the updateSellerCoordinates function
  };

  return (
    <>
      <Label onClick={onOpenModal} id="styleLink">
        Open Map View
      </Label>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        animationDuration={800}
        styles={{
          modal: {
            width: "100vw",
            height: "100vh",
            background: "#fff",
            padding: 0,
          },
        }}
        zIndex={9999}
      >
        {open && <Map updateCoordinates={updateCoordinates} />}
      </Modal>
      <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Latitude : "} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              // value={coordinates.lat}
              value={
                coordinates.lat !== ""
                  ? parseFloat(coordinates.lat).toFixed(7)
                  : ""
              }
              type="text"
              placeholder="Latitude"
              name="latitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Longitude : "} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={
                coordinates.lng !== ""
                  ? parseFloat(coordinates.lng).toFixed(7)
                  : ""
              }
              type="text"
              name="longitude"
              placeholder="Longitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SellerRevDrawer;
