const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "jump",
  description: "Jump to any song you like",
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

    if (!serverQueue) {
      embed.setAuthor("Il N'y A Rien A Jouer Que Je Pourrais Boucler")
      return message.channel.send(embed);
    }
     if(!args[0]) {
      embed.setAuthor(`Veuillez Indiquer Le Nombre De La Musique`)
      return message.channel.send(embed)
    }
    
      if(isNaN(args[0])) {
      embed.setAuthor("Veuillez N'utiliser Que Des Valeurs Numériques")
      return message.channel.send(embed)
    }
    
  if(serverQueue.songs.length < args[0]) {
    embed.setAuthor("Impossible De Trouver Cette Chanson Dans La Dile D'attente")
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(args[0] - 1))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`Saut Au Numéro De La Chanson - ${args[0]}`)
    
  }
}