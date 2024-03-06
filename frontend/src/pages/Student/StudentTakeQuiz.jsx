import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import { CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';


const StudentTakeQuiz = ({ name, questions, score, setScore, setQuestions }) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const { currentUser } = useSelector(state => state.user)
  
    useEffect(() => {
      setOptions(
        questions &&
          handleShuffle([
            questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers,
          ])
      );
    }, [currQues, questions]);
  
    console.log(questions);
  
    const handleShuffle = (options) => {
      return options.sort(() => Math.random() - 0.5);
    };
  
    return (
      <div className="quiz">
        <span className="subtitle">Welcome, {currentUser.name}</span>
  
        {questions ? (
          <>
            <div className="quizInfo">
              <span>{questions[currQues].category}</span>
              <span>
                {questions[currQues].difficulty}
                <strong>Score :</strong> {score}
              </span>
            </div>
            <Question
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
              options={options}
              correct={questions[currQues]?.correct_answer}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </>
        ) : (
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={150}
            thickness={1}
          />
        )}
      </div>
    );
  };
  
  export default StudentTakeQuiz;