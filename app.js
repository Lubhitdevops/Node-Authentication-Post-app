const express = require('express');
const app = express();

const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const userModel = require('./models/user');
const postSchema = require('./models/post');
const post = require('./models/post'); // same as postSchema, but kept as in original
const upload = require('./config/multerconfig'); // multer config import

// App settings
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------------------------------------------------------
// Example: generate random hex string
// crypto.randomBytes(12, function(err, bytes) {
//     console.log(bytes.toString('hex'))
// })

// Example: multer diskStorage (already using config file)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads')
//   },
//   filename: function (req, file, cb) {
//      crypto.randomBytes(12, function(err, bytes) {
//         const fn = bytes.toString('hex') + path.extname(file.originalname)
//         cb(null, fn)
//     })
//   }
// })
// const upload = multer({ storage: storage })
// -----------------------------------------------------------------------------

// ---------------- Routes ----------------

// Home
app.get('/', (req, res) => {
    // console.log('hey')
    // res.send('hey')
    res.render('index');
});

// Profile upload page
app.get('/profile/upload', (req, res) => {
    res.render('profileupload');
});

// Handle image upload
app.post('/upload', isLoggedIn, upload.single('image'), async (req, res) => {
    // console.log(req.file)
    let user = await userModel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile");
});

// Test route (disabled)
// app.get('/test', (req, res) =>{
//     res.render('test')
// })

// Test upload (disabled)
// app.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file);
// })

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Profile page
app.get('/profile', isLoggedIn, async (req, res) => {
    // console.log(req.user)
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("posts");
    // console.log(user)
    res.render('profile', { user });
});

// Like / Unlike post
app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postSchema
        .findOne({ _id: req.params.id })
        .populate("user");

    if (post.like.indexOf(req.user.userid) === -1) {
        post.like.push(req.user.userid);
    } else {
        post.like.splice(post.like.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect('/profile');
});

// Edit post page
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postSchema
        .findOne({ _id: req.params.id })
        .populate("user");
    res.render('edit', { post });
});

// Update post content
app.post('/update/:id', isLoggedIn, async (req, res) => {
    await postSchema.findOneAndUpdate(
        { _id: req.params.id },
        { content: req.body.content }
    );
    res.redirect('/profile');
});

// Create new post
app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let content = req.body.content;

    let post = await postSchema.create({
        user: user._id,
        content: content,
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect("/profile");
});

// Register new user
app.post('/register', async (req, res) => {
    let { email, password, username, age, name } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return res.status(500).render('index', { message: "User already registered" });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                age,
                email,
                name,
                password: hash
            });

            let token = jwt.sign({ email, email, userid: user._id }, "shshshsh");
            res.cookie('token', token);

            // Instead of sending text, render login page with a message
            res.render('login', { message: "User registered successfully! Please login." });
        });
    });
});

// app.post('/register', async (req, res) => {
//     let { email, password, username, age, name } = req.body;
//     let user = await userModel.findOne({ email });

//     if (user) return res.status(500).send('User Already registered');

//     bcrypt.genSalt(10, (err, salt) => {
//         // console.log(salt);
//         bcrypt.hash(password, salt, async (err, hash) => {
//             // console.log(hash)
//             let user = await userModel.create({
//                 username,
//                 age,
//                 email,
//                 name,
//                 password: hash
//             });

//             let token = jwt.sign(
//                 { email, email, userid: user._id },
//                 "shshshsh"
//             );
//             res.cookie('token', token);
//             res.send('registered');
//         });
//     });
// });

// Login existing user

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) return res.status(500).send('Something went wrong');

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign(
                { email, email, userid: user._id },
                "shshshsh"
            );
            res.cookie('token', token);
            // res.status(200).send('logged in successfully');
            res.status(200).redirect('/profile');
        } else {
            res.redirect('/login');
        }
    });
});

// Logout user
app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/login');
    console.log('logout');
});

// ---------------- Middleware ----------------

// Old isLoggedIn (disabled)
// function isLoggedIn(req, res, next){
//     // console.log(req.cookies);
//     // if(req.cookies.token === '') res.send('you must be logged in first')
//     if (req.cookies.token) {
//           res.redirect('/login');
//     } else {
//      let data = jwt.verify(req.cookies.token, 'shshshsh');
//      req.user = data;
//     }
//     next();
// }

// Current isLoggedIn
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login'); // redirect if no token
    }

    try {
        const data = jwt.verify(token, 'shshshsh'); // verify token
        req.user = data; // store user info
        next(); // continue to next route
    } catch (err) {
        return res.redirect('/login'); // redirect if token invalid/expired
    }
}

// ---------------- Server ----------------
app.listen(3000);
