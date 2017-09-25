var CronJob = require('cron').CronJob;
new CronJob('* 17-20 * * *', function(){
    console.log('Heya');
    console.log('It is currently ' + new Date());
}, null, true);
