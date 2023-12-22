const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// routing 1 metoda get pobiera z url sciezke i renderuje widok
router.get('/signup', (_req, res)=>{
    // res.render('userViews\signupUser');
        res.render('userViews/signupUser');
});
router.post('/signup', userController.create);

router.get('/login', (_req, res)=>{
    
    // res.render('userViews\signupUser');
        res.render('userViews/loginUser')
});
// routing 2 metoda post wysyla przez kontroler.metoda create body zapytania do newUser (kopia Modelu?) 
// gdzie wysyla formularz do jakiego bytu?

router.post('/login', userController.login);

module.exports = router;