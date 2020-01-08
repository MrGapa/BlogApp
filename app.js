var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

mongoose.connect("mongodb+srv://admin:$!jUl0224@cluster0-vovxq.mongodb.net/BApp?retryWrites=true&w=majority", {
	useNewUrlParser : true,
	useCreateIndex: true,
	useUnifiedTopology:true,
	useFindAndModify: false
});

var postSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String
});

var Post = mongoose.model("posts", postSchema);

var userSchema = new mongoose.Schema({
	userName: String,
	email: String
});

var User = mongoose.model("User", userSchema);


app.get("/",function(req, res){
	Post.find({}, function(err, post){
		if(err){
			console.log(err)
		}else{
			res.render("index", {posts: post});
		}
	})
});

app.post("/",function(req, res){
	Post.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("newPost");
		}else{
			res.redirect("/");
		}
	});
});

app.get("/newPost", function(req, res){
	res.render("newPost");
});

app.get("/post/:id", function(req, res){
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
		} else {
			res.render("posts", {post: post});
		}
	});
});

app.listen(3000, process.env, function(){
	console.log("Server is running!");
});