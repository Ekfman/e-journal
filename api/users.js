const express = require("express");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, validateAndGetUser } = require("../db/models/user");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
  
    console.log(req.body);
    try {
        const checkUser = await getUserByEmail(email);
        console.log(checkUser);
        if (checkUser) {
          next({
            name: "Error signing up",
            message: "That email is already in use",
          });
        }
        if (password.length < 8) {
          next({ name: "Error signing up", message: "Password is too short" });
        }
        const user = await createUser (email, password)
        if (user) {
            const token = jwt.sign(
              {
                id: user.id,
                email,
              },
              process.env.JWT_SECRET
            );
            res.send({
              user,
              message: "Thank you for signing up!",
              token,
              ok: true,
            });
          }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('req.body :>> ', req.body);
    if (!email || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both an email and a password",
      });
    }

    const user = await validateAndGetUser({ email, password });
    console.log('user :>> ', user);
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      console.log(token);
      res.send({
        message: "you're logged in!",
        token,
        user,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter
