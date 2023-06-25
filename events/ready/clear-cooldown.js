const Cooldown = require("../../schemas/Cooldown");

module.exports = () => {
  setInterval(async () => {
    try {
      const cooldown = await Cooldown.find().select('endAt')
      for (const cooldown of cooldowns) {
        if(Date.now()<cooldown.endAt) return;
        await Cooldown.deleteOne({_id : cooldown._id})
      }
      
    } catch (error) {
      console.log(`Error in clearing cooldown ${error}`);
    }
  }, 3.6e+6)
}