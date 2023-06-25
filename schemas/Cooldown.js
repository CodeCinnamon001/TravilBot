const {Schema, model} = require("mongoose");

const cooldownSchema = new Schema({
  commandName:{
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  endAt:{
    type: Date,
    required: true,
  },
});

module.exports = model("Cooldown",cooldownSchema);