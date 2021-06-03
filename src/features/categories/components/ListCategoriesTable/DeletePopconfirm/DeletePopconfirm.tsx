import { FC, useEffect } from "react";
import { message, Popconfirm, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { deleteCategory } from "../../../store/categoriesSlice";

interface Props {
  categoryId: string;
}

const DeletePopconfirm: FC<Props> = ({ categoryId }) => {
  const dispatch = useAppDispatch();
  const removingStatus = useAppSelector(
    (state) => state.categories.removingStatus
  );

  useEffect(() => {
    if (removingStatus === "fail") {
      message.error("Category was not removed successfully. Please try again.");
    }
  }, [removingStatus]);

  const handleConfirm = async () => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this category?"
      onConfirm={handleConfirm}
      okText="Yes"
      cancelText="No"
    >
      <Button htmlType="button">Delete</Button>
    </Popconfirm>
  );
};

export default DeletePopconfirm;
