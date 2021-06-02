import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  Update,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  CategoryType,
  CreateCategoryDto,
  UpdateCategoryDto,
  Category,
} from "./models";
import { RequestStatus } from "../../../app/models";
import * as client from "../categories-client";

interface SliceState {
  status: RequestStatus;
}

const adapter = createEntityAdapter<Category>({
  sortComparer: (a: Category, b: Category) => {
    if (a.categoryType === b.categoryType) {
      return a.name.localeCompare(b.name);
    }
    return a.categoryType.localeCompare(b.categoryType) * -1;
  },
});

const initialState = adapter.getInitialState<SliceState>({
  status: "idle",
});

export const fetchCategories = createAsyncThunk<
  Category[],
  null,
  {
    rejectValue: string[];
  }
>("categories/fetchCategories", async (_ = null, { rejectWithValue }) => {
  try {
    const response = await client.read();
    return response.categories;
  } catch (err) {
    let errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const addNewCategory = createAsyncThunk<
  Category,
  CreateCategoryDto,
  {
    rejectValue: string[];
  }
>("categories/addNewCategory", async (dto, { rejectWithValue }) => {
  try {
    const response = await client.create(dto);
    return response.category;
  } catch (err) {
    let errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const updateCategory = createAsyncThunk<
  Update<Category>,
  UpdateCategoryDto,
  {
    rejectValue: string[];
  }
>("categories/updateCategory", async (dto, { rejectWithValue }) => {
  try {
    await client.update(dto);

    const { id, ...changes } = dto;

    return {
      id,
      changes,
    };
  } catch (err) {
    let errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const deleteCategory = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string[];
  }
>("categories/deleteCategory", async (id: string, { rejectWithValue }) => {
  try {
    await client.remove(id);

    return id;
  } catch (err) {
    let errors: string[] = err;

    return rejectWithValue(errors);
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = "fail";
    });

    // builder.addCase(addNewCategory.pending, (state) => {
    //   state.status = "loading";
    // });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      adapter.addOne(state, action.payload);
    });
    // builder.addCase(addNewCategory.rejected, (state) => {
    //   state.status = "fail";
    // });

    builder.addCase(updateCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      adapter.updateOne(state, action.payload);
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.status = "fail";
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      adapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.status = "fail";
    });
  },
});

export default categoriesSlice.reducer;

export const {
  selectAll,
  selectById: selectCategoryById,
  selectEntities: selectAllCategoryEntities,
} = adapter.getSelectors((state: RootState) => state.categories);

export const selectCategoriesState = (state: RootState) => state.categories;

export const selectAllCategories = createSelector([selectAll], (categories) =>
  categories.map((category) => ({
    ...category,
    key: `category-${category.id}`,
  }))
);

export const selectIncomeCategories = createSelector(
  [selectAll],
  (categories) =>
    categories.filter(
      (category) => category.categoryType === CategoryType.Income
    )
);

export const selectExpenseCategories = createSelector(
  [selectAll],
  (categories) =>
    categories.filter(
      (category) => category.categoryType === CategoryType.Expenses
    )
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  (state) => state.status
);
