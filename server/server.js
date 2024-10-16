const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');


app.use(
    cookieParser(),
    cors({
        origin: 'http://localhost:3003',
        credentials: true
    }));

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        console.log('*__________*');
        console.log('Client ID:', process.env.CLIENT_ID);
        console.log('Client Secret:', process.env.CLIENT_SECRET);
        console.log('Redirect URI:', process.env.REDIRECT_URI);

        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
            access_type: 'offline'
        });

        const { access_token, refresh_token } = tokenResponse.data;


        res.cookie('token', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000 / 125,
        });

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });


        res.redirect('http://localhost:3003');
    } catch (error) {
        console.error('Ошибка токена:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Authentication fail' });
    }
});

app.get('/auth/check', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.json({ isAuthorized: true });
    } else {
        res.json({ isAuthorized: false });
    }
});



app.get('/auth/refresh', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token' });
    }

    try {
        const refreshResponse = await axios.post('https://oauth2.googleapis.com/token', {
            refresh_token,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'refresh_token',
        });

        const { access_token } = refreshResponse.data;

        // Обновляем access_token в куках
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000 / 125,
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка обновления токена:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Token refresh fail' });
    }
});


app.listen(3000, () => {
    console.log('\nServer running on http://localhost:3000\n');

    console.log('Client ID:', process.env.CLIENT_ID);


});
