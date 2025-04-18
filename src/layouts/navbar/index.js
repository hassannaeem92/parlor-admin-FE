import React, { useRef, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { BreadCrumb } from "primereact/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../store/Types/AuthTypes";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function Navbar({ setOpen, items }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const menu = useRef(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const [showDelDialog, setShowDelDialog] = useState(false);

  const matchPath = items.find((link) => currentPath.startsWith(link.path));

  const home = { icon: "pi pi-home" };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const accept = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  };

  const reject = () => {
    setShowDelDialog(false);
  };

  const generateBreadcrumbs = () => {
    if (!matchPath) {
      return [];
    }

    const breadcrumbs = [];
    if (matchPath.parents) {
      matchPath.parents.forEach((parent) => {
        const parentLink = items.find((link) => link.name === parent);
        if (parentLink) {
          breadcrumbs.push({
            label: parentLink.name,
            icon: parentLink.icon,
            url: parentLink.path,
            command: () => navigate(parentLink.path),
          });
        }
      });
    }

    breadcrumbs.push({
      label: matchPath.name,
      icon: matchPath.icon,
      command: () => navigate(matchPath.path),
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  let profileItems = [
    {
      command: () => {},
      template: (item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center p-2 px-4 gap-1 text-color hover:surface-200 border-noround"
            )}
          >
            <Avatar
              label="A"
              className="mx-2 my-auto dark:text-white dark:bg-primary cursor-pointer"
              shape="circle"
            />
            <div className="flex flex-col align">
              <span className="font-bold capitalize">{user?.first_name}</span>
              <span className="text-sm capitalize mx-auto">Admin</span>
            </div>
          </button>
        );
      },
    },
    { separator: true },
    {
      label: "Log out",
      icon: "pi pi-sign-out",
      command: () => {
        setShowDelDialog(true);
      },
    },
  ];

  const startContent = (
    <React.Fragment>
      <div className="flex gap-4">
        <div className="md:hidden  my-auto" onClick={() => setOpen(true)}>
          <MdMenu size={30} />
        </div>
        <div>
          <div className="text-3xl font-bold text-black/90 dark:text-white/90">
            {matchPath?.name}
          </div>
          <div>
            {/* <BreadCrumb
              model={breadcrumbItems}
              home={home}
              pt={{
                root: { className: "bg-inherit !p-0 !border-none" },
                label: { className: "dark:text-white/70" },
              }}
            /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  const endContent = (
    <React.Fragment>
      <div>
        <Avatar
          label="A"
          size="large"
          shape="circle"
          className="dark:text-white cursor-pointer"
          onClick={(e) => menu.current.toggle(e)}
        />
        <Menu
          model={profileItems}
          popup
          ref={menu}
          className="p-0 profile-menu"
          pt={{
            icon: { className: "text-start" },
            label: { className: "mx-2" },
            menuitem: { className: "hover:bg-secondary hover:text-white" },
            separator: { className: "border-t" },
          }}
        />
        <ConfirmDialog
          message="Do you want to Log out of your acount?"
          header="Log out confirmation"
          icon="pi pi-power-off"
          accept={accept}
          reject={reject}
          acceptLabel="Log out"
          visible={showDelDialog}
          onHide={() => setShowDelDialog(false)}
          pt={{
            acceptButton: {
              className: "p-red-btn",
            },
            rejectButton: {
              className: "p-primary-btn",
            },
            root: {
              className: "w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12",
            },
            icon: {
              className: "mx-2",
            },
          }}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <Toolbar
        className="w-full sticky z-40"
        pt={{
          root: {
            className: "bg-white border-none shadow-md rounded-none !p-2 !px-4",
          },
        }}
        start={startContent}
        end={endContent}
      />
    </div>
  );
}
