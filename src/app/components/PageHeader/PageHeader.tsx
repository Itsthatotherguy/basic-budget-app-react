import { FC, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import { PageHeader as AntPageHeader, PageHeaderProps } from "antd";

interface Props {
  title: string;
  extra?: ReactNode;
  onBack?: boolean;
}

const PageHeader: FC<Props> = ({ title, extra, onBack = false }) => {
  const { goBack } = useHistory();

  const props: PageHeaderProps = {
    title,
    extra,
  };

  if (onBack) {
    props.onBack = goBack;
  }

  return <AntPageHeader ghost={false} {...props} />;
};

export default PageHeader;
