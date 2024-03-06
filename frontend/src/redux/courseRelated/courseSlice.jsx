import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  course: null,
  courseStudents: [],
  coursesList: [],
  courseDetails: [],
  subjectsList: [],
  subjectDetails: [],
  loading: false,
  subloading: false,
  error: null,
  response: null,
  getresponse: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourseStart(state) {
      state.loading = true;
      state.error = null;
    },
    addCourseSuccess(state, action) {
      state.courses.push(action.payload);
      state.loading = false;
    },
    addCourseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllCoursesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAllCoursesSuccess(state, action) {
      state.courses = action.payload;
      state.loading = false;
    },
    getAllCoursesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCourseSuccess(state, action) {
      state.courses = state.courses.filter(course => course._id !== action.payload);
      state.loading = false;
    },
    deleteCourseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getCourseDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCourseDetailsSuccess(state, action) {
      state.courseDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCourseDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getCoursesByTeacherStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCoursesByTeacherSuccess(state, action) {
      state.courses = action.payload;
      state.loading = false;
    },
    getCoursesByTeacherFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getCoursesBySubjectStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCoursesBySubjectSuccess(state, action) {
      state.courses = action.payload;
      state.loading = false;
    },
    getCoursesBySubjectFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addCourseStart,
  getCoursesBySubjectStart,
  getCoursesBySubjectSuccess,
  getCoursesBySubjectFailure,
  addCourseSuccess,
  addCourseFailure,
  getAllCoursesStart,
  getAllCoursesSuccess,
  getAllCoursesFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  deleteCourseFailure,
  getCourseDetailsStart,
  getCourseDetailsSuccess,
  getCourseDetailsFailure,
  getCoursesByTeacherFailure,
  getCoursesByTeacherSuccess,
  getCoursesByTeacherStart,

} = courseSlice.actions;

export const courseReducer = courseSlice.reducer;
