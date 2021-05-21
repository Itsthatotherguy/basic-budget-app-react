import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";

import classes from "./Sidebar.module.css";
import clsx from "clsx";

const { Sider } = Layout;

type ActivePage = "HOME" | "CATEGORIES" | "TRANSACTIONS" | null;

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const [activePage, setActivePage] = useState<ActivePage>(null);

  useEffect(() => {
    const splitPathname = pathname.split("/");
    const page = splitPathname[1];

    switch (page) {
      case "":
        setActivePage("HOME");
        break;
      case "categories":
        setActivePage("CATEGORIES");
        break;
      case "transactions":
        setActivePage("TRANSACTIONS");
    }
  }, [pathname]);

  const menuItems: { pageKey: ActivePage; route: string; label: string }[] = [
    { pageKey: "HOME", route: "/", label: "Home" },
    { pageKey: "CATEGORIES", route: "/categories", label: "Categories" },
    { pageKey: "TRANSACTIONS", route: "/transactions", label: "Transactions" },
  ];

  // ant-menu-item-selected
  return (
    <Sider>
      <div className={classes["logo"]}></div>
      <Menu theme="dark" mode="inline">
        {menuItems.map(({ label, pageKey, route }) => (
          <Menu.Item
            key={pageKey}
            className={clsx(activePage === pageKey && "ant-menu-item-selected")}
          >
            <Link to={route}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
