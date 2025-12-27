const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://node-crud-api-backend:tX5g9QCwrALUp6NE@cluster0.vyhfyba.mongodb.net/cohort?appName=Cluster0"
);

mongoose.connection.on("connected", () => {
  console.log("connected to DB");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
// async function checkConnection() {
//     try {
//         await mongoose.connect('mongodb+srv://node-crud-api-backend:tX5g9QCwrALUp6NE@cluster0.vyhfyba.mongodb.net/?appName=Cluster0');
//         console.log('connected to DB')
//     } catch (error) {
//         console.log(error)
//     }
// }
// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  courses: {
    type: Array,
    default: [],
  },
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: { type: Boolean, default: true },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
