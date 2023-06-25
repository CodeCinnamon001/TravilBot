const {SlashCommandBuilder} = require("@discordjs/builders");
const {EmbedBuilder, PermissionsBitField,ButtonBuilder,ActionRowBuilder,ButtonStyle}= require("discord.js");
module.exports= {
  moderatorOnly : true,
  data: new SlashCommandBuilder()
  .setName('purge')
  .setDescription('deletes channel messages')
  .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete').setMinValue(1).setMaxValue(100).setRequired(true)),
                    
        
 run: async({interaction,client}) => {
   if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
     return interaction.reply({content: `You dont have permission to purge messages `,ephemeral: true})
   }
   let number = interaction.options.getInteger('amount');
   

        if(number > 100) {
            return await interaction.reply('You cannot delete more than 100 messages at once due to Discord limitations');
        }
  interaction.reply({content:`:white_check_mark: Deleted ${number} messages`,ephemeral: true})
   await interaction.channel.bulkDelete(number,true)




   
 },

}