import React, { useState, useEffect, useContext } from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ProductionServices from "../services/ProductionServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ProductionTable from "components/product/ProductionTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ProductionDrawer from "components/drawer/ProductionDrawer";
import CheckBox from "components/form/CheckBox";
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
import useItemFilter from "hooks/useItemFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import EditDeleteButton from "components/table/EditDeleteButton";
import useFilter from "hooks/useFilter";

const PurchaseRev = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);
  const [dataa, setData] = useState([]);
  const { data, setLoading } = useAsync(ProductionServices.getProductions);
  
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
  // console.log("Item page", data);
  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [item, Setite] = useState([]);
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.Items.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const {
    handleSubmitCoupon,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleSelectFile,
    filename,
    isDisabled,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);
  
  return (
    <>
      <PageTitle>{t("Production")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Production" />
      <MainDrawer>
        <ProductionDrawer id={serviceId} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <Button
                id="styleButton"
                onClick={toggleDrawer}
                className="w-full rounded-md h-12"
              >
                <span className="mr-2">
                  <FiPlus />
                </span>
                {t("Add Production")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
            <TableCell>{t("Sno")}</TableCell>
            <TableCell>{t("Products")}</TableCell>
            <TableCell>{t("Raw Material Used")}</TableCell>
              <TableCell>{("Variants")}</TableCell>
              <TableCell>{("Quantity")}</TableCell>
              <TableCell>{t("Production Price")}</TableCell>
              <TableCell >{t("CoupTblActions")}</TableCell>
              <TableCell >{t("Date")}</TableCell>

            </tr>
          </TableHeader>
          <ProductionTable
            lang={lang}
            isCheck={isCheck}
            coupons={dataTable}
            setIsCheck={setIsCheck}
          />
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
export default PurchaseRev;



// import React, { useState, useEffect } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHeader, TableRow } from "@windmill/react-ui";
// import { useTranslation } from "react-i18next";
// import PurchaseServices from "services/PurchaseServices";
// import useAsync from "hooks/useAsync";
// import PageTitle from "components/Typography/PageTitle";

// const ItemStock = () => {
//   const { data } = useAsync(PurchaseServices.getAllPurchases);
//   const [itemStockData, setItemStockData] = useState([]);

//   const { t } = useTranslation();

//   useEffect(() => {
//     const storedItemStockData = localStorage.getItem("itemStockData");
//     if (storedItemStockData) {
//       setItemStockData(JSON.parse(storedItemStockData));
//     }
//   }, []);

//   const saveItemStockDataToLocalStorage = (data) => {
//     localStorage.setItem("itemStockData", JSON.stringify(data));
//   };

//   const generateItemStock = () => {
//     const simplifiedItemStockData = [];

//     data?.forEach((purchase) => {
//       purchase.products.forEach((product) => {
//         const itemLabel = product.label;

//         const existingItemData = simplifiedItemStockData.find((item) => item.label === itemLabel);

//         if (existingItemData) {
//           existingItemData.stockcount += parseInt(purchase.quantity);
//         } else {
//           simplifiedItemStockData.push({ label: itemLabel, stockcount: parseInt(purchase.quantity) });
//         }
//       });
//     });

//     setItemStockData(simplifiedItemStockData);
//     saveItemStockDataToLocalStorage(simplifiedItemStockData);
//   };

//   useEffect(() => {
//     if (data) {
//       generateItemStock();
//     }
//   }, [data]);

//   return (
//     <>
//       <PageTitle>{t("Item Stock")}</PageTitle>

//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell>{t("Item")}</TableCell>
//               <TableCell>{t("Stock Count")}</TableCell>
//             </tr>
//           </TableHeader>
//           {itemStockData.length > 0 && (
//             <TableBody>
// 	      {itemStockData.map((item, index) => (
// 		<TableRow key={index}>
// 		  <TableCell>{item.label}</TableCell>
// 		  <TableCell>{item.stockcount}</TableCell>
// 		</TableRow>
// 	      ))}
// 	    </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default ItemStock;
