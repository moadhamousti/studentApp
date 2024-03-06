import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../data/Categories";
import quiz from '../../assets/quiz.svg'
import { useSelector } from 'react-redux';


const StudentQuiz = ({ name, setName, fetchQuestions }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);
    const { currentUser } = useSelector(state => state.user)
  
    const history = useNavigate(); // Use useNavigate instead of useHistory
  
    const handleSubmit = () => {
      if (!category || !difficulty) {
        setError(true);
        return;
      } else {
        setError(false);
        fetchQuestions(category, difficulty);
        history("/Student/quiz/quiztake"); // Call history as a function
      }
    };
  
    return (
      <div className="content">
        <img src={quiz} className="banner" alt="quiz app" />
        <div className="settings">
          <span style={{ textAlign: "center", fontSize: 30 }}>Take Quizes In Any Topic:</span>
          <div className="settings__select">
            {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
            <h2 className='greeting'>{currentUser.name} </h2>
            <TextField
              select
              label="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
        {/* <img src={quiz} className="banner" alt="quiz app" /> */}
      </div>
    );
};

export default StudentQuiz;
