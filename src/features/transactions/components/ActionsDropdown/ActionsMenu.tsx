import { FC } from "react";
import { Menu, Modal } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../../app/hooks";
import { ListTransactionsDto } from "../../store/models";
import {
    removeTransaction,
    showUpdateTransactionModal,
} from "../../store/transactionsSlice";

const { confirm } = Modal;

interface Props {
    transaction: ListTransactionsDto;
    hideDropdown: () => void;
}

const ActionsMenu: FC<Props> = ({ transaction, hideDropdown }) => {
    const dispatch = useAppDispatch();

    const handleClickEdit = (e: any) => {
        dispatch(showUpdateTransactionModal(transaction.id));
        hideDropdown();
    };

    const handleClickDelete = () => {
        confirm({
            title: "Are you sure you want to delete this transaction?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(removeTransaction(transaction.id));
            },
        });
        hideDropdown();
    };

    return (
        <Menu>
            <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={handleClickEdit}
            >
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
