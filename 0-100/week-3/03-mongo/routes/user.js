const { Router } = require("express");
const { User, Course } = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (await User.exists({ username: username })) {
      res.status(403).json({
        msg: "User already exists",
      });
    } else {
      await User.create({
        username: username,
        password: password,
      });

      res.status(201).json({
        msg: "User created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const id = req.params.courseId;
  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const course = await Course.findOne({ _id: id });
    const user = await User.findOne({ username, password });
    user.courses.push(course);
    await user.save();

    res.status(200).json({
      msg: "Course purchased successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const user = await User.findOne({ username: username, password: password });
    res.status(200).json({
      purchasedCourses: user.courses,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;
