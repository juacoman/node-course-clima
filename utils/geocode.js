const request =  require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVhY29oaG1nZSIsImEiOiJja2prb2hvNzYwNHMyMnRuODc0bW0xd2hnIn0.pc8X1WaW-LmVS48WTrSmmA'

    request({url:url, json: true}, (error, {body}) => { 
        if(error){
            // (error, data)
            callback('There´s no internet connection', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }
        else{
            const coords = body.features
            callback(undefined, {
                latitude: coords[0].center[1],
                longitude: coords[0].center[0],
                location: coords[0].place_name
            })
        }
    })
}

module.exports = geocode