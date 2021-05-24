import { FC } from "react";

import classes from "./PageContent.module.css";

const PageContent: FC = ({ children }) => {
  return <main className={classes["page-content"]}>{children}</main>;
};

export default PageContent;
