const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");


module.exports = {
  name: "resume", 
  description: "Resume the Cureent Playing Song",
  execute (client, message, args) {
    message.delete()
    let embed = new MessageEmbed()
.setColor(COLOR);

      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Veuillez Vous Connecter A Un Salon Vocal")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  embed.setAuthor("Reprise De La Chanson En Pause")
  return message.channel.send(embed)
 }
    embed.setDescription("Il N'y A Rien De Mis En Pause Que Je Puisse Reprendre")
    message.channel.send(embed)
    
  }
}