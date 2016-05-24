'use strict';

const Script = require('smooch-bot').Script;
const smoochBot = require('smooch-bot');
var storage = require("node-persist");
var getQuotesFromStorage = require('./helper.js');
const Bot = smoochBot.Bot;
storage.initSync();

Class HerokuBot extends Bot {
    constructor(options) {
        super(options);
    }
    
    function getQuotes(){
        getQuotesFromStorage(function(quote){
            console.log(quote);
            return 'demo';
        });
    }    
}
function getQuotes(){
        getQuotesFromStorage(function(quote){
            console.log(quote);
            return 'demo';
        });
}

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch Bot!')
                .then(() => 'getQuotes1');
        }
    },

    getQuotes1 : {
      prompt: (bot) => bot.say(bot.getQuotes()),
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

