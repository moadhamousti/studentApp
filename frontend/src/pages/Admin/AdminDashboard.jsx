import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    createTheme,
    IconButton,
    ThemeProvider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import AdminProfile from './AdminProfil';
import AdminHomePage from './AdminHomePage';
import SideBar from './SideBar';
import AddStudent from './StudentRelated/AddStudent';
import SeeComplains from './StudentRelated/SeeComplains';
import ShowStudents from './StudentRelated/ShowStudents';
import StudentAttendance from './StudentRelated/StudentAttendance';
import StudentExamMarks from './StudentRelated/StudentExamMarks';
import ViewStudent from './StudentRelated/ViewStudent';

import AddNotice from './NoticeRelated/AddNotice';
import ShowNotices from './NoticeRelated/ShowNotices';

import ShowSubjects from './SubjectRelated/ShowSubjects';
import SubjectForm from './SubjectRelated/SubjectForm';
import ViewSubject from './SubjectRelated/ViewSubject';

import AddTeacher from './TeacherRelated/AddTeacher';
import ChooseClass from './TeacherRelated/ChooseClass';
import ChooseSubject from './TeacherRelated/ChooseSubject';
import ShowTeachers from './TeacherRelated/ShowTeachers';
import TeacherDetails from './TeacherRelated/TeacherDetails';

import AddClass from './ClassRelated/AddClass';
import ClassDetails from './ClassRelated/ClassDetails';
import ShowClasses from './ClassRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShowCourses from './CourseRelated/ShowCourses';
import Logo from '../../assets/Logo.png'
import CourseList from './CourseRelated/CourseList';


const AdminDashboard = () => {
    const [open, setOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });


    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar open={open} position='absolute'>
                        <Toolbar sx={{pr: '24px' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{flexGrow: 1 }}
                            >
                                Admin Dashboard
                            </Typography>
                            {isDarkMode ? (
                                <LightModeIcon onClick={() => toggleDarkMode(false)} />
                            ) : (
                                <DarkModeIcon onClick={() => toggleDarkMode(true)} />
                            )}
                            <AccountMenu />
                        </Toolbar>
                    </AppBar>
                    

                    {/* Drawer */}
                    <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                        <Toolbar sx={styles.toolBarStyled}>
                                <div style={{ marginBottom: '2px' }}>
                                    <img src={Logo} alt="Logo" style={{ width: '75%', marginLeft:'30px' }} />
                                </div>
                            {open && (
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                                
                            )}
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <SideBar />
                        </List>
                    </Drawer>
                    <Box component="main" sx={styles.boxStyled}>
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<AdminHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                            <Route path="/Admin/profile" element={<AdminProfile />} />
                            <Route path="/Admin/complains" element={<SeeComplains />} />

                            {/* Notice */}
                            <Route path="/Admin/addnotice" element={<AddNotice />} />
                            <Route path="/Admin/notices" element={<ShowNotices />} />

                            {/* Courses */}
                            <Route path="/Admin/courses" element={<CourseList />} />
                            <Route path="/Admin/courses/:teacherID/:courseID" element={<ShowCourses />} />

                            {/* Subject */}
                            <Route path="/Admin/subjects" element={<ShowSubjects />} />
                            <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                            <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                            <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                            <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                            <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                            <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                            {/* Class */}
                            <Route path="/Admin/addclass" element={<AddClass />} />
                            <Route path="/Admin/classes" element={<ShowClasses />} />
                            <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                            <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                            {/* Student */}
                            <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                            <Route path="/Admin/students" element={<ShowStudents />} />
                            <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                            <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                            <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                            {/* Teacher */}
                            <Route path="/Admin/teachers" element={<ShowTeachers />} />
                            <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                            <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                            <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                            <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                            <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#0780b8',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}



// import React from 'react'

// function AdminDashboard() {
//   return (
//     <div>AdminDashboard</div>
//   )
// }

// export default AdminDashboard