require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Lil Calus out here');
});

// Greet new members.
client.on('guildMemberAdd', member => {
	// Role lookup.
	// const role1 = member.guild.roles.cache.find(r => r.name === 'clan-member');

	// Assign Role.
	// member.roles.add(role1).catch(console.error);

	// Welcome Message.
	const welcome = new Discord.MessageEmbed()
		.setTitle('Bienvenido al Discord del Bambini')
		.setDescription(`Bienvenido ${member}.`)
		.setColor('#D4AF37')
		// .setThumbnail(`${process.env.THUMB}`);
	// Channel to post on.
	const channel = member.guild.channels.cache.find(ch => ch.name === 'bots');
	// Channel Lookup.
	if (!channel) return;
	// Send Greeting if channel exists.
	channel.send(welcome);
});

// Server Message Interactions
client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	// const anuncio = message.content.slice(process.env.PREFIX.length + 7);

	// Server Stats.
	if (command === 'server') {
		message.channel.send(`Server: ${message.guild.name}\nMembers: ${message.guild.memberCount} members`);
	}
	// Trigger First Step.
	// else if (command === 'comenzar') {
	// 	// First Step Message.
	// 	const tasking = new Discord.MessageEmbed()
	// 		.setTitle('Primeras Tareas')
	// 		.setDescription(`${message.member}, Bienvenido al Discord!\n\nPrimero, debes crear cuentas en las siguientes páginas/aplicaciones:\n
	// 		-SAFEPAL\n
	// 		-METAMASK\n
	// 		-COINMARKET CAP\n
	// 		-COINGECKO\n
	// 		-TELEGRAM\n
	// 		-TWITTER\n
	// 		-CRYPTO\n
	// 		-TRUSTWALLET\n
	// 		-MEDIUM\n
	// 		-REDDIT\n\n
	// 		Diríjase al canal de #tutorial-de-aprendizaje, y siga los 11 tutoriales que se encuentran en "pinned messages".\n
	// 		Cuando haya terminado escriba: !terminado\n\n Si en cualquier momento necesita ayuda escriba: @Ayuda`)
	// 		.setColor('#D4AF37')
	// 		.setThumbnail(`${process.env.THUMB}`);
	// 	// Channel to post tasking message.
	// 	const channel = message.guild.channels.cache.find(ch => ch.name === 'aprendizaje');
	// 	if (!channel) return;
	// 	// Send tasking if channel exists.
	// 	channel.send(tasking);
	// }

	// Grant access to rest of server.
	// else if (command === 'terminado') {
	// 	// Role to assign.
	// 	const role1 = message.guild.roles.cache.find(r => r.name === 'members');
	// 	// Role to remove.
	// 	const role2 = message.guild.roles.cache.find(r => r.name === 'aprendizaje');
	// 	// Remove role.
	// 	message.member.roles.remove(role2).catch(console.error);
	// 	// Add new role.
	// 	message.member.roles.add(role1).catch(console.error);
	// }

	// Announcement
// 	else if (command === 'anuncio') {
// 		const ad = new Discord.MessageEmbed()
// 			.setTitle(`Anuncio de parte de ${message.author.username}`)
// 			.setDescription(`${anuncio}\n@everyone`)
// 			.setColor('#D4AF37')
// 			.setThumbnail(message.author.displayAvatarURL());
// 		if (!args.length) {
// 			return message.channel.send(`Faltó tu mensaje, ${message.author}!`);
// 		}
// 		// Channel to post tasking message.
// 		const channel = message.guild.channels.cache.find(ch => ch.name === 'anuncios');
// 		if (!channel) return;
// 		// Send tasking if channel exists.
// 		channel.send(ad);
// 	}
});

client.login(`${process.env.BOT_TOKEN}`);