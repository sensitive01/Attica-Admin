import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios library
import { WindmillContext } from "@windmill/react-ui";
import { SidebarContext } from "context/SidebarContext";
import PageTitle from "components/Typography/PageTitle";
import CardItem from "components/dashboard/CardItem";
import { FiShoppingCart, FiRefreshCw, FiTruck, FiCheck, FiSlack } from "react-icons/fi";

const Dashboard = () => {
  const { mode } = useContext(WindmillContext);
  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

  const [counts, setCounts] = useState({
    suppliers: 0,
    sellers: 0,
    totalStock: 0,
    totalProducts: 0,
    totalItems: 0,
  });

  // Your existing imports and code

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("https://attica.onrender.com/api/dashboard");
        console.log("API Response:", response.data); // Log API response for debugging

        setCounts({
          suppliers: response.data.suppliers || 0,
          sellers: response.data.sellers || 0,
          totalStock: response.data.totalStock || 0,
          totalProducts: response.data.products || 0,
          totalItems: response.data.items || 0,
        });
      } catch (error) {
        console.error(`Error fetching counts: ${error}`);
        console.log("API Error Response:", error.response.data); // Log API error response data
      }
    };

    fetchCounts();
  }, []);

  const CardItem = ({ title, count, Icon, className }) => {
    return (
      <div
        className={`flex items-center p-4 bg-white rounded-lg shadow-sm ${className}`}
      >
        <Icon className="h-8 w-8 text-indigo-500" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {count}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <CardItem
          title="Suppliers"
          count={counts.suppliers}
          Icon={FiSlack}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Sellers"
          count={counts.sellers}
          Icon={FiSlack}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />

        
        <CardItem
          title="Total Products"
          count={counts.totalProducts}
          Icon={FiShoppingCart}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
        <CardItem
          title="Total Items"
          count={counts.totalItems}
          Icon={FiShoppingCart}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>
    </>
  );
};

export default Dashboard;





