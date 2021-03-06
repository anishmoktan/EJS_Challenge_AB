//jshint esversion:6

const express = require("express"); //declare express
const bodyParser = require("body-parser"); //declare bodyparser for api
const ejs = require("ejs"); //declare ejs for consistent template
const _ = require("lodash"); //for adding - to the names of the link

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hi I'm Anish, a Developer and Content Creator based in New York City";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express(); // declare express

app.set('view engine', 'ejs'); //uses ejs

app.use(bodyParser.urlencoded({extended: true})); //uses body parser
app.use(express.static("public")); //tell our static files are in the public folder

let posts = [];

app.get("/", function(req,res){

  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    }); //passing the variable of ejs from home.ejs and forming a key value pair

});

app.get("/about", function(req,res){

  res.render("about", {aboutContent: aboutContent}); //passing the variable of ejs from home.ejs and forming a key value pair

});

app.get("/contact", function(req,res){

  res.render("contact", {contactContent: contactContent}); //passing the variable of ejs from home.ejs and forming a key value pair

});

app.get("/compose", function(req,res){

  res.render("compose"); //passing the variable of ejs from home.ejs and forming a key value pair

});

app.get("/gallery", function(req,res){

  res.render("gallery"); //passing the variable of ejs from home.ejs and forming a key value pair

});


app.post("/compose", function(req,res){

  const post = { 
    title:req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});


app.get("/posts/:postName", function(req, res){

  const requestedTitle= _.lowerCase(req.params.postName); //adds - to the names of the title


  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
        });
    }
    
  });
});


app.listen(3000, function() { //log in the console 
  console.log("Server started on port 3000");
});
