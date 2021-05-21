import { FC } from "react";
import { Button, Form, Input, message, Radio, Space } from "antd";
import useHttp from "../../../hooks/useHttp";
import { CategoryType, CreateCategoryDto } from "../../../models/category";
import ErrorAlert from "../../UI/ErrorAlert/ErrorAlert";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { categoryAdded } from "../../../features/categories/categoriesSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialValues: CreateCategoryDto = {
  name: "",
  type: CategoryType.Income,
};

const NewCategoryForm: FC = () => {
  const [form] = Form.useForm();
  const { error, isLoading, sendRequest: createCategoryRequest } = useHttp();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSubmitSuccess = (values: CreateCategoryDto) => {
    dispatch(categoryAdded(values));

    form.resetFields();
    history.push("/categories");

    // createCategoryRequest(
    //   {
    //     url: "/api/categories",
    //     method: "POST",
    //     body: values,
    //   },
    //   () => {
    //     message.success("Category successfully created.");
    //     form.resetFields();
    //     history.push("/categories");
    //   }
    // );
  };

  const handleSubmitFail = () => {
    message.error(
      "The category was not created. Please fix the validation errors and try again."
    );
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  return (
    <>
      {error && (
        <ErrorAlert message="Something went wrong. Please try again in a bit." />
      )}
      <Form
        layout="vertical"
        initialValues={initialValues}
        form={form}
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFail}
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
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
            <Button htmlType="button" onClick={handleClearForm}>
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewCategoryForm;
