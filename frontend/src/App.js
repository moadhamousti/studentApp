import {BrowserRouter as Router ,Routes ,Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ChooseUser from './pages/ChooseUser';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import { useSelector } from 'react-redux';
import ViewClass from './pages/ViewClass';

function App() {
  const { currentRole } = useSelector(state => state.user);
  return (
    <>
      <Router>
        {currentRole === null &&
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />
            <Route path="/adminlogin" element={<Login role="Admin" />} />
            <Route path="/studentlogin" element={<Login role="Student" />} />
            <Route path="/teacherlogin" element={<Login role="Teacher" />} />
            <Route path='/adminregister' element={<Register/>} />
            {/* <Route path="/Admin/classes/class/:id" element={<ViewClass />} /> */}


            <Route path='*' element={<Navigate to="/" />} />
          </Routes>}
          {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
        }

        {currentRole === "Student" &&
          <>
            <StudentDashboard />
          </>
        }

        {currentRole === "Teacher" &&
          <>
            <TeacherDashboard />
          </>
        }
      </Router>
    </>
      
  );
}

export default App;
