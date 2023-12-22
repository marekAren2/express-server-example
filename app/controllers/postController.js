const Post = require('../models/PostModel')
const User = require('../models/UserModel');


// export odwołuje sie do pliku bo nie ma funkcji o tej samej nazwie a index : jest z : czym jest?

module.exports = {
    // bedzie sie skladal wylacznie z metod czyli moje rozwiazanie najprostszego eksportu
    // 
    	// Ale jednym z takich podejść, które pozwala na jakby sensowne: get all = index
	// Czyli tutaj wstawiam sobie te dwa obiekty jako parametr.
	//  Więc ja tak naprawdę to, co jest tutaj, zastąpię metodą
	index: (req,res)  => {
	
		Post.find({})
		// która właśnie zamienia kolekcję Mongo, znalezione tutaj, na tablicę obiektów
		.lean()
		// Czyli wywołuję metodę len, do której przekazuję jako parametr funkcję
		.then((posts)=>{
			// Albo może sobie je odeślę do przeglądarki.
			// res.send(posts)
			// dlaczego nie podpowiada metody res. render (u mnie czy w ogole)?
			// res.
			res.render("blogViews/blog", {posts})
		})
        .catch((err)=> {
			res.send(err)   
				
			})
	},

	post: (req,res) => {
		// obiekt zapytania params
		Post.findById(req.params.id)
		.then ((post)=>{
			// obiekt przekazujemy do widoku
			res.render('blogViews/singlePost', post)
		})
		.catch((err)=>{
			res.send(err);
						
			
		})

	},
	// przy dodawaniu new post zmiana Arek na odniesienie do id skad mozemy je wziazc?
	create: (req,res) => {
		console.log(req.body);
		//... operator spread kopia stanu poprzedniego, jakiego?!
		// do tego nowo tworzonego obiekt + author :chwilowo 'Arek'
		const newPost = new Post({...req.body, author: res.locals.userId})
		
		// zeby ten doc zostal save:
		newPost.save();
		// after add post -redirect do root www:
		res.redirect('/blog')
	},
	
	update: (req,res)=> {
		// Post.findByIdAndUpdate(req. )
		Post.findByIdAndUpdate(req.params.id, req.body)
		.then((post) =>{ 
			res.redirect("/blog/" + post._id)
		})
		.catch((err)=>{
			res.send(err);
		});
	},
	
	delete: (req, res) => {
		// id z params url
		Post.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect('/blog/')
		})
		.catch((err)=>{
			res.send(err);
			console.log(err);
		});
	},

	editForm: (req, res) => {
		//przeszukamy baze danych modelem Post i metoda findById
		// id z params z url (podobnie display one post)
		Post.findById(req.params.id)
		// nasz pobrany post
		.then ((post) => {
			// post jego obsluga
			// w odp render ten form : views\blogViews\editPost.hbs
			// i ten post przekazujemy do form
			res.render('blogViews/editPost', post)
		})
		// standard kopiuj
		.catch((err)=>{
			res.send(err);
		});
	},
};