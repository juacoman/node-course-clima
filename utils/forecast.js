const request =  require('request')

const forecast  = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3d7a5eb39adf8389ebb9afacfb332114&query='+ lat + ',' + long
    //console.log(url)
    request({url: url, json: true}, (error, {body}) =>{
        if(error){
            callback('There´s no internet connection!', undefined)
        }
        else if(body.error){
            callback('Error: ' + body.error.code + '. ' + body.error.info, undefined)
        }
        else{
            const data = body
            const feelsLike = data.current.feelslike
            const degrees = data.current.temperature
            const description = data.current.weather_descriptions[0]
            callback(undefined, description + '. It is currently ' + degrees + '° outside. It feels like ' + feelsLike + '° outside')
        }
    })
}

module.exports = forecast