const express = require('express');
const router = express.Router();

// routing 1 metoda get pobiera z url sciezke i renderuje widok
router.get('/signup', (_req, res)=>{
    // res.render('userViews\signupUser');
        res.render('userViews/signupUser');
});
// routing 2 metoda post wysyla przez kontroler.metoda create body zapytania do newUser (kopia Modelu?) 
// gdzie wysyla formularz do jakiego bytu?
const userController = require('../controllers/userController');
router.post('/signup', userController.create);

module.exports = router;