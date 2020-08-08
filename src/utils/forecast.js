const request = require('request')

const forecast = (latitiude, longitude,callback) => {
url = 'http://api.weatherstack.com/current?access_key=e6a531124067643a6ca88254d517e695&query='+latitiude+','+longitude

request({url : url , json: true},(error,{body}) =>{
    if(error){
        callback("Unable to connect to weather Services",undefined)
    } else if(body.error){
        callback("Unable to find the location",undefined)
    } else {
        callback(undefined, `Current Temperature is ${body.current.temperature}, but is feelslike ${body.current.feelslike}. Today Weather is ${body.current.weather_descriptions[0]}`)
}
})
}
module.exports = forecast