const connection = require("./connection");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));

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
//localhost:5000/search_job_info?skillSerchDatabas=%html%css%%react%%
// All Data filter Database  api
app.get("/search_job_info", (req, res) => {
  const jobTitle = req.query.jobTitle ? req.query.jobTitle.toLowerCase() : "";
  const location = req.query.location ? req.query.location.toLowerCase() : "";
  const remoteJobSearch = req.query.remoteJobSearch
    ? req.query.remoteJobSearch.toLowerCase()
    : "";
  const expected = req.query.expected ? req.query.expected.toLowerCase() : "";
  const experience = req.query.experience
    ? req.query.experience.toLowerCase()
    : "";
  const skillSerchDatabas = req.query.skillSerchDatabas
    ? req.query.skillSerchDatabas.toLowerCase()
    : "";
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
    res.send(result);
  });
});

app.get("/search_result", async (req, res) => {
  const id = req.query.id ? req.query.id.toLocaleLowerCase() : "";
  const job_title = req.query.job_title
    ? req.query.job_title.toLocaleLowerCase()
    : "";
  const job_duration = req.query.job_duration
    ? req.query.job_duration.toLocaleLowerCase()
    : "";
  const freelancer_type = req.query.freelancer_type
    ? req.query.freelancer_type.toLocaleLowerCase()
    : "";
  const JobLocation = req.query.JobLocation
    ? req.query.JobLocation.toLocaleLowerCase()
    : "";
  const english_level = req.query.english_level
    ? req.query.english_level.toLocaleLowerCase()
    : "";
  const years_of_experience_preferred = req.query.years_of_experience_preferred
    ? req.query.years_of_experience_preferred.toLocaleLowerCase()
    : "";
  const fixed_project = req.query.fixed_project
    ? req.query.fixed_project.toLocaleLowerCase()
    : "";
  const minimum_price = req.query.minimum_price
    ? req.query.minimum_price.toLocaleLowerCase()
    : "";
  const maximum_price = req.query.maximum_price
    ? req.query.maximum_price.toLocaleLowerCase()
    : "";
  const job_categories = req.query.job_categories
    ? req.query.job_categories.toLocaleLowerCase()
    : "";
  const language = req.query.language
    ? req.query.language.toLocaleLowerCase()
    : "";
  const project_level = req.query.project_level
    ? req.query.project_level.toLocaleLowerCase()
    : "";
  const projectFile = req.query.projectFile
    ? req.query.projectFile.toLocaleLowerCase()
    : "";
  const job_details = req.query.job_details
    ? req.query.job_details.toLocaleLowerCase()
    : "";
  const project_location_type = req.query.project_location_type
    ? req.query.project_location_type.toLocaleLowerCase()
    : "";
  const PersonID = req.query.PersonID
    ? req.query.PersonID.toLocaleLowerCase()
    : "";
  const project_start_date = req.query.project_start_date
    ? req.query.project_start_date.toLocaleLowerCase()
    : "";

  const query =
    "SELECT * FROM test_table WHERE LOWER(id) LIKE ? AND LOWER(job_title) LIKE ? AND LOWER(job_duration) LIKE ? AND LOWER(freelancer_type) LIKE ? AND LOWER(JobLocation) LIKE ? AND LOWER(english_level) LIKE ? AND LOWER(years_of_experience_preferred) LIKE ? AND LOWER(fixed_project) LIKE ? AND LOWER(minimum_price) LIKE ? AND LOWER(maximum_price) LIKE ? AND LOWER(job_categories) LIKE ? AND LOWER(language) LIKE ? AND LOWER(project_level) LIKE ? AND LOWER(projectFile) LIKE ? AND LOWER(job_details) LIKE ? AND LOWER(project_location_type) LIKE ? AND LOWER(PersonID) LIKE ? AND LOWER(project_start_date) LIKE ?";

  const params = [
    `%${id}%`,
    `%${job_title}%`,
    `%${job_duration}%`,
    `%${freelancer_type}%`,
    `%${JobLocation}%`,
    `%${english_level}%`,
    `%${years_of_experience_preferred}%`,
    `%${fixed_project}%`,
    `%${minimum_price}%`,
    `%${maximum_price}%`,
    `%${job_categories}%`,
    `%${language}%`,
    `%${project_level}%`,
    `%${projectFile}%`,
    `%${job_details}%`,
    `%${project_location_type}%`,
    `%${PersonID}%`,
    `%${project_start_date}%`,
  ];

  connection.query(query, params, (err, result) => {
    if (err)
      return res
        .status(500)
        .send("An error occurred while processing your request.");

    // let allJobData = [];
    // for (const data of result) {
    //   const jobData = JSON.parse(data?.skills);
    //   data["skills"] = jobData;
    //   allJobData = [...allJobData, data];
    // }
    // if (!allJobData.length) return res.send([]);
    res.send(result);
  });
});

// id,
// job_title,
// job_duration,
// freelancer_type,
// JobLocation,
// english_level,
// years_of_experience_preferred,
// fixed_project,
// minimum_price,
// maximum_price,
// job_categories,
// language,
// project_level,
// projectFile,
// job_details,
// project_location_type,
// PersonID,
// project_start_date,

app.listen(port, () =>
  console.log(`filtaration category server running on ${port}`)
);

// http://localhost:5000/search_job_info?jobTitle=remote&location=""&remoteJobSearch=${remoteJobSearch}&experience=${experience}&expected=${expected}&skillSerchDatabas=${skillSerchDatabas}

// http://localhost:500/search_job_info?jobTitle=&location=&remoteJobSearch=remote&experience=&expected=
