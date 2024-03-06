import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ClassIcon from '@mui/icons-material/Class';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ReportIcon from '@mui/icons-material/Report';



const SideBarSt = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
            <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon sx={{color: '#1877f2'}} color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/subjects">
                        <ListItemIcon>
                            <AssignmentIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Subjects" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/courses">
                        <ListItemIcon>
                            <SchoolIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/courses") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/quiz">
                        <ListItemIcon>
                            <QuizIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/quiz") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Quiz" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/attendance">
                        <ListItemIcon>
                            <ClassIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Attendance" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/complain">
                        <ListItemIcon>
                            <ReportIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Complain" />
                    </ListItemButton>
                </React.Fragment>
                <React.Fragment>
                    <ListSubheader component="div" inset>
                        User
                    </ListSubheader>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/Student/profile">
                        <ListItemIcon>
                            <AccountCircleIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/logout">
                        <ListItemIcon>
                            <LogoutIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBarSt