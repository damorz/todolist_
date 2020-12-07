const mongoose = require("mongoose");
const task = mongoose.model("task");

exports.list_all_tasks = (req, res) => {
  task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.list_todo_tasks = (req, res) => {
  task.find({status: "TODO"}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.list_doing_tasks = (req, res) => {
  task.find({status: "DOING"}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.list_done_tasks = (req, res) => {
  task.find({status: "DONE"}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res) => {
  const newTask = new task(req.body);
  newTask.save((err, task) => {
    if (err) 
      res.send(err);
    else
      res.json({status: "success", data: task});
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
