const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const discord = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('helloworld')
		.setDescription('My 1st Command.'),
	async execute(interaction) {
		await interaction.reply({
            "content": "Hello World",
            "embeds": [
                new EmbedBuilder()
                .setTitle("Hello World")
                .setDescription(`Hello World`)
                
            ],
            "components": [
                new discord.ActionRowBuilder()
                .addComponents([
                    new discord.ButtonBuilder()
                    .setLabel("Hello World!")
                    .setStyle(3)
                    .setEmoji("👋")
                    .setCustomId("Hello_world"),
                ])
            ]
      
    })
	},
};
