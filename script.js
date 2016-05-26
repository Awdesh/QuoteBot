'use strict';

const Script = require('smooch-bot').Script;
const smoochBot = require('smooch-bot');
var storage = require("node-persist");
var getQuotesFromStorage = require('./helper.js');
const MemoryStore = smoochBot.MemoryStore;
const MemoryLock = smoochBot.MemoryLock;

storage.initSync();

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Good Morning..')
                .then(() => 'askName');
        }
    },

    getQuotes : {
      prompt: (bot) => getQuotesFromStorage(function(quote) {
          console.log(quote);
          bot.say(quote);
      }),
      receive: () => 'Have a good day today.. Bye'
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },
    
    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
