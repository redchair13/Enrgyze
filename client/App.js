import Login from './Login';
import Signup from './SignUp';
import HomePage from './Homepage';
import Mainpage from './Mainpage';
import DrinkPage from './DrinkPage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/drinks/:id" component={DrinkPage} />
      </Routes>
    </div>
  );
}

export default App;
