const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get("/tasks", taskController.list_today_tasks);

router.get("/todotasks", taskController.list_todo_tasks);
router.get("/doingtasks", taskController.list_doing_tasks);
router.get("/donetasks", taskController.list_done_tasks);

router.post("/createtask", taskController.create_a_task);
  
// router.get("/tasks/:taskId", taskController.read_a_task);
router.put("/tasks/:taskId", taskController.update_a_task);
router.delete("/tasks/:taskId", taskController.delete_a_task);

module.exports = router;