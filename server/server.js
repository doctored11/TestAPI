// просто минимальный сервер для тестов авторизации

const express = require('express');
const axios = require('axios');
const app = express();

require('dotenv').config();

app.get('/auth/google', (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=openid%20profile%20email`;
    res.redirect(googleAuthUrl);
});

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
    });
    
    const { access_token } = tokenResponse.data;

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
    
    res.json(userInfo.data);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
