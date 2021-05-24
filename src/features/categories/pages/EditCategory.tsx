import { FC } from "react";
import PageContent from "../../../app/components/PageContent/PageContent";
import PageHeader from "../../../app/components/PageHeader/PageHeader";
import EditCategoryForm from "../components/EditCategoryForm/EditCategoryForm";

const EditCategory: FC = () => {
  return (
    <>
      <PageHeader title="Edit category" onBack />
      <PageContent>
        <EditCategoryForm />
      </PageContent>
    </>
  );
};

export default EditCategory;
