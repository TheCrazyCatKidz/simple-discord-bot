// Simple Discord Bot Template (DJS V14)
// A sprout project from Exilya. Learn more at https://exilya.uk

// This file is not copyrighted as we believe code advice is free, and
// that is what we continue to follow.
// Feel free to delete, edit and remove comments such as this one from
// this template, as Exilya is an open source project.

// ===========================
// Section: Starting Constants
// ===========================
// This is the section where we will be referencing to modules we need to start our Discord Bot.
// In this case we are referencing discord.js and it's client property, REST, Routes and fs.
// Client is the property which references to most data in discord.js.
// Collection is later to be used.
// We select 32767 for our Client Intents (permissions) because it is easier for the end user.
// However, if you become more experienced you may realise this is a fraction of a second
// slower which won't make much difference. If you want to change this in the future, it
// is possible with this template.

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const fs = require("node:fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("./config.json")

// ========================
// Section: Client Initials
// ========================
// This is where you want to execute certain functions per certain event.

client.on('ready', () => {
   client.user.setActivity("with my API")
  // This will display Playing with my API
})


// =========================
// Section: Command Handling
// =========================
// This is the section where your [/] Slash Commands will be handled. 
// We will be using the local directory /commands to store our exports.
// This is where fs, REST and Routes will be used.
// We will be refering to clientId, your Bot Token and guildId. Make sure to change these to
// your actual clientId, Bot Token and guildId as otherwise the bot will not work.

const commmands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
};
const rest = new REST({ version: '9' }).setToken(config.token);
(async () => {
  try {
    console.log('[⏱️] Processing [/] Slash Commands');

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log('[✅] All [/] Slash Commands have been assigned and are ready');
  } catch (error) {
    console.error(error);
  }
})();

// ==========================
// Section: Finishing Touches
// ==========================
// This consists of setting the bot token for the bot and doing finishing console logging.

module.exports.discord = client;
client.login(config.token)

// ====================================================
// This is the end of index.js.
// Congratulations on making it to the end of the file.
// ====================================================
