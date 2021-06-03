import { Menu, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FC } from "react";

const { confirm } = Modal;

interface Props {
  objectName: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const ActionsMenu: FC<Props> = ({ objectName, onClickDelete, onClickEdit }) => {
  const handleClickEdit = () => {
    onClickEdit();
  };

  const handleClickDelete = () => {
    confirm({
      title: `Are you sure you want to delete this ${objectName.toLowerCase()}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onClickDelete();
      },
    });
  };

  return (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={handleClickEdit}>
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={handleClickDelete}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
};

export default ActionsMenu;
