const request = require('postman-request');
const locationAccessToken = "pk.eyJ1IjoibmFkYXZzaGFhciIsImEiOiJja2I1MzM0ZnAwdWp5Mnd0OGV2ZnByODExIn0.konqCI5sITPAQw-mHHAmYQ";

const getGeocode = (address, callback) => {
    const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${locationAccessToken}&limit=1`;
    request({ url: locationUrl, json: true }, (err, res) => {
        if(err) return callback(err, undefined);
        const data = res.body;
        if(res.body.error || !data.features.length) return callback("Unable to find loaction.", undefined);
        
        const { center, place_name } = data.features[0];
        callback(undefined, {long: center[0], lat: center[1], name: place_name});
    });
};

module.exports = getGeocode;