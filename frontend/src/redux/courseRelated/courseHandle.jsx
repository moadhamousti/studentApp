// courseHandle.js

import axios from 'axios';
import {
  addCourseStart,
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
  getCoursesByTeacherStart,
  getCoursesByTeacherSuccess,
  getCoursesByTeacherFailure,
  getCoursesBySubjectStart,
  getCoursesBySubjectSuccess,
  getCoursesBySubjectFailure,
} from './courseSlice';

// Action creators for getting course details
// Async action creator for getting course details
// courseHandle.js

export const getCoursesBySubject = (subjectId) => async (dispatch) => {
  dispatch(getCoursesBySubjectStart());

  try {
    const response = await axios.get(`/Student/courses/${subjectId}`);
    const coursesData = response.data;
    
    dispatch(getCoursesBySubjectSuccess(coursesData));
  } catch (error) {
    dispatch(getCoursesBySubjectFailure(error.message));
  }
};


export const getCourseDetails = (courseID) => async (dispatch) => {
  dispatch(getCourseDetailsStart());

  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/courses/${courseID}`);
    const courseData = response.data; // Store response data in a variable
    console.log('Courses:', courseData);

    // Dispatch an action to update the Redux state with the course details
    dispatch(getCourseDetailsSuccess(courseData));
  } catch (error) {
    dispatch(getCourseDetailsFailure(error.message));
  }
};




export const getCoursesByTeacher = (teacherId) => async (dispatch) => {
  dispatch(getCoursesByTeacherStart());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/courses/${teacherId}`);
    dispatch(getCoursesByTeacherSuccess(response.data));
  } catch (error) {
    dispatch(getCoursesByTeacherFailure(error.message));
  }
};



// Other action creators for handling course operations

// courseHandle.js

export const createCourse = (courseData) => async (dispatch) => {
  dispatch(addCourseStart());
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Teacher/addcourse/${courseData.teacher}`, courseData); // Corrected URL
    dispatch(addCourseSuccess(response.data));
    return response; // Return the response for further processing if needed
  } catch (error) {
    dispatch(addCourseFailure(error.message));
    throw error; // Throw the error to handle it in the component or caller function
  }
}


export const getAllCourses = () => async (dispatch) => {
  dispatch(getAllCoursesStart());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/courses`);
    dispatch(getAllCoursesSuccess(response.data));
  } catch (error) {
    dispatch(getAllCoursesFailure(error.message));
  }
};


export const deleteCourse = (courseId) => async (dispatch) => {
  dispatch(deleteCourseStart());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/courses/${courseId}`);
    dispatch(deleteCourseSuccess(courseId));
  } catch (error) {
    dispatch(deleteCourseFailure(error.message));
  }
};
