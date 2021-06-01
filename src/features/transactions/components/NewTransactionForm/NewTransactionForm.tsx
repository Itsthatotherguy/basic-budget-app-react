import { FC, useState } from "react";
import { Button, DatePicker, Form, Input, Row, Space } from "antd";
import { useAppDispatch } from "../../../../app/hooks";
import {
  addNewTransaction,
  hideNewTransactionForm,
} from "../../store/transactionsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";
import CategoriesSelect from "../CategoriesSelect/CategoriesSelect";
import { FormValues } from "../../store/models";

const NewTransactionForm: FC = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [isSavingTransaction, setIsSavingTransaction] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClickSave = () => {
    try {
      setIsSavingTransaction(true);

      form
        .validateFields()
        .then(async (values: FormValues) => {
          form.resetFields();

          const actionResult = await dispatch(
            addNewTransaction({
              ...values,
              date: values.date.toISOString(),
            })
          );
          unwrapResult(actionResult);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    } catch (error) {
      setError(error);
    } finally {
      setIsSavingTransaction(false);
    }
  };

  const handleClickCancel = () => {
    dispatch(hideNewTransactionForm());
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {error && <ErrorAlert message={error} />}
      <Form
        layout="inline"
        style={{ width: "100%" }}
        initialValues={{}}
        form={form}
      >
        <Form.Item
          name="date"
          rules={[{ required: true, message: "A date is required." }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "A description is required.",
            },
          ]}
          style={{ flexGrow: 2 }}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[
            {
              required: true,
              message: "A category is required.",
            },
          ]}
          style={{ flexGrow: 2 }}
        >
          <CategoriesSelect />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: "An amount is required.",
            },
          ]}
          style={{ flexGrow: 1 }}
        >
          <Input placeholder="Amount" />
        </Form.Item>
      </Form>
      <Row>
        <Space>
          <Button
            htmlType="button"
            onClick={handleClickSave}
            loading={isSavingTransaction}
          >
            Save
          </Button>
          <Button htmlType="button" danger onClick={handleClickCancel}>
            Cancel
          </Button>
        </Space>
      </Row>
    </Space>
  );
};

export default NewTransactionForm;
