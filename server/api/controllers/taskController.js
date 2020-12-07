const mongoose = require("mongoose");
const task = mongoose.model("task");

exports.list_today_tasks = (req, res) => {
  const day = req.query.day;
  const nextDay = req.query.nextDay;
  const noTimeNextDay = nextDay.slice(0,11);
  const noTimeDay = day.slice(0,11);
  task.find(
    {
      dueDate: {
        $gte: new Date(`${noTimeDay}00:00:00.000+00:00`),
        $lt: new Date(`${noTimeNextDay}00:00:00.000+00:00`),
      },
    },
    (err, tasks) => {
      if (err) res.send(err);
      res.json(tasks);
    }
  );
};

exports.list_todo_tasks = (req, res) => {
  task.find({ status: "TODO" }, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.list_doing_tasks = (req, res) => {
  task.find({ status: "DOING" }, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.list_done_tasks = (req, res) => {
  task.find({ status: "DONE" }, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res) => {
  const newTask = new task(req.body);
  newTask.save((err, task) => {
    if (err) res.send(err);
    else res.json({ status: "success", data: task });
  });
};

exports.read_a_task = (req, res) => {
  task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = (req, res) => {
  const editedTask = req.body;
  task.findOneAndUpdate(
    { _id: editedTask._id },
    editedTask,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = (req, res) => {
  task.deleteOne({ _id: req.params.taskId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "task successfully deleted",
      _id: req.params.taskId,
    });
  });
};
