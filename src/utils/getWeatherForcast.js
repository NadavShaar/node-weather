const request = require('postman-request');
const weatherAccessToken = "db04bb1aa30bdd57c1866972947223fd";

const getWeatherForcast = (geoData, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherAccessToken}&query=${geoData.long}, ${geoData.lat}`;
        
    request({ url: weatherUrl, json: true }, (err, res) => {
        if(err) return callback(err, undefined);
        if(res.body.error) return callback("Unable to find loaction.", undefined);
    
        const data = res.body;
        const { temperature, feelslike, precip, weather_descriptions } = data.current;
        callback(undefined, {location: geoData.name, forcast: `${weather_descriptions[0]} in ${geoData.name}, the temperature is ${temperature} degress that feels like ${feelslike} degrees, and there\'s a ${precip}% chance for rain.`})
    })
};

module.exports = getWeatherForcast;