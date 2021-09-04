const router = require("express").Router();
const Workout = require("../models/workout.js");
router.get("/api/workouts", (req, res) => {
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});
router.post("/api/workouts", (req, res) => {
  Workout.create({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  Workout.find({}, (error, data) => {
    data.forEach((workout) => {
      let lastExerciseDuration = 0;
      workout.exercises.forEach((exercise) => {
        lastExerciseDuration += exercise.duration;
      });
      workout.totalDuration = lastExerciseDuration;
    });
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});
module.exports = router;
