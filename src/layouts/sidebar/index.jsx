import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
// import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebar = ({
  Nav_animation,
  open,
  setOpen,
  sidebarRef,
  pathname,
  isTabletMid,
  items,
}) => {
  const subMenusList = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: ["auth", "app settings", "stroage", "hosting"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] 
      overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center justify-between gap-3 font-medium border-b py-3 border-slate-300 mx-3">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {/* <img src="/images/logo-without-text.png" width={40} alt="" /> */}
            <span className="text-xl font-bold whitespace-pre text-primary my-auto mt-1">
              Beauty Service
            </span>
          </div>
          <motion.div
            animate={
              open
                ? {
                    x: 0,
                    rotate: 0,
                    opacity: 1,
                  }
                : {
                    x: 0,
                    rotate: 180,
                    opacity: 0,
                  }
            }
            transition={{ duration: 0.2 }}
            className="relative md:block hidden cursor-pointer"
          >
            <div className="flex items-center justify-center w-full h-full">
              <IoIosArrowBack size={20} />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden overflow-y-scroll scrollbar-hide md:h-[68%] h-[70%]">
            {items.map((link, index) =>
              link.showInSidebar ? (
                <li key={index}>
                  <NavLink to={link.path} className="link">
                    <link.icon size={23} className="min-w-max" />
                    {link.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {/* <li>
              <NavLink to={"/authentication"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Authentication
              </NavLink>
            </li>
            <li>
              <NavLink to={"/stroage"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Stroage
              </NavLink>
            </li> */}

            {/* {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
            </li> */}
          </ul>
          {/* {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )} */}

          {/* Add the collapse button here, after the menu items */}
        </div>
      </motion.div>
      {/* <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div> */}
    </div>
  );
};

export default Sidebar;
