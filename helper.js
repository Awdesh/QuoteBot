var storage = require('node-persist');
storage.initSync();

function getTodayDate(){
    var todayDate = new Date();
    var day = todayDate.getDay();
    return day;
}

module.exports = function(callback){
    var quote = {
          day1: 'LIVE WHAT YOU LOVE',
          day2: 'You are confined by the walls you create for yourself',
          day3: 'Being deeply loved by someone gives you strength'
        };
        
    storage.setItemSync('quote', quote);
    var quotes = storage.getItemSync('quote');
    
    var day = getTodayDate();
    
    switch(day){
        case 1:
            callback(quotes.day1);
            break;
        case 2:
            callback(quotes.day2);
            break;
        case 3:
            callback(quotes.day3);
            break;
        default:
            callback(quotes.day1);
            break;
    }
}