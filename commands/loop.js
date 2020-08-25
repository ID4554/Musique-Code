const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "loop",
  description: "Loop Your Queue and have fun",
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
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`Loop Est Maintenant **${serverQueue.loop ? "Activé" : "Désactiver"}**`)
    message.channel.send(embed)
    
    
    
    
  }
}