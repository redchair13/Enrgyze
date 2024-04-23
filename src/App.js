// import Login from './Login';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import HomePage from './homePage';
import DrinkPage from './DrinkPage'
import { Route, Routes } from 'react-router-dom';
import CreateDrink from './CreateDrink';
import SearchResults from './SearchResults';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drinkPage/:id" element={<DrinkPage/>} />
        <Route path="/CreateDrink" element={<CreateDrink />} />
        <Route path="/SearchResults/:search" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;