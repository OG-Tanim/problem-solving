const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Course } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwtSecret = "12345";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const regex = /^[\w.-]+@[\w.-]+\.[\w.-]+$/;

  if (!regex.test(username) || !(password.length > 5)) {
    return res.status(401).json({ msg: "Invalid email or passowrd" });
  }

  try {
    if (await User.exists({ username: username })) {
      return res.status(409).json({ msg: "User already exists" });
    }

    await User.create({
      username: username,
      password: password,
    });
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement User signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!(await User.exits({ username: username, password: password }))) {
      return res.json(404).json({ msg: "User does not exist " });
    }

    const token = jwt.sign(username, jwtSecret);
    return res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({ msg: courses });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.user;

  if (!courseId) {
    return res.json(404);
  }

  try {
    const course = await Course.findOne({ _id: courseId });
    const user = await User.findOne({ username: username });

    user.courses.push(course);
    await user.save();
    res.status(200).json({ msg: "Course purchased successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.user;

  try {
    const user = await User.findOne({ username: username });
    res.status(200).json({ purchasedCourses: user.courses });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
