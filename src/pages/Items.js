import React, { useState, useEffect, useContext } from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ItemServices from "services/ItemServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ProductTable from "components/product/ProductTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import { showingTranslateValue } from "utils/translate";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
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
  Avatar
} from "@windmill/react-ui";
import useItemFilter from "hooks/useItemFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import EditDeleteButton from "components/table/EditDeleteButton";

const Items = () => {
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
  const { data, setLoading } = useAsync(() =>
    ItemServices.getAllItems({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    })
  );
  useEffect(() => {
    // Fetch the data from the API
    fetch(
      "https://attica.onrender.com/api/Items?page=1&limit=20&category=&title=&price="
    ) // Update the API endpoint to the correct URL
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
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
  console.log("Itemss", Items);
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useItemFilter(data?.Items);

  return (
    <>
      <PageTitle>{t("Itemss")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      {/* <DeleteModal ids={[]} setIsCheck={setIsCheck} title={title} /> */}

      <BulkActionDrawer ids={allId} title="Items" />
      <MainDrawer>
        {/* <ItemDrawer id={serviceId} /> */}
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
                {t("AddItem")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{"SR"}</TableCell>
              <TableCell>{t("Item Name")}</TableCell>
              <TableCell>{t("CategoryTbl")}</TableCell>
              <TableCell>{t("Description")}</TableCell>
              <TableCell>{"Units"}</TableCell>
              <TableCell>{t("PriceTbl")}</TableCell>
              {/* <TableCell>{t("StockTbl")}</TableCell> */}
              <TableCell className="text-center">{t("Status")}</TableCell>
              {/* <TableCell className="text-center">{t("Variants")}</TableCell> */}
              <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
            </tr>
          </TableHeader>

          <TableBody>

            {item?.map((item, i) => (
              <TableRow key={i + 1}>
                <TableCell>
                  <div className="flex item-center">
                    {item?.image[0] ? (
                      <Avatar
                        className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                        src={item?.image[0]}
                        alt="item"
                      />
                    ) : (
                      <Avatar
                        src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                        alt="item"
                      />
                    )}
                    <div>
                      <h2 className="text-sm font-medium">
                        {showingTranslateValue(item?.title, lang)?.substring(
                          0,
                          28
                        )}
                      </h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {showingTranslateValue(item?.category?.name, lang)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {showingTranslateValue(item?.description, lang)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">
                    {currency}
                    {Number(item?.prices?.originalPrice).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">
                    {currency}
                    {Number(item?.prices?.price).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.stock}</span>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/item/${item._id}`}
                    className="flex justify-center text-gray-400 hover:text-green-600"
                  >
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("DetailsTbl")}
                      bgColor="#10B981"
                    />
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <ShowHideButton id={item._id} status={item.status} />
                  {/* {item.status} */}
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
          <ProductTable
            lang={lang}
            isCheck={isCheck}
            products={data?.products}
            setIsCheck={setIsCheck}
            currency={currency}
          />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data?.totalDoc}
            resultsPerPage={limitData}
            onChange={handleChangePage}
            label="Item Page Navigation"
          />
        </TableFooter>
      </TableContainer>
      {/* ) : (
        <NotFound title="Item" />
      )} */}
    </>
  );
};
export default Items;
