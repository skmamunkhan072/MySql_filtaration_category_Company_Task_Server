const connection = require("./connection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 5000;

// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// ALL DATA GET API
app.get("/job_info", (req, res) => {
  connection.query("SELECT * FROM all_job_information", (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    res.send(result);
  });
});

// ALL job DATA POST API
app.post("/job_info", (req, res) => {
  const {
    jobTitle,
    JobDescription,
    location,
    jobType,
    skills,
    expected,
    experience,
  } = req.body;

  const query =
    "INSERT INTO all_job_information (jobTitle, JobDescription, location, jobType, skills, expected, experience) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      jobTitle,
      JobDescription,
      location,
      jobType,
      JSON.stringify(skills),
      expected,
      experience,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Failed to add job post" });
      res.send(result);
    }
  );
});

// Data filter Databas
app.get("/search_job_info", (req, res) => {
  // console.log("Hello");
  const jobTitle = req.query.jobTitle.toLowerCase();
  const location = req.query.location.toLowerCase();
  const jobType = req.query.jobType.toLowerCase();
  const skill = req.query.skill.toLowerCase();
  const expected = req.query.expected.toLowerCase();
  const experience = req.query.experience.toLowerCase();

  // console.log(jobTitle, location, jobType, expected, experience, skill);
  const query =
    "SELECT * FROM all_job_information WHERE LOWER(jobTitle) LIKE ? AND LOWER(location) LIKE ? AND LOWER(jobType) LIKE ?  AND LOWER(skills) LIKE ? AND LOWER(expected) LIKE ? AND LOWER(experience) LIKE ?";
  const params = [
    `%${jobTitle}%`,
    `%${location}%`,
    `%${jobType}%`,
    `%${skill}%`,
    `%${expected}%`,
    `%${experience}%`,
  ];

  connection.query(query, params, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while processing your request.");
    } else {
      res.send(rows);
    }
  });
});

// ONE  DATA GET API
// app.delete("/job_info/:id", (req, res) => {
//   connection.query(
//     "DELETE  FROM TABLENAME WHERE id=? ",
//     [req.params.id],
//     (err, rows) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(rows);
//         res.send(rows);
//       }
//     }
//   );
// });

app.listen(port, () =>
  console.log(`filtaration category server running on ${port}`)
);
