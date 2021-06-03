import { FC } from "react";
import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ActionsMenu from "./ActionsMenu";

interface Props {
  objectName: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const ActionsDropdown: FC<Props> = ({
  objectName,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <Dropdown
      overlay={
        <ActionsMenu
          objectName={objectName}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      }
      trigger={["click"]}
    >
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default ActionsDropdown;
