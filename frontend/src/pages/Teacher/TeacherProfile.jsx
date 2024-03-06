import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser?.name}</ProfileText> {/* Add optional chaining */}
          <ProfileText>Email: {currentUser?.email}</ProfileText> {/* Add optional chaining */}
          <ProfileText>Class: {teachSclass?.sclassName}</ProfileText> {/* Add optional chaining */}
          <ProfileText>Subject: {teachSubject?.subName}</ProfileText> {/* Add optional chaining */}
          <ProfileText>School: {teachSchool?.schoolName}</ProfileText> {/* Add optional chaining */}
        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;