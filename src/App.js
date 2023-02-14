import { useContext } from 'react';
import './App.css';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen.js';
import Adverisement from './Screens/Adverisement';
import SignInScreen from './Screens/SignInScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PlayScreen from './Screens/PlayScreen';
import SignUpScreen from './Screens/SignUpScreen';
import userContext from './Context/User/UserContext';

function App() {
  const { user } = useContext(userContext); 

  return (

    <BrowserRouter>
      
      <div className="app">
        <Routes>
          <Route exact path={'/dashboard'} element={<HomeScreen />} />

          {user.isLoggedIn && <Route exact path={'/profile'} element={<ProfileScreen />} />}

          {user.isLoggedIn && <Route exact path={'/play'} element={<PlayScreen />} />}

          <Route exact path={'/signin'} element={<SignInScreen />} />
          
          <Route exact path={'/signup'} element={<SignUpScreen />} />

          <Route exact path={'/'} element={<Adverisement />} />
        </Routes>
      
        <Footer />
      </div>

    </BrowserRouter>

  );
}

export default App;
