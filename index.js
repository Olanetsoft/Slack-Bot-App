const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'nuggets'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with @nuggets',
        params
    );
})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})


// Response Handler
const handleMessage = (message) =>{
    if(message.includes(' inspire me')) {
        inspireMe()
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}


// inspire Me
const inspireMe = ()=> {
    axios.get('https://raw.githubusercontent.com/Olanetsoft/Slack-Bot-App/qoutes.json')
        .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }

            bot.postMessageToChannel(
                'random',
                `:zap: ${quote} - *${author}*`,
                params
            );

        })
}


// Random Joke
const randomJoke = () =>{
    axios.get('https://api.chucknorris.io/jokes/random')//This gets random jokes from chucknorris api
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}



// Show Help
const runHelp = ()=>{
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@nuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}
