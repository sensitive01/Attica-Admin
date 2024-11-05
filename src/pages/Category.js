import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import

import useAsync from "hooks/useAsync";
import { SidebarContext } from "context/SidebarContext";
import CategoryServices from "services/CategoryServices";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import PageTitle from "components/Typography/PageTitle";
import MainDrawer from "components/drawer/MainDrawer";
import CategoryDrawer from "components/drawer/CategoryDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import SwitchToggleChildCat from "components/form/SwitchToggleChildCat";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import CategoryTable from "components/category/CategoryTable";
import NotFound from "components/table/NotFound";

const Category = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const { data, loading } = useAsync(CategoryServices.getAllCategory);
  const { data: getAllCategories } = useAsync(CategoryServices.getAllCategories);

  const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();

  const { t } = useTranslation();

  const {
    handleSubmitCategory,
    categoryRef,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data[0]?.children ? data[0]?.children : data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data[0]?.children.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  return (
    <>
     <PageTitle>{t("Category")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <BulkActionDrawer ids={allId} title="Categories" lang={lang} data={data} isCheck={isCheck} />

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
          <form onSubmit={handleSubmitCategory} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full" id="styleButton">
                  <span className="mr-2">
                    <FiPlus />
                  </span>

                  {t("AddCategory")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

     
      <SwitchToggleChildCat
        title=" "
        handleProcess={setShowChild}
        processOption={showChild}
        name={showChild}
      />
      {/* {loading ? ( */}
        {/* // <TableLoading row={12} col={6} width={190} height={20} /> */}
      {/* // ) : serviceData?.length !== 0 ? ( */}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                
                <TableCell>{("SR.No")}</TableCell>
                <TableCell>{t("catIdTbl")}</TableCell>
                {/* <TableCell>{t("catIconTbl")}</TableCell> */}
                <TableCell>{t("CatTbName")}</TableCell>
                {/* <TableCell>{t("CatTbDescription")}</TableCell> */}
                <TableCell className="text-center">{t("Status")}</TableCell>
                <TableCell className="text-right">{t("catActionsTbl")}</TableCell>
              </tr>
            </TableHeader>

            <CategoryTable
              data={data}
              lang={lang}
              isCheck={isCheck}
              categories={dataTable}
              setIsCheck={setIsCheck}
              showChild={showChild}
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
      {/* // ) : ( */}
        {/* // <NotFound title="Sorry, There are no categories right now." /> */}
      {/* // ) */}
    {/* // } */}
    </>
  );
};

export default Category;
// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Pagination,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
// } from "@windmill/react-ui";
// import { useContext, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

// //internal import

// import useAsync from "hooks/useAsync";
// import { SidebarContext } from "context/SidebarContext";
// import CategoryServices from "services/CategoryServices";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import useFilter from "hooks/useFilter";
// import DeleteModal from "components/modal/DeleteModal";
// import BulkActionDrawer from "components/drawer/BulkActionDrawer";
// import PageTitle from "components/Typography/PageTitle";
// import MainDrawer from "components/drawer/MainDrawer";
// import CategoryDrawer from "components/drawer/CategoryDrawer";
// import UploadManyTwo from "components/common/UploadManyTwo";
// import SwitchToggleChildCat from "components/form/SwitchToggleChildCat";
// import TableLoading from "components/preloader/TableLoading";
// import CheckBox from "components/form/CheckBox";
// import CategoryTable from "components/category/CategoryTable";
// import NotFound from "components/table/NotFound";

// const Category = () => {
//   const { toggleDrawer, lang } = useContext(SidebarContext);

//   const { data, loading } = useAsync(CategoryServices.getAllCategory);
//   const { data: getAllCategories } = useAsync(CategoryServices.getAllCategories);

//   const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();

//   const { t } = useTranslation();

//   const {
//     handleSubmitCategory,
//     categoryRef,
//     totalResults,
//     resultsPerPage,
//     dataTable,
//     serviceData,
//     handleChangePage,
//     filename,
//     isDisabled,
//     handleSelectFile,
//     handleUploadMultiple,
//     handleRemoveSelectFile,
//   } = useFilter(data[0]?.children ? data[0]?.children : data);

//   // react hooks
//   const [isCheckAll, setIsCheckAll] = useState(false);
//   const [isCheck, setIsCheck] = useState([]);
//   const [showChild, setShowChild] = useState(false);

//   const handleSelectAll = () => {
//     setIsCheckAll(!isCheckAll);
//     setIsCheck(data[0]?.children.map((li) => li._id));
//     if (isCheckAll) {
//       setIsCheck([]);
//     }
//   };

//   return (
//     <>
//      <PageTitle>{t("Category")}</PageTitle>
//       <DeleteModal ids={allId} setIsCheck={setIsCheck} />

//       {/* <BulkActionDrawer ids={allId} title="Categories" lang={lang} data={data} isCheck={isCheck} /> */}

//       <MainDrawer>
//         <CategoryDrawer id={serviceId} data={data} lang={lang} />
//       </MainDrawer>

//       <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//         <CardBody className="">
//           {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
//           <form onSubmit={handleSubmitCategory} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
//             {/* </div> */}
            
//               <div className="w-full md:w-48 lg:w-48 xl:w-48">
//                 <Button onClick={toggleDrawer} className="rounded-md h-12 w-full" id="styleButton">
//                   <span className="mr-2">
//                     <FiPlus />
//                   </span>

//                   {t("AddCategory")}
//                 </Button>
//             </div>
//           </form>
//         </CardBody>
//       </Card>

      

//       <SwitchToggleChildCat
//         title=" "
//         handleProcess={setShowChild}
//         processOption={showChild}
//         name={showChild}
//       />
//       {/* {loading ? ( */}
//         {/* // <TableLoading row={12} col={6} width={190} height={20} /> */}
//       {/* // ) : serviceData?.length !== 0 ? ( */}
//         <TableContainer className="mb-8">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell>
//                   <CheckBox
//                     type="checkbox"
//                     name="selectAll"
//                     id="selectAll"
//                     handleClick={handleSelectAll}
//                     isChecked={isCheckAll}
//                   />
//                 </TableCell>
//                 <TableCell>{("SR.No")}</TableCell>
//                 <TableCell>{t("catIdTbl")}</TableCell>
//                 {/* <TableCell>{t("catIconTbl")}</TableCell> */}
//                 <TableCell>{t("CatTbName")}</TableCell>
//                 {/* <TableCell>{t("CatTbDescription")}</TableCell> */}
//                 <TableCell className="text-center">{t("Status")}</TableCell>
//                 <TableCell className="text-right">{t("catActionsTbl")}</TableCell>
//               </tr>
//             </TableHeader>

//             <CategoryTable
//               data={data}
//               lang={lang}
//               isCheck={isCheck}
//               categories={dataTable}
//               setIsCheck={setIsCheck}
//               showChild={showChild}
//             />
//           </Table>

//           <TableFooter>
//             <Pagination
//               totalResults={totalResults}
//               resultsPerPage={resultsPerPage}
//               onChange={handleChangePage}
//               label="Table navigation"
//             />
//           </TableFooter>
//         </TableContainer>
//       {/* // ) : ( */}
//         {/* // <NotFound title="Sorry, There are no categories right now." /> */}
//       {/* // ) */}
//     {/* // } */}
//     </>
//   );
// };

// export default Category;