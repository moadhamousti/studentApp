import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../redux/userRelated/userSlice';
import { studentReducer } from '../redux/studentRelated/studentSlice';
import { noticeReducer } from '../redux/noticeRelated/noticeSlice';
import { sclassReducer } from '../redux/sclassRelated/sclassSlice';
import { teacherReducer } from '../redux/teacherRelated/teacherSlice';
import { complainReducer } from '../redux/complainRelated/complainSlice';
import { courseReducer } from '../redux/courseRelated/courseSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        course: courseReducer,
    },
});

export default store;
