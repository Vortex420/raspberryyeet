const Discord = require('discord.js');
const prefix = '+';
const other = require('./functions.js')
const client = new Discord.Client();
const origin = require('./json/origin.json');
const fs = require('fs');
// !!!!!!!!!!!!!!!!!!!!!
const devs = require('./devs.json')
// !!!!!!!!!!!!!!!!!!!!!
const version = '0.25';
//!!!!!!!!!!!!!!!!!!!!!

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.clear();
    other.Log();
    client.user.setActivity({
        type: "STREAMING",
        name: `Version ${version}`,
        url: "https://discord.com/"
    }); 
});

client.on("message", message => {
    let args = message.content.split(" ").slice(1);

    if(message.content.startsWith(`${prefix}stock`))
    {
        let embed = new Discord.MessageEmbed();
        embed.setColor(0xff8000);
        embed.addField(`***Gen Stocks***`, `Find the current stock!`);
        embed.addField(`Origin: `, origin.stock.length);
        message.channel.send(embed);
    }

    if(message.content.startsWith(`${prefix}addOrigin`))
    {
        if(devs.developers.includes(message.author.id)){
            let args = message.content.slice(prefix.length).split(' ');
            let account = args[1];
            let data_M = origin.stock
            data_M.push(account);
            let data = origin["stock"] = 
            {
               stock: data_M
            }
            fs.writeFile(`./json/origin.json`, JSON.stringify(data), (err) => {
                if(err) console.log(err);
            });
            let embed = new Discord.MessageEmbed();
            embed.setColor(0x00ff00);
            embed.addField(`***Added:***`, `${account}`);
            message.channel.send(embed);
        }else {
            message.reply('Only the bot devs can use this');
        }
        
    }

    if(message.content.startsWith(`${prefix}delOrigin`))
    {
        if(devs.developers.includes(message.author.id)){

            let index = args.join(" ");
            let embed = new Discord.MessageEmbed();
            embed.addField(`***Removed:***`, `${origin.stock[index]}`)
            let data_M = origin.stock
            data_M.splice(index, 1);
            let data = origin['stock'] = 
            {
                stock: data_M
            }
            fs.writeFileSync('./json/origin.json', JSON.stringify(data), (err) => {
                console.log(err);
            });
            embed.setColor(0x00ff00);
            message.channel.send(embed);

        }else {
            message.reply('Only the bot devs can use this');
        }
        
    }

    if(message.content.startsWith(`${prefix}origin`))
    {
        client.commands.get('origin').execute(message, args);
    }

    if(message.content.startsWith(`${prefix}spotify`))
    {
        client.commands.get('spotify').execute(message, args);
    }

    if(message.content.startsWith(`${prefix}addDev`))
    {
        if(devs.developers.includes(message.author.id))
        {
            let user = message.mentions.users.first();
            if(devs.developers.includes(user.id))
            { 
                message.reply(`${user} Already exist`)
            }else{
                let embed = new Discord.MessageEmbed();
                embed.addField(`***added:***`, `${user}`)
                let data_M = devs.developers
                data_M.push(user.id);
                let data = devs['developers'] = 
                {
                    developers: data_M
                }
                fs.writeFileSync('./devs.json', JSON.stringify(data), (err) => {
                    console.log(err);
                });
                embed.setColor(0x00ff00);
                message.channel.send(embed);
            }
        }else {
            message.reply('Only bot developers can use that!');
        }
    }
});

client.login('bot token');
