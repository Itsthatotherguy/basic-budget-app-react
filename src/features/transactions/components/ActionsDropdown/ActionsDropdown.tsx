import { FC } from "react";
import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ActionsMenu from "./ActionsMenu";
import { Transaction } from "../../store/models";

interface Props {
  transaction: Transaction;
}

const ActionsDropdown: FC<Props> = ({ transaction }) => {
  return (
    <Dropdown
      overlay={<ActionsMenu transaction={transaction} />}
      trigger={["click"]}
    >
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default ActionsDropdown;
