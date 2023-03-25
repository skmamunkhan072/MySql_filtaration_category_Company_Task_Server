const connection = require("./connection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// ALL DATA GET API
app.get("/job_info", (req, res) => {
  connection.query("SELECT * FROM all_job_information", (err, result) => {
    if (err) console.log(err);
    let allJobData = [];
    for (const data of result) {
      const jobData = JSON.parse(data?.skills);
      data["skills"] = jobData;
      allJobData = [...allJobData, data];
    }
    if (!allJobData.length) return res.send([]);
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

// All Data filter Database  api
app.get("/search_job_info", (req, res) => {
  const jobTitle = req.query.jobTitle.toLowerCase();
  const location = req.query.location.toLowerCase();
  const remoteJobSearch = req.query.remoteJobSearch.toLowerCase();
  const expected = req.query.expected.toLowerCase();
  const experience = req.query.experience.toLowerCase();
  const skillSerchDatabas = req.query.skillSerchDatabas.toLowerCase();
  let skillQuery = `%${skillSerchDatabas}%`;

  const query =
    "SELECT * FROM all_job_information WHERE LOWER(jobTitle) LIKE ? AND LOWER(location) LIKE ? AND LOWER(jobType) LIKE ?    AND LOWER(expected) LIKE ? AND LOWER(experience) LIKE ? AND skills LIKE ?";
  const params = [
    `%${jobTitle}%`,
    `%${location}%`,
    `%${remoteJobSearch}%`,
    `%${expected}%`,
    `%${experience}%`,
    `%${skillQuery}%`,
  ];

  connection.query(query, params, (err, result) => {
    if (err)
      return res
        .status(500)
        .send("An error occurred while processing your request.");

    let allJobData = [];
    for (const data of result) {
      const jobData = JSON.parse(data?.skills);
      data["skills"] = jobData;
      allJobData = [...allJobData, data];
    }
    if (!allJobData.length) return res.send([]);
    res.state(200).send(result);
  });
});

app.listen(port, () =>
  console.log(`filtaration category server running on ${port}`)
);
