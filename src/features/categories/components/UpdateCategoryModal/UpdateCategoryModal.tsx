import { FC } from "react";
import { Modal, Form, Input, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";
import {
  CategoryFormValues,
  CategoryType,
  UpdateCategoryDto,
} from "../../store/models";
import {
  hideUpdateCategoryModal,
  selectEditingCategory,
  updateCategory,
} from "../../store/categoriesSlice";

const UpdateCategoryModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(
    (state) => state.categories.isUpdateCategoryModalVisible
  );
  const updatingStatus = useAppSelector(
    (state) => state.categories.updatingStatus
  );
  const updatingErrors = useAppSelector(
    (state) => state.categories.updatingErrors
  );
  const category = useAppSelector((state) => selectEditingCategory(state));

  const [form] = Form.useForm();

  let initialFormValues: CategoryFormValues = {
    name: category?.name || "",
    categoryType: category?.categoryType || CategoryType.Income,
  };

  const handleClickOk = () => {
    form.validateFields().then((values: CategoryFormValues) => {
      const dto: UpdateCategoryDto = {
        id: category?.id!,
        ...values,
      };

      dispatch(updateCategory(dto));
    });
  };

  const handleClickCancel = () => {
    dispatch(hideUpdateCategoryModal());
  };

  return (
    <Modal
      visible={isVisible}
      title="New category"
      okText="Save"
      cancelText="Cancel"
      onCancel={handleClickCancel}
      onOk={handleClickOk}
      confirmLoading={updatingStatus === "loading"}
    >
      {updatingStatus === "fail" && <ErrorAlert errors={updatingErrors} />}
      <Form initialValues={initialFormValues} form={form}>
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
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
