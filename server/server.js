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
        });

        const { access_token } = tokenResponse.data;


        res.cookie('token', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000 / 125,
        });


        res.redirect('http://localhost:3003');
    } catch (error) {
        console.error('Ошибка токена:', error.response ? error.response.data : error.message);
        res.status(500).send('Authentication failed');
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

app.listen(3000, () => {
    console.log('\nServer running on http://localhost:3000\n');

    console.log('Client ID:', process.env.CLIENT_ID);
    

});
