const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const userModel = require("./models/user")
const postModel = require("./models/post");
const post = require("./models/post");


const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())


app.get("/", (req, res) => {
    res.render("index")
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email })
    if (user) return res.send(`
        <script>
        alert("User Already Existed, You can Login");
        window.location.href = "/login";
        </script>
        `);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createdUser = await userModel.create({
                name,
                email,
                password: hash
            })
            let token = jwt.sign({ email: email }, "shhhhhh")
            res.cookie("token", token)
            res.redirect("/profile")
        })
    })
})

app.get("/register", (req, res) => {
    res.send("User Created")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.send(`
        <script>
        alert("SomeThing Went Wrong")
        window.location.href = "/"
        </script>`);
    else{
        bcrypt.compare(password, user.password, (err, result) => {
            if (result){
               let token =  jwt.sign({email:email}, "shhhhhh");
               res.cookie("token", token)
               res.redirect("/profile")
            }
            else res.send(`
            <script>
                alert("Email or password is Incorrect")
                window.location.href = "/login"
            </script>`)
        })
    }    
})

app.get("/logout" , (req, res) => {
    res.cookie("token", '')
    res.redirect("/login")
})


const isLogin = (req, res, next) => {
    if(req.cookies.token === ""){
        res.redirect("/login")
    }else{
        let data = jwt.verify(req.cookies.token, "shhhhhh")
        req.user = data
        next();
    }

}
app.post('/post', isLogin, async (req, res ) => {

    const { content } = req.body;
    const user = await userModel.findOne({
        email: req.user.email
    })

    const post = await postModel.create({
        user:user._id,
        content
    })
    user.post.push(post._id)
    await user.save()
    res.redirect('/profile')
})

app.get("/profile", isLogin, async (req, res) => {
    const user = await userModel.findOne({
        email:req.user.email
    }).populate('post')
    console.log(user)
    res.render("profile", {user})
})

app.get("/edit/:id", async (req, res) => {
    const post = await postModel.findOne({_id:req.params.id})
    res.render('edit',{post})
})

app.post("/update/:id", async (req, res ) => {
    const post = await postModel.findOneAndUpdate({_id:req.params.id}, {content: req.body.updateContent})
    res.redirect("/profile")
})

app.get("/like/:id", async (req, res) => {
    const post = await postModel.findOne({_id:req.params.id}).populate('user')
    if(post.likes.indexOf(post.user._id) === -1){
        post.likes.push(post.user._id)
        await post.save()
        res.redirect('/profile')
    }
    else{
        post.likes.splice(post.user._id, 1)
        await post.save()
        res.redirect("/profile")
    }
})

app.listen(3000, () => {
    console.log("running on 3000")
})