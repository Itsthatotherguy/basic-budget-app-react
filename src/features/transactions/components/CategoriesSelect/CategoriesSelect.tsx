import { FC } from "react";
import { Select } from "antd";
import { useAppSelector } from "../../../../app/hooks";
import {
  selectExpenseCategories,
  selectIncomeCategories,
} from "../../../categories/store/categoriesSlice";

const CategoriesSelect: FC<any> = ({ ...restProps }) => {
  const incomeCategories = useAppSelector(selectIncomeCategories);
  const expenseCategories = useAppSelector(selectExpenseCategories);

  return (
    <Select placeholder="Category" {...restProps}>
      <Select.OptGroup label="Income">
        {incomeCategories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select.OptGroup>
      <Select.OptGroup label="Expense">
        {expenseCategories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select.OptGroup>
    </Select>
  );
};

export default CategoriesSelect;
