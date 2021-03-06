import { FC } from "react";
import { Modal, Form, DatePicker, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  hideUpdateTransactionModal,
  selectEditingTransaction,
  updateTransaction,
} from "../../store/transactionsSlice";
import moment from "moment";
import numeral from "numeral";
import CategoriesSelect from "../CategoriesSelect/CategoriesSelect";
import { UpdateTransactionDto } from "../../store/models";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";

interface FormValues {
  date: moment.Moment;
  description: string;
  category: string;
  amount: string;
}

const UpdateTransactionModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(
    (state) => state.transactions.isUpdateTransactionModalVisible
  );
  const updatingStatus = useAppSelector(
    (state) => state.transactions.updatingStatus
  );
  const updatingErrors = useAppSelector(
    (state) => state.transactions.updatingErrors
  );
  const transaction = useAppSelector((state) =>
    selectEditingTransaction(state)
  );

  let initialFormValues: FormValues = {
    date: moment(transaction?.date),
    description: transaction?.description || "",
    category: transaction?.category.id || "",
    amount: numeral(transaction?.amount).format("0,0.00") || "",
  };

  const [form] = Form.useForm();

  const handleClickOk = () => {
    form.validateFields().then((values: FormValues) => {
      const dto: UpdateTransactionDto = {
        id: transaction!.id,
        date: moment(values.date).toISOString(),
        description: values.description,
        categoryId: values.category,
        amount: +values.amount,
      };

      dispatch(updateTransaction(dto));
    });
  };

  const handleClickCancel = () => {
    dispatch(hideUpdateTransactionModal());
  };

  return (
    <Modal
      visible={isVisible}
      title="Update transaction"
      okText="Update"
      cancelText="Cancel"
      onCancel={handleClickCancel}
      onOk={handleClickOk}
      confirmLoading={updatingStatus === "loading"}
    >
      {updatingStatus === "fail" && <ErrorAlert errors={updatingErrors} />}
      <Form
        form={form}
        layout="vertical"
        name="update_transaction_form"
        initialValues={initialFormValues}
      >
        <Form.Item name="date" label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <CategoriesSelect />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTransactionModal;
