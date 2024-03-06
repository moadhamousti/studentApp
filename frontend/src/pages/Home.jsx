import styled from 'styled-components';
import { Container, Grid, Box, Button } from '@mui/material';
import { LightPurpleButton} from '../components/buttonStyles';
import { Link } from 'react-router-dom';
import Students from "../assets/students.svg";
import Student from "../assets/Home.svg";
import Logo from '../assets/Logo.png';

function Home() {
  return (
    <StyledContainer className='Container'>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <StyledImageContainer>
            <img src={Student} alt="students" style={{ marginRight:'40px',width: '115%' }} />
          </StyledImageContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Welcome to
              <br />
              E-Sckooler
              <br />
            </StyledTitle>
            <StyledLogo>
              <img src={Logo} alt="Logo" style={{ width: '60%' }} />
            </StyledLogo>
            <StyledText>
              E-Sckooler is a school management Platform that Provides ,
              class organization, add students and faculty.Seamlessly
              track attendance, assess performance, and provide feedback.
              Access records, view marks, and communicate effortlessly.
            </StyledText>
            <StyledBox>
              <div style={{ display: 'flex', gap: '30px' }}>
                <StyledLink to="/choose">
                  <LightPurpleButton style={{ marginTop: '16px' }} variant="contained" fullWidth>
                    Login
                  </LightPurpleButton>
                </StyledLink>
                <StyledLink to="/chooseasguest">
                  <StyleButtonSide variant="outlined" fullWidth
                    sx={{ mt: 2, mb: 3, color: "#0b51bf", borderColor: "#0b51bf" }}
                  >
                    Login as Guest
                  </StyleButtonSide>
                </StyledLink>
              </div>
              <StyledText>
                Don't have an account?{' '}
                <Link to="/Adminregister" style={{ color: "#0b51bf" }}>
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  )
}

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin:0;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  font-size: 17px;
  line-height: 30px;
  text-align: center;
`;

const StyleButtonSide = styled(Button)`
  && {
    background-color: none;
    transition: transform 0.3s ease;
    color: #0b51bf;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
