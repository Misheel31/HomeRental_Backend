const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
// const { createContext, useState, useContext } = require("react");
const SECRET_KEY =
  "7919268b71f36b6118b43e813a9a5b2a4c31815cb786c025ef08f1d13744e963";

const authenticate = async (req, res, next) => {
  const token = req.headers("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).send("Access denied: No token provided");
  }
  try {
    const verifytoken = jwt.verify(token, SECRET_KEY);
    req.user = verfied;
    next();
  } catch (e) {
    res.send(400).send("Invalid token");
  }
};

module.exports = {authenticate};
