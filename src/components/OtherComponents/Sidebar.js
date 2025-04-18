import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";

import {
  MdManageAccounts,
  MdEditCalendar,
  MdCalendarToday,
} from "react-icons/md";

import { HiPencilSquare } from "react-icons/hi2";

import { AiOutlineEdit } from "react-icons/ai";

import { useSelector } from "react-redux";

export default function Sidebar({ children, isOpen, toggle }) {
  //   const { user } = useSelector((state) => state.AdminAuthReducers);

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "/post-management",
      name: "Post Management",
      icon: <HiPencilSquare />,
    },
    {
      path: "/access-management",
      name: "Access Management",
      icon: <MdManageAccounts />,
    },
  ];
  return (
    <div className="sidebar-container">
      <div className={`sidebar-container-bar ${isOpen ? `w-3/12` : `w-1/12`}`}>
        <div onClick={() => toggle()}>
          <MdCalendarToday />
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidebar-container-bar-link my-4 py-3"
            activeclassName="sidebar-container-bar-active"
          >
            <div className="sidebar-container-bar-link-icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="sidebar-container-bar-link-text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}
