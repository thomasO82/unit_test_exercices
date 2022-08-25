const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('./UserController.js')
const User = require('./models/User.js');
const app = express();
require('dotenv').config()

mongoose.connect(process.env.BDD_URL, err =>{
    if(err){
        console.error('error' + err);
    }else{
        console.log('connected at mongoDb');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.listen(parseInt(process.env.PORT), () => {
    console.log("le serveur marche !");
});

app.get('/', async  (req, res) =>{
    const users = await UserController.getUsers()
    res.render('./template/user/listUser.html.twig',{
        users: users
    })
})

app.get('/addUser', async (req, res) => {
    res.render('./template/user/addUser.html.twig', {
       
    })
})

app.post('/addUser', async (req, res) => {
    await UserController.addUser(req.body)
    res.redirect('/')
})

app.get('/updateUser/:id', async (req, res) =>{
   const user = await UserController.getUserById(req.params.id)
   res.render('template/user/addUser.html.twig',{
       user: user,
       action: "/updateUser"
   })
})

app.post('/updateUser/:id', async (req, res) =>{
    User.updateOne({ _id: req.params.id }, req.body, (error, user) => {
        if(error){
            console.log(error);
            res.status(404);
        }else{
            res.redirect('/')
        }
    })  
 })

 app.get('/deleteUser/:id', async (req, res) =>{
    User.deleteOne({ _id: req.params.id }, (error, user) => {
        if(error){
            console.log(error)
            res.status(404);
        }else{
            res.redirect('/')
        }
    })
 })
 




