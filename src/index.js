import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MovieState from './Context/Movie/MovieState';
import UserState from './Context/User/UserState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserState>
    <MovieState>
      <App />
    </MovieState>
    </UserState>
  </React.StrictMode>
);

reportWebVitals();
