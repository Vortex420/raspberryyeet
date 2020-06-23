module.exports = {
	name: 'spotify',
    description: 'Generate a Spotify account [Premium chance: 12%]',
	execute(message, args) {
        const Discord = require('discord.js');
        const spotify = require('../json/spotify.json');
        const fs = require('fs');
        let replies = spotify.stock;
        let result = Math.floor(Math.random() * replies.length);
        
        if(spotify.stock.length <= 0)
        {
            message.reply(`${this.name} Does not have any stock right now... Please try again later!`);
        }else {
            let embed = new Discord.MessageEmbed()
                .setColor("#00ff44")
                .addField("Generated " + this.name +" Account", replies[result]);
            message.channel.send(`Generated ${this.name}`);
            return message.author.send(embed);
        }
	}
};