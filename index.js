const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

let port = 8080;

app.get("/", (req, res) => {
    console.log("This is home page.");
    res.send("This is basic Get Response!");
});

let posts = [
    {
        id: uuidv4(),
        username: "rahulkumar",
        content:"I got intership apportunity at unknown pvt ltd company with stipned ammount of 15k."
    },
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "we just started a new batch for placement series..."
    },
    {
        id: uuidv4(),
        username: "delta-official",
        content: "This is a post of offical page of delta batch..."
    },
    {
        id: uuidv4(),
        username: "rohit",
        content: "This is rohit offical page"
    }
];

app.get("/posts", (req, res) => {
    console.log("This is the index page.");
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req, res) => {
    console.log("Post is being creating...");
    res.render("newPost.ejs");
});

app.post("/posts", (req, res) => {
    let post = {
        id: uuidv4(),
        username: req.body.username,
        content: req.body.content
    };
    if(post.username && post.content){
        posts.push(post);
        res.redirect("/posts");
    }else{
        res.send("Go back and Enter both Username and Content...")
    }
    
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if(post){
        res.render("editPost.ejs", {post});
    }else{
        res.send("Post not found, may be it is deleted or it is moved to another address...");
    }
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if(post){
        res.render("showPost.ejs",{post}); 
    }else{
        res.send("Page not found, it may be, the page is deleted or moved to another route...")
    }
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    if(posts.find((p) => id === p.id)){
        posts = posts.filter((p) => id !== p.id);
        res.redirect("/posts");
    }else{
        res.send("The page seems to be already deleted or may be moved to another location...")
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
