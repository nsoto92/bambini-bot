require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const { prefix } = require('./config.json');


client.once('ready', () => {
	console.log('Ready!');
});

// Saludo a miembros nuevos - Greet new members.
client.on('guildMemberAdd', member => {
	// Role lookup.
	const role1 = member.guild.roles.cache.find(r => r.name === 'aprendizaje');
	// Assign Role.
	member.roles.add(role1).catch(console.error);
	// Welcome Message.
	const welcome = new Discord.MessageEmbed()
		.setTitle('Bienvenido a Umbrella Loyalty')
		.setDescription(`Bienvenido ${member}. Primero le tenemos unas tareas antes de otorgar accesso al resto del Discord, cuando estes listo para continuar escriba: !comenzar\n\n Si en cualquier momento necesita ayuda escriba: @Ayuda`)
		.setColor('#D4AF37')
		.setThumbnail(`${process.env.THUMB}`);
	// Channel to post on.
	const channel = member.guild.channels.cache.find(ch => ch.name === 'aprendizaje');
	// Channel Lookup.
	if (!channel) return;
	// Send Greeting if channel exists.
	channel.send(welcome);
});

// Server Message Interactions
client.on('message', message => {
	// Server Stats.
	if (message.content === `${process.env.PREFIX}umbrella`) {
		message.channel.send(`Server: ${message.guild.name}\nMiembros: ${message.guild.memberCount} miembros`);
	}
	// Trigger First Step.
	else if (message.content === `${process.env.PREFIX}comenzar`) {
		// First Step Message.
		const tasking = new Discord.MessageEmbed()
			.setTitle('Primeras Tareas')
			.setDescription(`${message.member}, Bienvenido al Discord!\n\nPrimero, debes crear cuentas en las siguientes páginas/aplicaciones:\n 
			-SAFEPAL\n 
			-METAMASK\n 
			-COINMARKET CAP\n 
			-COINGECKO\n 
			-TELEGRAM\n 
			-TWITTER\n 
			-CRYPTO\n 
			-TRUSTWALLET\n 
			-MEDIUM\n 
			-REDDIT\n\n
			Diríjase al canal de #tutorial-de-aprendizaje, y siga los 11 tutoriales que se encuentran en "pinned messages".\n
			Cuando haya terminado escriba: !terminado\n\n Si en cualquier momento necesita ayuda escriba: @Ayuda`)
			.setColor('#D4AF37')
			.setThumbnail(`${process.env.THUMB}`);
		// Channel to post tasking message.
		const channel = message.guild.channels.cache.find(ch => ch.name === 'aprendizaje');
		if (!channel) return;
		// Send tasking if channel exists.
		channel.send(tasking);
	}
	// Grant access to rest of server.
	else if (message.content === `${process.env.PREFIX}terminado`) {
		// Role to assign.
		const role1 = message.guild.roles.cache.find(r => r.name === 'members');
		// Role to remove.
		const role2 = message.guild.roles.cache.find(r => r.name === 'aprendizaje');
		// Remove role.
		message.member.roles.remove(role2).catch(console.error);
		// Add new role.
		message.member.roles.add(role1).catch(console.error);
	}
	// Announcement
	else if (message.content === `${process.env.PREFIX}anuncio`) {
		const ad = new Discord.MessageEmbed()
			.setTitle(`Anuncio de parte de ${message.author.username}`)
			.setDescription('Anuncio aqui')
			.setThumbnail(`${process.env.THUMB}`);
		message.channel.send(ad, '@everyone');
	}
});

client.login(`${process.env.BOT_TOKEN}`);