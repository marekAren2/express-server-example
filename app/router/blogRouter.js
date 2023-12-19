const express = require('express');
const router = express.Router();
// zla sciezka, bo jestesmy w tym samym nadrzednym?!
// const postController = require('./app/controllers/postController');
const postController = require('../controllers/postController');

// czyli w odpowiedzi na zapytanie odezwie metoda index naszego kontrolera
router.get('/', postController.index );

// to jest ustawienie routing przez metode z kontrolera postController.js zamiast cb
// :id? (':' !przed !id)trzeba dodac! eureka
// app.get('/singlePost', postController.post );
// app.get('/singlePost/:id?', postController.post );

// don't have wpisu w controller chwilowo use innego
// app.get('/blog/addPost', postController.post );
// bezposrednio f.ktora wyrenderuje widok
//jako ze go nie uzywamy i jest szary to robimy:
// przeniesiony powyżej /blog/:id bo ?
router.get('/add', (_req,res)=>{
    
    res.render('blogViews/addPost')
    });
// dla create copy from under
//pierwszy raz wysyłamy post
router.post('/add', postController.create );

// sczytujemy parametr który będzie dostepny pod nazwa _id
router.get('/:id', postController.post );

// routing dla update
router.get('/edit/:id', postController.editForm);
router.post('/edit/:id', postController.update);

router.get('/delete/:id', postController.delete);

module.exports = router;