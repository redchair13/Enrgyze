// import Login from './Login';
import Signup from './SignUp';
import LoginPage from './LoginPage';
import HomePage from './homePage';
import DrinkPage from './DrinkPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/drinks/:id" component={DrinkPage} />
      </Routes>
    </div>
  );
}

export default App;
