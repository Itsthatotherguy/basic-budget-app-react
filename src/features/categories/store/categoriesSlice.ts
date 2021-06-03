import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
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
  fetchingStatus: RequestStatus;
  fetchingErrors: string[];
  addingStatus: RequestStatus;
  addingErrors: string[];
  updatingStatus: RequestStatus;
  updatingErrors: string[];
  removingStatus: RequestStatus;
  removingErrors: string[];

  isNewCategoryModalVisible: boolean;
  isUpdateCategoryModalVisible: boolean;

  editingId: string;
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
  fetchingStatus: "idle",
  fetchingErrors: [],

  addingStatus: "idle",
  addingErrors: [],

  updatingStatus: "idle",
  updatingErrors: [],

  removingStatus: "idle",
  removingErrors: [],

  isNewCategoryModalVisible: false,
  isUpdateCategoryModalVisible: false,

  editingId: "",
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
  reducers: {
    setAddingStatusToIdle: (state) => {
      state.addingStatus = "idle";
    },
    setUpdatingStatusToIdle: (state) => {
      state.updatingStatus = "idle";
    },

    showNewCategoryModal: (state) => {
      state.isNewCategoryModalVisible = true;
    },
    hideNewCategoryModal: (state) => {
      state.isNewCategoryModalVisible = false;
    },

    showUpdateCategoryModal: (state, action: PayloadAction<string>) => {
      state.isUpdateCategoryModalVisible = true;
      state.editingId = action.payload;
    },
    hideUpdateCategoryModal: (state) => {
      state.isUpdateCategoryModalVisible = false;
      state.editingId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchingStatus = "loading";
      state.fetchingErrors = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchingStatus = "succeeded";
      adapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.fetchingStatus = "fail";
      state.fetchingErrors = action.payload!;
    });

    builder.addCase(addNewCategory.pending, (state) => {
      state.addingStatus = "loading";
      state.addingErrors = [];
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      state.addingStatus = "succeeded";
      adapter.addOne(state, action.payload);
    });
    builder.addCase(addNewCategory.rejected, (state, action) => {
      state.addingStatus = "fail";
      state.addingErrors = action.payload!;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updatingStatus = "loading";
      state.updatingErrors = [];
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.updatingStatus = "succeeded";
      adapter.updateOne(state, action.payload);
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.updatingStatus = "fail";
      state.updatingErrors = action.payload!;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.removingStatus = "loading";
      state.removingErrors = [];
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.removingStatus = "succeeded";
      adapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.removingStatus = "fail";
      state.removingErrors = action.payload!;
    });
  },
});

export default categoriesSlice.reducer;

export const {
  setAddingStatusToIdle,
  setUpdatingStatusToIdle,
  showNewCategoryModal,
  hideNewCategoryModal,
  showUpdateCategoryModal,
  hideUpdateCategoryModal,
} = categoriesSlice.actions;

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

export const selectEditingCategory = (state: RootState) =>
  selectCategoryById(state, state.categories.editingId);
