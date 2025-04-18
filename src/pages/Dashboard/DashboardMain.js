import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardTiles from "./DashboardTiles";
import { BiCategory, BiCategoryAlt, BiPackage } from "react-icons/bi";
import { TbBusinessplan } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import {
  MdOutlineDiscount,
  MdDiscount,
  MdOutlinePayments,
  MdPayments,
} from "react-icons/md";
import { HiOutlineReceiptRefund, HiReceiptRefund } from "react-icons/hi";
import { FaRegMoneyBillAlt, FaMoneyBill } from "react-icons/fa";
import {
  getDashboardCartData,
  getDashboardCount,
} from "../../store/AsyncMethods/DashboardMethod";
import DashboardBarChart from "./DashboardBarChart";
import { BiPurchaseTag } from "react-icons/bi";

export default function DashboardMain() {
  const { user } = useSelector((state) => state.AuthReducer);
  const currentDate = new Date();
  const { dashboardCount, chartData } = useSelector(
    (state) => state.DashboardReducer
  );
  const dispatch = useDispatch();

  const [dashboardData, setDashboardData] = useState(null);
  const [todaySaleData, setTodaySaleData] = useState(null);
  const [currentMonthSaleData, setCurrentMonthSaleData] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(getDashboardCount());
      dispatch(getDashboardCartData());
    }
  }, []);

  function getMonthTitle(monthIndex) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  }

  useEffect(() => {
    if (dashboardCount) {
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const currentMonthTitle = getMonthTitle(currentMonthIndex);
      setDashboardData([
        {
          amount: dashboardCount.total_categories || 0,
          title: "Total Categories",
          icon: <BiCategory />,
        },
        {
          amount: dashboardCount.total_subcategories || 0,
          title: "Total Sub Categories",
          icon: <BiCategoryAlt />,
        },
        {
          amount: dashboardCount.total_products || 0,
          title: "Total Products",
          icon: <BiPackage />,
        },
        {
          amount: dashboardCount.total_active_products || 0,
          title: "Total Active Products",
          icon: <LuPackageCheck />,
        },
        {
          amount: dashboardCount.total_purchase || 0,
          title: "Total Purchase Amount ",
          icon: <BiPurchaseTag />,
          prefix: "RS",
        },
        {
          amount: dashboardCount.total_orders || 0,
          title: "Total Orders ",
          icon: <TbBusinessplan />,
        },
        {
          amount: dashboardCount.total_pending_orders || 0,
          title: "Total Pendings",
          icon: <TbBusinessplan />,
        },
        {
          amount: dashboardCount.total_proceed_orders || 0,
          title: "Total Proceeds",
          icon: <TbBusinessplan />,
        },
        {
          amount: dashboardCount.total_delivered_orders || 0,
          title: "Total Delivereds",
          icon: <TbBusinessplan />,
        },
        {
          amount: dashboardCount.total_sales_amount || 0,
          title: "Total Sales Amount ",
          icon: <BiPurchaseTag />,
          prefix: "RS",
        },
      ]);

      setTodaySaleData([
        {
          amount: dashboardCount.current_date_sales || 0,
          title: "Today Sales Amount",
          icon: <MdOutlinePayments />,
          prefix: "RS",
        },
      ]);

      setCurrentMonthSaleData([
        {
          amount: dashboardCount.current_month_sales || 0,
          title: `${currentMonthTitle} Sales Amount`,
          icon: <MdPayments />,
          prefix: "RS",
        },
      ]);
    }
  }, [dashboardCount]);

  return (
    dashboardData &&
    chartData && (
      <div className="px-4">
        <div>
          <div className="my-3 font-semibold text-black/50 text-xl ml-1">
            Records
          </div>
          <div>{dashboardData && <DashboardTiles data={dashboardData} />}</div>
        </div>
        <div className="mt-8">
          <div className="my-3 font-semibold text-black/50 text-xl ml-1">
            Today Sales (
            {currentDate.toLocaleDateString("en-UK", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            )
          </div>
          <div>{todaySaleData && <DashboardTiles data={todaySaleData} />}</div>
        </div>
        <div className="mt-8">
          <div className="my-3 font-semibold text-black/50 text-xl ml-1">
            This Month Sales ({getMonthTitle(currentDate.getMonth())})
          </div>
          <div>
            {currentMonthSaleData && (
              <DashboardTiles data={currentMonthSaleData} />
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="my-3 font-semibold text-black/50 text-xl ml-1">
            Yearly Sales Record
          </div>
          <div className=" card shadow-md p-4">
            {chartData && chartData?.length > 0 ? (
              <DashboardBarChart data={chartData} />
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}
