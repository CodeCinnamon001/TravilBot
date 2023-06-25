module.exports = {
  data:{
    name: 'invite',
    description: 'Invite me from',
  },
  run:  ( {interaction, client} ) => {
    let invite = "https://discord.com/api/oauth2/authorize?client_id=1114424621006069872&permissions=8&scope=bot%20applications.commands"
    interaction.reply(`Invite me From [TrivalBot](${invite})`);
  },
}