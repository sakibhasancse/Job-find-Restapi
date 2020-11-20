 const NodeGeocoder =require('node-geocoder')

 const options ={
     provider:process.env.GEOCODER_PROVIDER || 'mapquest',
     httpAdapter:'https',
     apiKey:process.env.GEOCODER_API_KEY || 'zy2bobegfMHgk4rLZRCch8G2uDm41aVZ',
     formatter:null
 }
 const geoCoder =NodeGeocoder(options)

 module.exports = geoCoder