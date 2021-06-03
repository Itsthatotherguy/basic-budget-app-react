import { FC } from "react";
import { Modal, Form, Input, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  addNewCategory,
  hideNewCategoryModal,
} from "../../store/categoriesSlice";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";
import { CategoryFormValues, CategoryType } from "../../store/models";

const initialValues: CategoryFormValues = {
  name: "",
  categoryType: CategoryType.Income,
};

const AddCategoryModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(
    (state) => state.categories.isNewCategoryModalVisible
  );
  const addingStatus = useAppSelector((state) => state.categories.addingStatus);
  const addingErrors = useAppSelector((state) => state.categories.addingErrors);

  const [form] = Form.useForm();

  const handleClickOk = () => {
    form.validateFields().then((values: CategoryFormValues) => {
      dispatch(addNewCategory(values));
    });
  };

  const handleClickCancel = () => {
    dispatch(hideNewCategoryModal());
  };

  return (
    <Modal
      visible={isVisible}
      title="New category"
      okText="Save"
      cancelText="Cancel"
      onCancel={handleClickCancel}
      onOk={handleClickOk}
      confirmLoading={addingStatus === "loading"}
    >
      {addingStatus === "fail" && <ErrorAlert errors={addingErrors} />}
      <Form layout="vertical" initialValues={initialValues} form={form}>
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
            <Radio value={CategoryType.Income}>Income</Radio>
            <Radio value={CategoryType.Expenses}>Expenses</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
