'use strict';

const Script = require('smooch-bot').Script;
var storage = require("node-persist");
var getQuotesFromStorage = require('../helper.js');
storage.initSync();



module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch Bot!')
                .then(() => 'askName');
        }
    },
    
    getQ() {
        getQuotesFromStorage(function(quote){
            console.log(quote);
            return quote;
        });
    },
    
    getQuotes : {
      prompt: (bot) => bot.say(bot.getQ()),
      receive: (bot) => {
          return bot.say('Have a good day')
            .then(() => 'finish');
      }
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
                .then((name) => bot.say(`Sorry ${name}, my crear didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
