import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from '@mui/icons-material/School';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ClassIcon from '@mui/icons-material/Class';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
// import Logo from '../../assets/loadingGif.gif'

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            {/* <div style={{ marginBottom: '20px' }}>
                <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
            </div> */}
            <div>
                <React.Fragment>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8', borderRadius: '0px 10px 10px 0px' }}} component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon sx={{color: '#1877f2'}} color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/classes">
                        <ListItemIcon>
                            <ClassIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Classes" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/subjects">
                        <ListItemIcon>
                            <AssignmentIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Subjects" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}} component={Link} to="/Admin/teachers">
                        <ListItemIcon>
                            <SupervisorAccountIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Teachers" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/students">
                        <ListItemIcon>
                            <PersonIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Students" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/courses">
                        <ListItemIcon>
                            <SchoolIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/courses") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/notices">
                        <ListItemIcon>
                            <AnnouncementIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Notices" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/complains">
                        <ListItemIcon>
                            <ReportIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Complains" />
                    </ListItemButton>
                </React.Fragment>
                <Divider sx={{ my: 2 }} />
                <React.Fragment>
                    <ListSubheader component="div" inset>
                        User
                    </ListSubheader>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/Admin/profile">
                        <ListItemIcon>
                            <AccountCircleIcon sx={{color: '#1877f2'}} color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton sx={{'&:hover': {backgroundColor: '#80a9e8' , borderRadius: '0px 10px 10px 0px'}}}  component={Link} to="/logout">
                        <ListItemIcon>
                            <LogoutIcon sx={{color: '#1877f2'}}color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </React.Fragment>
            </div>
        </>
    )
}

export default SideBar
