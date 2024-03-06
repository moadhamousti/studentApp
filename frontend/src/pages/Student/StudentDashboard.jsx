import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    createTheme,
    Divider,
    IconButton,
    ThemeProvider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentQuiz from './StudentQuiz';
import StudentCourses from './StudentCourses';
import SideBarSt from './SidebarSt';
import StudentTakeQuiz from './StudentTakeQuiz';
import StudentQuizResult from './StudentQuizResult';
import axios from 'axios';
import StudentCoursesShow from './StudentCoursesShow';
import Logo from '../../assets/Logo.png'


const StudentDashboard = () => {
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


    const [questions, setQuestions] = useState();
    const [name, setName] = useState();
    const [score, setScore] = useState(0);

    const fetchQuestions = async (category = "", difficulty = "") => {
        const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10${
            category && `&category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );

        setQuestions(data.results);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar open={open} position='absolute'>
                        <Toolbar sx={{ pr: '24px' }}>
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
                                sx={{ flexGrow: 1 }}
                            >
                                Student Dashboard
                            </Typography>
                            {isDarkMode ? (
                                <LightModeIcon onClick={() => toggleDarkMode(false)} />
                            ) : (
                                <DarkModeIcon onClick={() => toggleDarkMode(true)} />
                            )}
                            <AccountMenu />
                        </Toolbar>
                    </AppBar>
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
                            <SideBarSt />
                        </List>
                    </Drawer>
                    <Box component="main" sx={styles.boxStyled}>
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<StudentHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Student/dashboard" element={<StudentHomePage />} />
                            <Route path="/Student/profile" element={<StudentProfile />} />
                            <Route path="/Student/profile/:id/upload-image" element={<StudentProfile />} />

                            <Route path="/Student/subjects" element={<StudentSubjects />} />
                            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                            <Route path="/Student/complain" element={<StudentComplain />} />
                            <Route path="/Student/courses" element={< StudentCourses/>} />
                            <Route path="/Student/courses/:courseId" element={< StudentCoursesShow/>} />
                            <Route
                                path="/Student/quiz"
                                element={<StudentQuiz name={name} setName={setName} fetchQuestions={fetchQuestions} />}
                                />
                            <Route 
                                path="/Student/quiz/quiztake"
                                element={
                                    <StudentTakeQuiz 
                                        name={name}
                                        questions={questions} 
                                        score={score} 
                                        setScore={setScore} 
                                        setQuestions={setQuestions} 
                                    />
                                }
                            />

                            <Route path="/Student/quiz/quizresult"
                                element = {<StudentQuizResult name={name} score={score}/>}  />

                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default StudentDashboard

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