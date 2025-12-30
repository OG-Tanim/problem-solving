const { Router } = require("express");
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwtSecret = "12345";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const regex = /^[\w.-]+@[\w.-]+\.[\w.-]+$/;

  if (!regex.test(username) || !(password.length > 5)) {
    return res.status(401).json({ msg: "Invalid email or passowrd" });
  }

  try {
    if (await Admin.exits({ username: username })) {
      return res.status(409).json({ msg: "Admin already exists" });
    }

    await Admin.create({
      username: username,
      password: password,
    });
    res.status(201).json({ msg: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!(await Admin.exists({ username: username, password: password }))) {
      return res.status(401).json({ msg: "Admin does not exist " });
    }

    const token = jwt.sign(username, jwtSecret);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const data = req.body;

  try {
    await Course.create({
      title: data.title,
      description: data.description,
      price: data.price,
      imageLink: data.imageLink,
    });
    res.status(201).json({ msg: "course created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({ msg: courses });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
