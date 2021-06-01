import { FC, useState } from "react";
import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ActionsMenu from "./ActionsMenu";
import { ListTransactionsDto } from "../../store/models";

interface Props {
    transaction: ListTransactionsDto;
}

const ActionsDropdown: FC<Props> = ({ transaction }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleHideDropdown = () => {
        setIsVisible(false);
    };

    const handleVisibleChange = (flag: any) => {
        setIsVisible(flag);
    };

    return (
        <Dropdown
            overlay={
                <ActionsMenu
                    transaction={transaction}
                    hideDropdown={handleHideDropdown}
                />
            }
            onVisibleChange={handleVisibleChange}
            visible={isVisible}
            trigger={["click"]}
        >
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
};

export default ActionsDropdown;
