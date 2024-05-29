const express = require("express");
// const {isValidPassword} = require("./utils/validators");
const validator = require("validator");
const { check, validationResult} = require("express-validator")

const app = express();

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res .send("This is the home page");
});

app.get("/register", (req, res) => {
    res.send(`
    <form action="/register" method="post">
    <div>
        <label for="username">Ussername</label>
        <input type="text" name="username">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password">
  </div>
  <div>
      <input type="submit" value="send">
  </div>
</form>
    `);
});

// Extract validation in util function
function isValidPassword(password) {
    let isValid = true;
    if(password.length < 8) {
        isValid = false;
    }

    return isValid;
}

// Extract function in middleware
// function isValidPasswordMiddleware(req, res, next) {
//     if(req.body.password.length < 8) {
//         return res.status(404).send("Password should be at least 8 characters long!");
//     }
//     next();
// }


app.post("/register", (req, res) => {
    
    // if(!isValidPassword(req.body.password)) {
    //     return res.status(400).send("Password should be at least 8 characters long!")
    // }

    if(!validator.isLength(req.body.password, {min: 8, max: 30})) {
          return res.status(400).send("Password should be between 8 and 30 characters!")
    }

    if(!validator.isEmail(req.body.username)) {
        return res.status(400).send("Username should be a valid email!")
    }

    res.redirect("/register");
});

const port ="5000"
app.listen(port, console.log(`Server listnes on port ${port}...`))