import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  Category,
  CategoryType,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./models";
import { RequestStatus } from "../../../app/models";
import * as client from "../categories-client";

interface SliceState {
  status: RequestStatus;
  error: string | null | undefined;
  isFetchingCategories: boolean;
}

const adapter = createEntityAdapter<Category>({
  sortComparer: (a: Category, b: Category) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type.localeCompare(b.type) * -1;
  },
});

const initialState = adapter.getInitialState<SliceState>({
  status: "idle",
  error: null,
  isFetchingCategories: false,
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const { categories } = await client.read();

    return categories;
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async (createCategoryDto: CreateCategoryDto) => {
    const { category } = await client.create(createCategoryDto);

    return category;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (updateCategoryDto: UpdateCategoryDto) => {
    await client.update(updateCategoryDto);

    const { id, ...changes } = updateCategoryDto;

    return {
      id,
      changes,
    };
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    await client.remove(id);

    return id;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = "loading";
      state.isFetchingCategories = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isFetchingCategories = false;
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "fail";
      state.isFetchingCategories = false;
      state.error = action.error.message;
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      adapter.updateOne(state, action.payload);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      adapter.removeOne(state, action.payload);
    });
  },
});

export default categoriesSlice.reducer;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectEntities: selectAllCategoryEntities,
} = adapter.getSelectors((state: RootState) => state.categories);

export const selectCategoriesState = (state: RootState) => state.categories;

export const selectIncomeCategories = createSelector(
  [selectAllCategories],
  (categories) =>
    categories.filter((category) => category.type === CategoryType.Income)
);

export const selectExpenseCategories = createSelector(
  [selectAllCategories],
  (categories) =>
    categories.filter((category) => category.type === CategoryType.Expenses)
);

export const selectIsFetchingCategories = createSelector(
  [selectCategoriesState],
  (state) => state.isFetchingCategories
);
