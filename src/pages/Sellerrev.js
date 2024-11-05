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
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { SidebarContext } from "context/SidebarContext";
import SellerServices from "services/SellerServices";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import SellerRevDrawer from "components/drawer/SellerRevDrawer";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import SellerTable from "components/coupon/SellerTable";
import NotFound from "components/table/NotFound";
import UploadManyTwo from "components/common/UploadManyTwo";
import { t } from "i18next";

const Coupons = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading } = useAsync(SellerServices.getAllSellers);
  // console.log('data',data)
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const {
    handleSubmitCoupon,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
    handleSelectFile,
    filename,
    isDisabled,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Revisited Seller Page")}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Seller"
      />
      <BulkActionDrawer ids={allId} title="Seller" />

      <MainDrawer>
        <SellerRevDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCoupon}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <Button
                onClick={toggleDrawer}
                className="w-full rounded-md h-12"
                id="styleButton"
              >
                <span className="mr-2">
                  <FiPlus />
                </span>
                {t("Add Seller")}
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
              <TableCell>{t("Seller")}</TableCell>
              <TableCell>{t("Address")}</TableCell>
              <TableCell>{t("Products")}</TableCell>
              <TableCell className="text-right">
                {t("CoupTblActions")}
              </TableCell>
            </tr>
          </TableHeader>
          <SellerTable
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

export default Coupons;
