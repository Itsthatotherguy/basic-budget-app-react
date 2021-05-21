import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  CategoriesResponse,
  Category,
  CategoryType,
  CreateCategoryDto,
} from "../../models/category";

interface SliceState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "fail";
  error: string | null | undefined;
}

const initialState: SliceState = {
  categories: [
    { id: "1", name: "Salary", type: CategoryType.Income },
    { id: "2", name: "Mortgage", type: CategoryType.Expenses },
  ],
  status: "idle",
  error: null,
};

// export const addNewCategory = createAsyncThunk(
//   "categories/addNewCategory",
//   async (initialCategory) => {}
// );

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("/api/categories");

    const categories = ((await response.json()) as CategoriesResponse)
      .categories;

    return categories;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryAdded: {
      reducer(state, action: PayloadAction<Category>) {
        state.categories.push(action.payload);
      },
      prepare(createCategoryDto: CreateCategoryDto) {
        return {
          payload: {
            id: nanoid(),
            ...createCategoryDto,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = state.categories.concat(action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
    });
  },
});

export const { categoryAdded } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectAllCategories = (state: RootState) =>
  state.categories.categories;

export const selectCategoryById = (state: RootState, categoryId: string) =>
  state.categories.categories.find((category) => category.id === categoryId);
