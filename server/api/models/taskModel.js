const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      dueDate: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        default: "TODO",
        enum: ["TODO", "DOING", "DONE"],
        required: true
      }
    },
    { collection: 'task' }
);
  
module.exports = mongoose.model('task', taskSchema);