const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");
module.exports = {
  name: "volume",
  description: "Manage the volume of the song",
  execute(client, message, args) {
    message.delete()
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed to change the volume of the music")
    }
    

    
    let embed = new MessageEmbed().setColor(COLOR);

    
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
    
    if(!args[0]) {
      embed.setAuthor(`Le Volume Actuel Est ${serverQueue.volume}`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setAuthor("Veuillez N'utiliser Que Des Valeurs Numériques")
      return message.channel.send(embed)
    }
    
    if(args[0] > 200) {
      embed.setAuthor("Vous Mourrez Si Vous Atteignez La Limite De 200")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`Volume Réglé Sur ${args[0]}`)
    message.channel.send(embed)
    
  }
};
