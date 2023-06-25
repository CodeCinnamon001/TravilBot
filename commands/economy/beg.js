const Cooldown = require("../../schemas/Cooldown");
const UserProfile = require("../../schemas/UserProfile");


function getRandomNumber(x,y) {
  const range = y - x + 1;
  const randomNumber =  Math.floor(Math.random() * range);
  return randomNumber + x;
}


module.exports = {
  run: async ({ interaction }) => {
    if(!interaction.inGuild()){
      interaction.reply({
        content: "This Command can only be executed in a server",
        ephemeral: true,
      });
      return;
    }

    try {
       await interaction.deferReply();

       const commandName = 'beg';
       const userId = interaction.user.id;
       let cooldown = await Cooldown.findOne({userId,commandName});

       if(cooldown && Date.now() < cooldown.endAt) {
         const {default: prettyMs} = await import ("pretty-ms");

      await interaction.editReply(
        `You are on cooldown. Try again after ${prettyMs(cooldown.endAt - Date.now())}`
      )
         return;
       }
      if(!cooldown){
     cooldown = new Cooldown({userId, commandName });
}
      const chance = getRandomNumber(0,100);
      if (chance < 40) {
        await interaction.editReply(
          `You didn't win anything. Try again later`
        );
        cooldown.endAt = Date.now() + 300_000;
        await cooldown.save();
        return;
        
      }
      const amount = getRandomNumber(30, 180);
      let userProfile = await UserProfile.findOne({userId}).select('userId balance');
      if (!userProfile) {
        userProfile = new UserProfile({ userId });
      }
     userProfile.balance += amount;
    cooldown.endAt = Date.now() + 300_000;
      await Promise.all([cooldown.save(),userProfile.save()])
      await interaction.editReply(`You got ${amount} \n New balance is ${userProfile.balance}`)
      
    } catch (error) {
       console.log(`Error handling /beg ${error}`);
    }
    
  },
  
  data: {
    name: 'beg',
    description: 'use /beg to get some extra balance!',
  },
}