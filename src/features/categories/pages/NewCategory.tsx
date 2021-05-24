import { FC } from "react";
import PageHeader from "../../../app/components/PageHeader/PageHeader";
import PageContent from "../../../app/components/PageContent/PageContent";
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm";

const NewCategory: FC = () => {
  return (
    <>
      <PageHeader title="Add new category" onBack />
      <PageContent>
        <NewCategoryForm />
      </PageContent>
    </>
  );
};

export default NewCategory;
