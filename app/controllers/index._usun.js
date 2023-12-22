const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose')


// z dokumentacji ?
// import { engine } from 'express-handlebars';

/* mongoose.connect('mongodb://127.0.0.1:27017/express-blog', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Połączenie z MongoDB zostało pomyślnie nawiązane!');
}); */




mongoose.connect('mongodb://127.0.0.1:27017/express-blog', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('Połączenie z MongoDB nawiązane pomyślnie!');
})


.then()

// import modelu
const Post = require('./app/models/PostModel');
// import router sciezka skopiowana inna bedzie działac ? nie działaja slash
// const blogRouter = require('app\router\blogRouter.js');
const blogRouter = require('./app/router/blogRouter');
 

// app.use(express.static('public'))
// public pod '/files' z '/'
app.use("/files",express.static('public'));

// parametr {extname: 'hbs'} zmienia rozszerzenie z .handlebars na .hbs
//~ .engine("hbs",) === .set(,"hbs")
app.engine("hbs",hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
// config do express ,pozwala czytac dane z ciała zapytania (req.body)
app.use(express.urlencoded({extended: true}));

// obiekt nie tablica dlatego: obiekt ma klucze

// app.get("/mongoose", function(req,res){
// dodaje async 
/* app.get("/mongoose", async function(req,res) {
// const posts = await Post.find({ title: "Trzeci post"}).exec();
const posts = await Post.find().exec();
// zapomniałem dopisac do send(posts)
res.send(posts)
}); */

app.get("/mongoose/:id", function(req,res) {
// app.get("/mongoose", function(req,res) {
// 31:11 teraz dopiero odczytam id z adresu,dlatego nie działało?!
Post.findById(req.params.id).then((postOne)=>{    
// Post.findById('63bfb17000bf08070bf491cb').then((postOne)=>{
        // 29:12 
        // res.send(postOne)

        res.render("home", {
            title: postOne.title,
            content: postOne.content,
            // displayTitle: true,
            displayTitle: false,
            author: postOne.author
        })
    }).catch((err)=>{
        res.send(err)
        
    })
});

/* app.get("/mongoose", function(req,res) {
    Post.find().then((posts)=>{
        res.send(posts)
    }).catch((err)=>{
        res.send(err)
    })
}); */


app.get('/', function(req, res){
    // res.send('Hello Nodemon');
    // moge przekazac obiekt w renderze
    
    
    // bo pola uzyjemy jak nasze dane: pole to wartosc klucza, czy pole to klucz ktory ma wartosc?  
    // mozna podstawic zmienna z obiektem przypisanym?
    // obiekt ={name: 'Magda', name: 'Krzysiek',name: 'Lucyna'}
    
    // Dlaczego tylko bezposrednio obiekt w kod dziala a zmienna z przypisanym obiektem nie ? 
    // ( chyba ze znowu brak deklaracji (let, const) : ?!
    // obiekt ={name: 'Magda', content: 'Krzysiek',title: 'Lucyna'}
    let obiekt ={name: 'Magda', content: 'Krzysiek',
    title: 'Lucyna' , displayTitle: true }

    res.render("home", {obiekt, content2: 'Marcin', names: ["1","2","3"]})
    
    // ,["1","2","3"]
    // Dlaczego tylko bezposrednio obiekt w kod dziala a zmienna z przypisanym obiektem nie ? 
    // ( chyba ze znowu brak deklaracji (let, const) : ?!
    // res.render("home", {name: 'Magda', content: 'Krzysiek',title: 'Lucyna'})
    // res.render("hello render dziala?")
});




/* app.get('/user/:id?/:name?', function(req, res) {
    console.log("🚀 ~ file: index.js:12 ~ app.get ~ req.params.id:", req.params.id)
    if (req.params.id) {
        // odpowiedz zeby zamknac? 
        res.send( req.params.id + ' ' + req.params.name)
    
    } else {
        res.send('all users')
    }

    
}) */





/* app.get('/data', function(req, res) {
    console.log("🚀 ~ file: index.js:26 ~ app.get ~ req.query:", req.query)
    if (req.query.search) {
        

        res.send('pobieram z lini i wyszukaj ' + req.query.search + req.query.model)
    } else {
        res.send('blad')
    }
}); */

/*   Routes */
// set przedrostek /blog dla wpisow w blogRouter
app.use('/blog', blogRouter);

app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});