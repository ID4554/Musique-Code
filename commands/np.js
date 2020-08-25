const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");

module.exports = {
  name: "np",
  description: "Get the name of current playing song",
  execute (client, message, args) {
    message.delete()
    let embed = new MessageEmbed()
.setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Veuillez Vous Connecter A Un Salon Vocal")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Le Bot Ne Joue Rien")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`<:Check:744887391252119612> **Lecture En Cours - ${serverQueue.songs[0].title}**`)
    message.channel.send(embed)

    
    
    
  }
}