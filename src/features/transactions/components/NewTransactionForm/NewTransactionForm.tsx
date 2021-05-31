import { FC, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
    fetchCategories,
    selectAllCategories,
    selectExpenseCategories,
    selectIncomeCategories,
} from "../../../categories/store/categoriesSlice";
import { Category, CategoryType } from "../../../categories/store/models";
import { hideNewTransactionForm } from "../../store/transactionsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorAlert from "../../../../app/components/ErrorAlert/ErrorAlert";

const NewTransactionForm: FC = () => {
    const dispatch = useAppDispatch();
    const incomeCategories = useAppSelector(selectIncomeCategories);
    const expenseCategories = useAppSelector(selectExpenseCategories);

    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setIsLoadingCategories(true);

                const actionResult = await dispatch(fetchCategories());
                unwrapResult(actionResult);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoadingCategories(false);
            }
        };
        if (incomeCategories.length < 1 || expenseCategories.length < 1) {
            fetchCategoryData();
        }
    }, [incomeCategories, expenseCategories, dispatch]);

    const handleClickCancel = () => {
        dispatch(hideNewTransactionForm());
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
            {error && <ErrorAlert message={error} />}
            <Form layout="inline" style={{ width: "100%" }}>
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
                    <Select
                        loading={isLoadingCategories}
                        placeholder="Category"
                    >
                        <Select.OptGroup label="Income">
                            {incomeCategories.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select.OptGroup>
                        <Select.OptGroup label="Expense">
                            {expenseCategories.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select.OptGroup>
                    </Select>
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
                    <Button htmlType="button">Save as reviewed</Button>
                    <Button htmlType="button">Save as unreviewed</Button>
                    <Button
                        htmlType="button"
                        danger
                        onClick={handleClickCancel}
                    >
                        Cancel
                    </Button>
                </Space>
            </Row>
        </Space>
    );
};

export default NewTransactionForm;
