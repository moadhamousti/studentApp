import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <h1>{currentUser.name}</h1>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonGroup>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </ButtonGroup>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, rgba(170,207,255,1) 0%, rgba(207,240,255,1) 50%, rgba(170,207,255,1) 100%);
  color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none; /* Removed border */
  backdrop-filter: blur(5px); /* Added blur effect */

  &:hover {
    color: #fff;
    background-color: #910017; /* Changed hover color for LogoutButton */
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background: linear-gradient(90deg, rgba(183,23,61,1) 0%, rgba(181,30,30,1) 47%, rgba(255,0,0,1) 100%);
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background: linear-gradient(90deg, rgba(39,129,184,1) 0%, rgba(2,192,222,1) 49%, rgba(0,139,255,1) 100%);
  
  &:hover {
    background-color: #27a1b4;
  }
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;
