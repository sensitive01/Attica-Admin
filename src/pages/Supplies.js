import React, { useState, useEffect, useContext } from 'react';
import { FiEdit, FiPlus, FiTrash2, FiZoomIn } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { SidebarContext } from 'context/SidebarContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from 'components/Typography/PageTitle';
import DeleteModal from 'components/modal/DeleteModal';
import BulkActionDrawer from 'components/drawer/BulkActionDrawer';
import MainDrawer from 'components/drawer/MainDrawer';
// import CouponDrawer from 'components/drawer/CouponDrawer';
import SupplierDrawer from 'components/drawer/SupplierDrawer';
import SuppliesDrawer from 'components/drawer/SuppliesDrawer';
import { showingTranslateValue } from "utils/translate";
import { FiMinus } from "react-icons/fi";
// import SuppliessTable from 'components/Suppliess/SuppliesTable';
import NotFound from 'components/table/NotFound';
import UploadManyTwo from 'components/common/UploadManyTwo';
import { Button, Card, TableBody, CardBody, Input, Pagination, Table, TableRow, TableCell, TableContainer, TableFooter, TableHeader } from '@windmill/react-ui';
import CheckBox from 'components/form/CheckBox';
import TableLoading from 'components/preloader/TableLoading';
import EditDeleteButton from "components/table/EditDeleteButton";

import Tooltip from "../components/tooltip/Tooltip";

import { Link } from "react-router-dom";
const Coupons = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [filename, setFilename] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const totalResults = 100; // Example value for total number of results
  const resultsPerPage = 10; // Example value for results per page
  const [dataTable, setDataTable] = useState([]); //tableTable for showing on table according to filtering
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({})
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

  const handleUpdate = (id, title) => {
    setServiceId(id);
    toggleDrawer();
    // setTitle(title);
  };
  

  const deleteApi = async (id) => {
    try {
      const response = await fetch(`https://attica.onrender.com/api/Supplies/Supplies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the Supplies');
      }

      const data = await response.json();
      toast.success("Supplies Deleted Successfully")
      console.log('Supplies deleted successfully', data);
      // You can perform any additional actions after successful deletion
    } catch (error) {
      toast.error('Error deleting the Supplies:');
      console.error('Error deleting the Supplies:', error);

    }
  };

  const confirmAndDelete = async (id) => {
    return new Promise((resolve, reject) => {
      const confirmDeletion = window.confirm('Are you sure you want to delete this Supplies?');
      if (confirmDeletion) {
        resolve(deleteApi(id));
      } else {
        toast.error('!!!Deletion cancelled by user!!!');
        reject(new Error('Deletion cancelled by user.'));

      }
    });
  };

  const handleModalOpen = async (id, title) => {
    setServiceId(id);
    setTitle(title);

    try {
      await confirmAndDelete(id);
      // Show success message in a toast
      console.log('Supplies deleted successfully');
      // You can trigger a toast or any other UI notification here
    } catch (error) {
      console.error(error);
    }
  };



  // const handleModalOpen = (id, title) => {
  //   setServiceId(id);
  //   toggleModal();
  //   setTitle(title);
  // };
  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };
  const handleDeleteMany = async (id, products) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  const handleSelectFile = (selectedFile) => {
    // Handle file selection
  };

  const handleUploadMultiple = () => {
    // Handle multiple file upload
  };

  const handleRemoveSelectFile = () => {
    // Handle removing selected file
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
    fetch('https://attica.onrender.com/api/Supplies/Supplies') // Update the API endpoint to the correct URL
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <PageTitle>{t('Suppliess')}</PageTitle>
      <DeleteModal ids={[]} setIsCheck={setIsCheck} title="Selected Coupon" />
      <BulkActionDrawer ids={[]} title="Suppliess" />
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
      {isCheck?.length < 2 && (

        <MainDrawer>
          <SuppliesDrawer id={serviceId} />
        </MainDrawer>
      )}



      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Coupon"
                exportData={data}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 btn-gray text-gray-600"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {t("BulkAction")}
                </Button>
              </div>

              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button id="styleButton"
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>
                  {t("Delete")}
                </Button>
              </div>

              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="w-full rounded-md h-12" id="styleButton">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {("Add Supplies")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={null}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={t('Search Suuplier')}
              />
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
              <TableCell>{("Supplier")}</TableCell>
              {/* <TableCell>{("Category")}</TableCell> */}
              <TableCell>{t("Products")}</TableCell>
              <TableCell>{("Quantity")}</TableCell>
              <TableCell>{t("Price")}</TableCell>
              <TableCell >{t("CoupTblActions")}</TableCell>
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
                  />          </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="text-sm">
                    {/* {item._id} */}
                    {(item.title)}
                  </span>
                </TableCell>
                {/* <TableCell>
                  {item?.category?.map((category, index) => (
                    <span key={category._id}>
                      {(category.label)}
                      <br />
                    </span>
                  ))}
                </TableCell>     */}
                
               <TableCell>
                  {item?.products?.map((product, index) => (
                    <span key={product._id}>
                      {(product.label)}
                      <br />
                    </span>
                  ))}
                </TableCell>            



                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">
                  <TableCell className="text-right">
                    <div className="flex justify-end text-right">
                      <EditDeleteButton
                        // className="text-center"
                        id={item._id}
                        title={item.title}
                        handleUpdate={handleUpdate}
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
