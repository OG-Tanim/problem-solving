const { Router } = require("express");
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (await Admin.exists({ username: username })) {
      res.status(403).json({
        msg: "Admin already exists",
      });
    } else {
      await Admin.create({
        username: username,
        password: password,
      });

      res.status(201).json({
        msg: "Admin created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const course = req.body;

  try {
    const new_course = await Course.create({
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
    });

    res.status(201).json({
      msg: "Course created successfully",
      courseId: `${new_course._id}`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
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

module.exports = router;
