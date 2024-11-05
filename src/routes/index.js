import { lazy } from "react";

// use lazy for better code splitting

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Attributes = lazy(() => import("../pages/Attributes"));
const ChildAttributes = lazy(() => import("../pages/ChildAttributes"));
const Product = lazy(() => import("../pages/Product"));

const Items = lazy(() => import("../pages/Items"));
const Purchases = lazy(() => import("../pages/Purchases"));
const PurchasesRev = lazy(() => import("../pages/PurchasesRev"));

const Supplier = lazy(() => import("../pages/Supplier"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Category = lazy(() => import("../pages/Category"));
const ChildCategory = lazy(() => import("../pages/ChildCategory"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Languages = lazy(() => import("../pages/Languages"));
const Currencies = lazy(() => import("../pages/Currencies"));
const Setting = lazy(() => import("../pages/Setting"));
const AddSupplierItems = lazy(() => import("../pages/AddSupplierItems"));
const Seller = lazy(() => import("../pages/Seller"));
const Sellerrev = lazy(() => import("../pages/Sellerrev"));
const Supplies = lazy(() => import("../pages/Supplies"));
const SupplierRev =lazy(()=>import("../pages/SupplierRev"));
const ProductStock = lazy(() => import("../pages/ProductStock"));
const Production = lazy(() => import("../pages/Production"));
const ProductionDrawer = lazy(() => import("../components/drawer/ProductionDrawer"));

const ItemStock = lazy(() => import("../pages/ItemStock"));
const TestMap = lazy(() => import("../components/map/TestMap"));
const SellerDrawer = lazy(() => import("components/drawer/SellerDrawer"));
const ExecutiveLogin =lazy(()=>import("pages/ExecutiveLogin"));
const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/production",
  //   component: Products,
  // },
  {
    path:"/product",
    component:Product,
  },
  {
    path: "/items",
    component: Items,
  },
  {
    path: "/attributes",
    component: Attributes,
  },
  {
    path: "/productstock",
    component: ProductStock,
  },
  {
    path: "/itemstock",
    component: ItemStock,
  },
  {
    path: "/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/languages",
    component: Languages,
  },
  {
    path: "/currencies",
    component: Currencies,
  },

  {
    path: "/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/supplier",
    component: Supplier,
  },
  {
    path:"/supplierrev",
    component:SupplierRev,
  },
  {
    path:"/sellererrev",
    component:Sellerrev,
  },

  {
    path: "/purchases",
    component: Purchases,
  },
  {
    path: "/purchasesrev",
    component: PurchasesRev,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/supplies",
    component: Supplies,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/settings", component: Setting },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/addsupplieritem",
    component: AddSupplierItems,
  },
  {
    path: "/seller",
    component: Seller,
  },
  {
    path: "/sellerdrawer",
    component: SellerDrawer,
  },
  {
    path: "/testmap",
    component: TestMap,
  },
  {
    path:"/productionrev",
    component:Production,
  },
  {
    path:"/executive",
    component:ExecutiveLogin,
  }
];

export default routes;
