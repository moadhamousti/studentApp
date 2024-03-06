import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import { useSelector } from 'react-redux';
import { BlueButton } from "../../components/buttonStyles";

const Result = ({ score }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    if (!currentUser) {
      navigate("/Student/quiz/quiztake");
    }
  }, [currentUser, navigate]);

  return (
    <div className="result" style={{ textAlign: 'center', marginTop: '20px' }}>
      <span className="title">Final Score : <span>{score}</span></span>
      <br></br>
      <BlueButton
        style={{ alignSelf: "center", marginTop: "35px" }}
        href="/Student/quiz"
      >
        Go Back To Quiz Page
      </BlueButton>
    </div>
  );
};

export default Result;
