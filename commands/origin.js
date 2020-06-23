module.exports = {
	name: 'origin',
    description: 'Generate a Origin Account',
	execute(message) {
        const Discord = require('discord.js');
        const origin = require('../json/origin.json');
        const fs = require('fs');
        let replies = origin.stock;
        
        if(origin.stock.length <= 0)
        {
            message.reply(`${this.name} Does not have any stock right now... Please try again later!`);
        }else{
            let result = Math.floor(Math.random() * replies.length);
            let embed = new Discord.MessageEmbed()
                .setColor("#00ff44")
                .addField("Generated Origin Account", replies[result]);
            message.channel.send(`Generated ${this.name}`);
            return message.author.send(embed);
        }
	}
};