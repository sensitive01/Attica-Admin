import { PageTitle } from "components/Typography/PageTitle";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    suppliers: 0,
    sellers: 0,
    totalStock: 0,
    totalProducts: 0,
    totalItems: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('/api/dashboard'); // Assuming the API route is set up in your backend

        setCounts({
          suppliers: response.data.suppliers || 0,
          sellers: response.data.sellers || 0,
          totalStock: response.data.totalStock || 0,
          totalProducts: response.data.products || 0,
          totalItems: response.data.items || 0,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []); // Ensure this effect runs only once on component mount

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Suppliers"
          count={counts.suppliers}
          Icon={FiShoppingCart}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Sellers"
          count={counts.sellers}
          Icon={FiRefreshCw}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Total Stock"
          count={counts.totalStock}
          Icon={FiTruck}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Total Products"
          count={counts.totalProducts}
          Icon={FiCheck}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
        <CardItem
          title="Total Items"
          count={counts.totalItems}
          Icon={FiCheck}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>
    </>
  );
};

export default Dashboard;
