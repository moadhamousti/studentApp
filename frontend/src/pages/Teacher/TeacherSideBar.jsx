import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';
import SchoolIcon from '@mui/icons-material/School';
import ReportIcon from '@mui/icons-material/Report';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';







const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon sx={{color: '#1877f2'}}  color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                {currentUser.teachSclass && ( // Check if teachSclass exists before accessing its properties
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/Teacher/class">
                        <ListItemIcon>
                            <ClassIcon sx={{color: '#1877f2'}}  color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary={`Class ${sclassName && sclassName.sclassName}`} />
                    </ListItemButton>
                )}
                <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Teacher/courses">
                    <ListItemIcon>
                        <SchoolIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Teacher/courses") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                </ListItemButton>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <ReportIcon sx={{color: '#1877f2'}}  color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleIcon sx={{color: '#1877f2'}}  color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/logout">
                    <ListItemIcon>
                        <LogoutIcon sx={{color: '#1877f2'}}  color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar;
