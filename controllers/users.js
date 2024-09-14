require("dotenv").config();
const { prisma } = require("../prisma/prisma-client.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in the required fields" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        createdEmployee: true,
      },
    });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        employees: user.createdEmployee,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1h" }),
      });
    } else {
      return res.status(400).json({ message: "Mistake to login or password" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Mistake to login or password" });
  }
};

const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please fill in the required fields" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        createdEmployee: true,
      },
    });
    if (registeredUser) {
      return res
        .status(400)
        .json({ message: ` user which email ${email} already was created` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const secret = process.env.JWT_SECRET;
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1h" }),
      });
    } else {
      return res.status(400).json({ message: "Mistake to create user" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Mistake to create user" });
  }
};
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
