import { FC, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, message, Button, Input, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";
import {
  selectCategoryById,
  updateCategory,
} from "../../store/categoriesSlice";
import { CategoryFormValues, CategoryType } from "../../store/models";
import { unwrapResult } from "@reduxjs/toolkit";

const EditCategoryForm: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const category = useAppSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const initialFormValues: CategoryFormValues = {
    name: category ? category.name : "",
    type: category ? category.type : CategoryType.Income,
  };

  const handleFinish = async (values: CategoryFormValues) => {
    try {
      setIsUpdating(true);

      const actionResult = await dispatch(
        updateCategory({
          id: categoryId,
          ...values,
        })
      );
      unwrapResult(actionResult);

      history.push("/categories");
    } catch (error) {
      setError(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFinishFailed = () => {
    message.error("The category was not saved successfully. Please try again.");
  };

  return (
    <>
      {error && (
        <ErrorAlert message="Something went wrong. Please try again in a bit." />
      )}
      <Form
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={initialFormValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select a type." }]}
        >
          <Radio.Group>
            <Radio value={CategoryType.Income}>Income</Radio>
            <Radio value={CategoryType.Expenses}>Expenses</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCategoryForm;
