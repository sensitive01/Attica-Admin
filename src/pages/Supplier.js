import React, { useState, useEffect, useContext } from "react";
import { FiEdit, FiPlus, FiTrash2, FiZoomIn } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { SidebarContext } from "context/SidebarContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "components/Typography/PageTitle";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import SupplierDrawer from "components/drawer/SupplierDrawer";
import { showingTranslateValue } from "utils/translate";
import { FiMinus } from "react-icons/fi";
import NotFound from "components/table/NotFound";
import UploadManyTwo from "components/common/UploadManyTwo";
import {
  Button,
  Card,
  TableBody,
  CardBody,
  Input,
  Pagination,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import CheckBox from "components/form/CheckBox";
import TableLoading from "components/preloader/TableLoading";
import EditDeleteButton from "components/table/EditDeleteButton";
import Tooltip from "../components/tooltip/Tooltip";
import { Link } from "react-router-dom";
const Coupons = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [filename, setFilename] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const totalResults = 100; // Example value for total number of results
  const resultsPerPage = 10; // Example value for results per page
  const [dataTable, setDataTable] = useState([]); //tableTable for showing on table according to filtering
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };
  const { t } = useTranslation();

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleUpdate = (id) => {
    setServiceId(id);
    const selectedData = data.find((item) => item._id === id);
    console.log("Selected Data:", selectedData);
    setFormData(selectedData);
    toggleDrawer();
  };

  const deleteApi = async (id) => {
    try {
      const response = await fetch(`https://attica.onrender.com/api/supplier/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any additional headers if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the Supplier");
      }

      const data = await response.json();
      toast.success("Supplier Deleted Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log("Supplier deleted successfully", data);
      // You can perform any additional actions after successful deletion
    } catch (error) {
      toast.error("Error deleting the Supplier:");
      console.error("Error deleting the Supplier:", error);
    }
  };

  const confirmAndDelete = async (id) => {
    return new Promise((resolve, reject) => {
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this Supplier?"
      );
      if (confirmDeletion) {
        resolve(deleteApi(id));
      } else {
        toast.error("!!!Deletion cancelled by user!!!");
        reject(new Error("Deletion cancelled by user."));
      }
    });
  };

  const handleModalOpen = async (id, title) => {
    setServiceId(id);
    setTitle(title);

    try {
      await confirmAndDelete(id);
      // Show success message in a toast
      console.log("Supplier deleted successfully");
      // You can trigger a toast or any other UI notification here
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  useEffect(() => {
    // Fetch the data from the API
    fetch("https://attica.onrender.com/api/supplier/") // Update the API endpoint to the correct URL
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <PageTitle>{t("Supplier")}</PageTitle>
      <DeleteModal ids={[]} setIsCheck={setIsCheck} title="Selected Coupon" />
      <BulkActionDrawer ids={[]} title="Suppliers" />
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
      {isCheck?.length < 2 && (
        <MainDrawer>
          {formData && Object.keys(formData).length > 0 && (
            <SupplierDrawer formData={formData} id={serviceId} />
          )}
        </MainDrawer>
      )}

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <Button
                onClick={toggleDrawer}
                className="w-full rounded-md h-12"
                id="styleButton"
              >
                <span className="mr-2">
                  <FiPlus />
                </span>
                {"Add Supplier"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
              </TableCell>
              <TableCell>{t("Sno")}</TableCell>
              <TableCell>{"Supplier"}</TableCell>
              <TableCell>{"Address"}</TableCell>
              <TableCell>{t("Products")}</TableCell>
              <TableCell>{t("CoupTblActions")}</TableCell>
            </tr>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name={item?.title?.en}
                    id={item._id}
                    handleClick={handleClick}
                    isChecked={isCheck?.includes(item._id)}
                  />{" "}
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="text-sm">
                    {/* {item._id} */}
                    {item.supplierName}
                  </span>
                </TableCell>
                <TableCell>
                  <span>
                    {"AddressLine : "} {item.addressLine}
                    <br />
                    {"Area : "} {item.area}
                    <br />
                    {"City : "} {item.city}
                    <br />
                    {"State : "} {item.state}
                    <br />
                    {"PinCode : "} {item.pinCode}
                  </span>
                </TableCell>
                <TableCell>
                  {item?.products?.map((product, index) => (
                    <span key={product._id}>
                      {product.label}
                      <br />
                    </span>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <TableCell className="text-right">
                    <div className="flex justify-end text-right">
                      <EditDeleteButton
                        id={item._id}
                        title={item.title}
                        handleUpdate={() => handleUpdate(item._id)}
                        handleModalOpen={handleModalOpen}
                        isCheck={isCheck?.includes(item._id)}
                        product={{ name: item.title }}
                        parent={{ _id: item._id }}
                      />
                    </div>
                  </TableCell>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Coupons;
