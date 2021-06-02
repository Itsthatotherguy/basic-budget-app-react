import { FC, useState } from "react";
import { Button, Form, Input, message, Radio, Space } from "antd";
import { useHistory } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { CategoryType, CreateCategoryDto } from "../../store/models";
import { useAppDispatch } from "../../../../app/hooks";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";
import { addNewCategory } from "../../store/categoriesSlice";

const initialValues: CreateCategoryDto = {
  name: "",
  categoryType: CategoryType.Income,
};

const NewCategoryForm: FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmitSuccess = async (values: CreateCategoryDto) => {
    try {
      setIsAdding(true);

      unwrapResult(await dispatch(addNewCategory(values)));

      history.push("/categories");
    } catch (err) {
      const errors: string[] = err;

      setErrors(errors);
    } finally {
      setIsAdding(false);
    }
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
      {errors.length > 0 && <ErrorAlert errors={errors} />}
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
          label="Category Type"
          name="categoryType"
          rules={[{ required: true, message: "Please select a type." }]}
        >
          <Radio.Group>
            <Radio value="blablalb">Income</Radio>
            <Radio value={CategoryType.Expenses}>Expenses</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isAdding}>
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
