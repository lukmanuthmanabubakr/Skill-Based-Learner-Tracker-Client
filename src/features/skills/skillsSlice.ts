import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSkillService, type CreateSkillPayload, type Skill } from "./skillsService";

type SkillsState = {
  items: Skill[];
  isCreating: boolean;
  error: string | null;
};

const initialState: SkillsState = {
  items: [],
  isCreating: false,
  error: null,
};

export const createSkill = createAsyncThunk(
  "skills/create",
  async (payload: CreateSkillPayload, { rejectWithValue }) => {
    try {
      return await createSkillService(payload);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create skill";
      return rejectWithValue(msg);
    }
  }
);


const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSkill.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.isCreating = false;
        state.items.unshift(action.payload.data);
      })
      .addCase(createSkill.rejected, (state, action: any) => {
        state.isCreating = false;
        state.error = action.payload || "Failed to create skill";
      });
  },
});

export default skillsSlice.reducer;
