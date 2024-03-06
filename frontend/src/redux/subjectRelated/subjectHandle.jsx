import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    subjectsList: [],
    subjectDetails: [],
    loading: false,
    error: null,
    response: null,
};

export const fetchSubjects = createAsyncThunk(
    'subject/fetchSubjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Subject`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        // Define additional reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.subjectsList = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { } = subjectSlice.actions;

export default subjectSlice.reducer;
