const express = require('express');
const app = express();
const hbs = require('express-handlebars');
// z dokumentacji ?
// import { engine } from 'express-handlebars';


// app.use(express.static('public'))
// public pod '/files' z '/'
app.use("/files",express.static('public'));

// parametr {extname: 'hbs'} zmienia rozszerzenie z .handlebars na .hbs
//~ .engine("hbs",) === .set(,"hbs")
app.engine("hbs",hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs")
// obiekt nie tablica dlatego: obiekt ma klucze

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
    title: 'Lucyna' , displayTitle: false }
    res.render("home", {obiekt})
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

app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});