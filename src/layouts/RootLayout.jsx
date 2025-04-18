import { useEffect, useRef, useState } from "react";
// import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { ScrollPanel } from "primereact/scrollpanel";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import Navbar from "./navbar";
import {
  MdCurrencyExchange,
  MdOutlineCategory,
  MdOutlineManageAccounts,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { getEnableCurrency } from "../store/AsyncMethods/CurrencyMethod";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaFileContract, FaFileAlt } from "react-icons/fa";

function RootLayout({ children }) {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  const { success, error, user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: RESET_SUCCESS });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      dispatch(getEnableCurrency());
    }
  }, []);

  const items = [
    // {
    //   name: "Dashboard",
    //   path: "/dashboard",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: true,
    // },
    {
      name: "Manage Services",
      path: "/categories",
      icon: MdOutlineCategory,
      showInSidebar: true,
    },

  

    {
      name: "Add Service",
      path: "/add-categories",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      parents: ["Manage Categories"],
    },
    {
      name: "Edit Service",
      path: "/edit-categories",
      icon: MdOutlineCategory,
      showInSidebar: false,
      parents: ["Manage Categories"],
    },

    {
      name: "Manage Sub Services",
      path: "/sub-categories",
      icon: BiCategoryAlt,
      showInSidebar: true,
    },

    {
      name: "Manage Service Prices",
      path: "/service-price",
      icon: MdOutlineCategory,
      showInSidebar: true,
    },

    {
      name: "Manage Deals",
      path: "/deals",
      icon: MdOutlineCategory,
      showInSidebar: true,
    },

    {
      name: "Add Service Price",
      path: "/add-service-price",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      // parents: ["Manage Sub Categories"],
    },
    {
      name: "Edit Service Price",
      path: "/edit-service-price",
      icon: MdOutlineCategory,
      showInSidebar: false,
      // parents: ["Manage Sub Categories"],
    },

    {
      name: "Add Sub Service",
      path: "/add-sub-categories",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      parents: ["Manage Sub Categories"],
    },
    {
      name: "Edit Sub Service",
      path: "/edit-sub-categories",
      icon: MdOutlineCategory,
      showInSidebar: false,
      parents: ["Manage Sub Categories"],
    },

    

    // {
    //   name: "Manage Products",
    //   path: "/products",
    //   icon: MdOutlineLocalGroceryStore,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Product",
    //   path: "/add-product",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Products"],
    // },
    // {
    //   name: "Edit Product",
    //   path: "/edit-product",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Products"],
    // },
    // {
    //   name: "Manage Users",
    //   path: "/manage-users",
    //   icon: MdOutlineManageAccounts,
    //   showInSidebar: true,
    // },
    {
      name: "Add User",
      path: "/add-user",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      parents: ["Manage Users"],
    },
    {
      name: "Edit User",
      path: "/edit-user",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      parents: ["Manage Users"],
    },


    {
      name: "Contact Appointment",
      path: "/contact",
      icon: MdOutlineManageAccounts,
      showInSidebar: true,
    },

    {
      name: "Edit Contact",
      path: "/edit-contact",
      icon: AiOutlineAppstore,
      showInSidebar: false,
      // parents: ["Manage Sub Categories"],
    },

    {
      name: "Work Images",
      path: "/work-images",
      icon: MdOutlineManageAccounts,
      showInSidebar: true,
    },

    // Commendted ti

    // {
    //   name: "Manage Orders",
    //   path: "/orders",
    //   icon: MdShoppingCartCheckout,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Order",
    //   path: "/add-order",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Orders"],
    // },
    // {
    //   name: "Edit Order",
    //   path: "/edit-order",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Orders"],
    // },
    // {
    //   name: "Manage Currency",
    //   path: "/manage-currency",
    //   icon: MdCurrencyExchange,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Currency",
    //   path: "/add-currency",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Currency"],
    // },
    // {
    //   name: "Edit Currency",
    //   path: "/edit-currency",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Currency"],
    // },
    // {
    //   name: "Manage Customer",
    //   path: "/manage-customers",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Customer",
    //   path: "/add-customers",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: false,
    //   parents: ["Manage Customer"],
    // },
    // {
    //   name: "Edit Customer",
    //   path: "/edit-customer",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: false,
    //   parents: ["Manage Customer"],
    // },
    // {
    //   name: "Manage Vendor",
    //   path: "/manage-vendor",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Vendor",
    //   path: "/add-vendor",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: false,
    //   parents: ["Manage Vendor"],
    // },
    // {
    //   name: "Edit Vendor",
    //   path: "/edit-vendor",
    //   icon: BsFillPersonLinesFill,
    //   showInSidebar: false,
    //   parents: ["Manage Vendor"],
    // },
    // {
    //   name: "Manage Purchase",
    //   path: "/purchase",
    //   icon: MdShoppingCartCheckout,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Purchase",
    //   path: "/add-purchase",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Purchase"],
    // },
    // {
    //   name: "Edit Purchase",
    //   path: "/edit-purchase",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Purchase"],
    // },
    // {
    //   name: "Manage FAQs",
    //   path: "/faqs",
    //   icon: FaQuestionCircle,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add FAQs",
    //   path: "/add-faqs",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage FAQs"],
    // },
    // {
    //   name: "Edit FAQs",
    //   path: "/edit-faqs",
    //   icon: MdOutlineCategory,
    //   showInSidebar: false,
    //   parents: ["Manage FAQs"],
    // },
    // {
    //   name: "Manage T&Cs",
    //   path: "/terms",
    //   icon: FaFileContract,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Terms and Conditions",
    //   path: "/add-terms",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage T&Cs"],
    // },
    // {
    //   name: "Edit Terms and Conditions",
    //   path: "/edit-terms",
    //   icon: MdOutlineCategory,
    //   showInSidebar: false,
    //   parents: ["Manage T&Cs"],
    // },
    // {
    //   name: "Manage Policies",
    //   path: "/policies",
    //   icon: FaFileAlt,
    //   showInSidebar: true,
    // },
    // {
    //   name: "Add Policies",
    //   path: "/add-policies",
    //   icon: AiOutlineAppstore,
    //   showInSidebar: false,
    //   parents: ["Manage Policies"],
    // },
    // {
    //   name: "Edit Policies",
    //   path: "/edit-policies",
    //   icon: MdOutlineCategory,
    //   showInSidebar: false,
    //   parents: ["Manage Policies"],
    // },
  ];

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        open={open}
        Nav_animation={Nav_animation}
        sidebarRef={sidebarRef}
        setOpen={(value) => setOpen(value)}
        pathname={pathname}
        isTabletMid={isTabletMid}
        items={items}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar setOpen={(value) => setOpen(value)} items={items} />
        <div className="flex-1 overflow-y-auto">
          <div className="pt-6 mx-auto p-2 md:pr-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
