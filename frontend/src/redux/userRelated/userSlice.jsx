import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Don't forget to import axios

const initialState = {
    status: 'idle',
    userDetails: [],
    tempDetails: [],
    loading: false,
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    error: null,
    response: null,
    darkMode: true,
    imageUrl: null,
    avatar: '',
    courses: [],
};

export const deleteUserComplaints = (userId) => async (dispatch) => {
    dispatch(deleteUserComplaintsRequest());
    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/complaints/user/${userId}`);
        dispatch(deleteUserComplaintsSuccess());
    } catch (error) {
        dispatch(deleteUserComplaintsFailure(error.message));
    }
};





const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = 'loading';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        authSuccess: (state, action) => {
            state.status = 'success';
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
        authLogout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
            state.status = 'idle';
            state.error = null;
            state.currentRole = null
        },
        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getRequest: (state) => {
            state.loading = true;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
        deleteUserComplaintsRequest: (state) => {
            state.loading = true;
        },
        deleteUserComplaintsSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        deleteUserComplaintsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserAvatar(state, action) {
            state.avatar = action.payload;
          },

        fetchCoursesRequest: (state) => {
            state.loading = true;
        },
        fetchCoursesSuccess: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        },
        fetchCoursesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    authRequest,
    setImageUrl,
    underControl,
    stuffAdded,
    authSuccess,
    fetchCoursesRequest,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    toggleDarkMode,
    deleteUserComplaintsRequest,
    deleteUserComplaintsSuccess,
    deleteUserComplaintsFailure,
    updateUserAvatar,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
