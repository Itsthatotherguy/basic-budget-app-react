import { FC } from "react";
import NewCategoryForm from "../../components/Categories/NewCategoryForm/NewCategoryForm";
import PageContent from "../../components/UI/PageContent/PageContent";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

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
