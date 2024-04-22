// import Login from './Login';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import HomePage from './homePage';
import DrinkPage from './DrinkPage'
import { Route, Routes } from 'react-router-dom';
import CreateDrink from './CreateDrink';
import SearchResults from './SearchResults';
import Signup from './signupPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/drinks/:id" component={DrinkPage} />
        <Route path="/CreateDrink" element={<CreateDrink />} />
        <Route path="/SearchResults/:search" component={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;