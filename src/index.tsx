import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import './styles/normalize.css';
import './styles/global.css';


const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuth = () => {

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=openid%20profile%20email`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div>
      <h1 className='simpleTxt'>{isAuthorized ? 'Авторизован ✨' : 'не авторизован 🤡'}</h1>
      <button  className={"simpleTxt btn" }onClick={handleAuth}>
        Авторизация Google
      </button>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}