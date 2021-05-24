import { FC, useState } from "react";
import { message, Popconfirm, Button } from "antd";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteCategory } from "../../../store/categoriesSlice";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  categoryId: string;
}

const DeletePopconfirm: FC<Props> = ({ categoryId }) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);

      const actionResult = await dispatch(deleteCategory(categoryId));
      unwrapResult(actionResult);
    } catch (error) {
      console.error(error);
      message.error("The category could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
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
