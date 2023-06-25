const UserProfile = require("../../schemas/UserProfile")

const dailyAmount = 500;

module.exports = {
  run: async ({interaction}) => {
    if(!interaction.inGuild()){
      interaction.reply({
        content: "This Command can only be executed in a server",
        ephemeral: true,
      });
      return;
    }
    try {
       await interaction.deferReply();
      let userProfile = await UserProfile.findOne({

userId: interaction.member.id,

});

if (userProfile) {

const lastDailyDate = userProfile.lastDailyCollected?.toDateString(); const currentDate = new Date().toDateString();

if (lastDailyDate === currentDate) {

interaction.editReply("You have already collected your dailies today. Come back tomorrow.");

return;
}
} else {

userProfile = new UserProfile({ 
  userId: interaction.member.id,}); 
}    
      userProfile.balance += dailyAmount;

userProfile.lastDailyCollected = new Date();

await userProfile.save();

interaction.editReply(
`${dailyAmount} was added to your balance. \nNew balance: ${userProfile.balance}`);


 
} catch (error) {
       console.log(`Error handling /daily ${error}`);
    }
    
  },
  data:{
    name: 'daily',
    description: 'claim your dailyPrice',
  },
  
}