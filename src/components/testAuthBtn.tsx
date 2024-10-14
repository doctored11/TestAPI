import React from "react";

export function TestAuthBtn() {
  const handleAuth = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=openid%20profile%20email`;
    window.location.href = googleAuthUrl;
  };

  return <button onClick={handleAuth}>Авторизоваться через Google</button>;
}
