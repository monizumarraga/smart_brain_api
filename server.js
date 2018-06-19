const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart_brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{})

app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))


const PORT = process.env.PORT
app.listen(PORT, ()=>{
	console.log(`app is running on port ${PORT}`);
})

console.log(PORT)