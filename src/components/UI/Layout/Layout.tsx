import { FC } from "react";

import { Layout as AntLayout } from "antd";

import Sidebar from "../Sidebar/Sidebar";

const { Content } = AntLayout;

const Layout: FC = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <AntLayout>
        <Content>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
