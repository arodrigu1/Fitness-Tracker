const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  Workout.create({type: "workout"})
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, {$set: {exercises: body}}, {})
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });;
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
  .sort({ "day": -1 })
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  })

});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id, function (err,docs) {
    if (err) {
      console.log(err)
    } else {
      console.log("Deleted: ", docs);
    }
  });
});

module.exports = router;