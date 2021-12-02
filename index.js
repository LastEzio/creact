const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionRole } = require("reaction-role");
const { bargs } = require("bargs");
const { config } = require("dotenv");


config();

const client = new ReactionRole(process.env.BOT_TOKEN, process.env.MONGODB_URI);
const prefix = "r!";
const activities = [
	`${prefix}help | version 1.0.2`,
	`${prefix}rr | version 1.0.2`,
	`${prefix}invite`,
	`Minecraft`,
	`Caves & Cliffs part:2 YEEEY`,
	`New Updates`
  ];
  
  client.on("ready", () => {
	// run every 10 seconds
	setInterval(() => {
	  // generate random number between 1 and list length.
	  const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
	  const newActivity = activities[randomIndex];
      client.user.setStatus('dnd');
	  client.user.setActivity(newActivity);
	}, 10000);
  });
  

client.on("message", async (message, Discord, guild) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.startsWith(prefix)
	)
		return;
		

	const [command, ...split] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

		if (command === "ping")
		message.channel.send(
			new MessageEmbed()
			  .setColor("RANDOM")

			  .setFooter(
				`Requested by ${message.author.tag}`,
				message.author.displayAvatarURL({ dynamic: true }))

			  .setTitle(`${'🏓'} Pong!: Your ping is ${client.ws.ping}ms!`)
			);
			else if (command === "prefix")
			    message.channel.send("coming soon");
             
            else if (command === "hehe"){
			    const embed = new MessageEmbed()
				.setTitle("hehe")
				.addField("**hehe**")
				.setColor("RANDOM")
				.setFooter(`Hehe by ${client.user.tag}`,
				client.user.displayAvatarURL({ dynamic: true }))
				return message.channel.send(embed)}
			
		    else if (command === "help"){
				const embed = new MessageEmbed()
				.setTitle("HELP MENU 🔰 Commands")
				.addField('Prefix Information', `Prefix: \`${prefix}\`\n`, false)
				.addField("• Developer", `\`\`\`yml\nName: lastezio#8653[571623620418469889]\`\`\``)
				.addField("• Important Links", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/KqZqCGGbSv)\`**`)
				.setDescription(
				  `Use \`${prefix}rr\` for more information.`
				)
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }))
				.setThumbnail(client.user.displayAvatarURL())
				.setColor("RANDOM")
			  return message.channel.send(embed);
			}
			var kullanıcı = message.author;
			if (command === "msgtest")
               kullanıcı.send("test")
			else if (message.content.startsWith(prefix + "announce")) {
				// reading content to be announced
				let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
				let finalmessage = announcemessage.toUpperCase();
			
				console.log(announcemessage);
				
				// the embed 
				const announceEmbed = new MessageEmbed()
				  .setColor("#ff1233")
				  .setTitle("Announcement!")
				  .setDescription(`` + finalmessage)
				  .setThumbnail(message.author.displayAvatarURL())
				  .setFooter(
					`Announce by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }));
				  // add more embed configs if you like
				message.channel.send(announceEmbed);
			  }
			  else if (command === "invite"){
				const embed = new MessageEmbed()
				.setTitle("INVITE 🔰 LINK")
				.addField("• Invite/Support Links", `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/KqZqCGGbSv)\``)
				
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }))
				.setThumbnail(client.user.displayAvatarURL())
				.setColor("GREEN")
			  return message.channel.send(embed);
			}
			  else if (message.content.startsWith(prefix + "say")) {
				// reading content to be announced
				let announcemessage = message.content.match(/(?<=say ).*$/)[0];
				let finalmessage = announcemessage;
			
				console.log( message.author.tag + " " + announcemessage);
				
				// the embed 
				const announceEmbed = new MessageEmbed()
				  .setColor("RANDOM")
				  .setTitle(`${message.author.tag} said`)
				  .setDescription(`**` + finalmessage +`**`)
				  .setThumbnail(client.user.displayAvatarURL())
				  .setFooter(
					`Sent by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }));
				  // add more embed configs if you like
				message.channel.send(announceEmbed);
			  }


	else if (command === "rr") {
		const args = bargs(
			[
				{
					name: "emoji",
					type: String,
					aliases: ["e"],
				},
				{
					name: "role",
					type: String,
					aliases: ["r"],
				},
				{
					name: "channel",
					type: String,
					aliases: ["c"],
				},
				{
					name: "msg",
					type: String,
					aliases: ["m"],
				},
				{
					name: "add",
					type: String,
					aliases: ["a"],
				},
				{
					name: "remove",
					type: String,
					aliases: ["rm"],
				},
			],
			split,
		);
		const { emoji, role, channel, msg, add, remove } = args;
		if (!emoji || !role || !channel || !msg)
		return message.reply(
			"r! -e <emoji> -r <role_id> -c <channel_id> -m <message_id> -a <add_message> -rm <remove_message>");	
		const c = await client.channels.fetch(channel);
		const m = await c.messages.fetch(msg);
		await m.react(emoji);
		const option = client.createOption(emoji, [role], add, remove);
		await client.createMessage(channel, msg, 1, option);
		message.reply("created!");
	}
});

client.init();

