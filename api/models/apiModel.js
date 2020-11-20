
const mongoose = require('mongoose')
const GeoCoders =require('../utils/geocoder')
const slugify =require('slug')
const ApiSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        trim:true,
        unique:true,
        maxlength:[50,'Name can not be more then 50 characters']
    },  
    slug:{
        type:String,
    }, 
    description:{
        type:String,
        required:[true,'Please add a Description'],
        maxlength:[1000,' Description can not be more then 50 characters']
    }, 
     Website:{
        type:String,
        match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,'Please use valid Url with HTTP or HTTPS']
    }, 
     phone:{
        type:String,
     
        maxlength:[20,'Phone  can not be more then 20 characters']
    }, 
     email:{
        type:String,
        required:[true,'Please add a email'],
        trim:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ,'Pleass add valid email']
    },
    address:{
        type:String,
        required:[true,'Please add a adrees'],
       
    }, 
    location:{
        type: {
            type: String, 
            enum: ['Point'],
           
          },
          coordinates: {
            type: [Number],
         
          },
          formattedAddress:String,
          street:String,
          city:String,
          state:String,
          zipcode:String,
          country:String

    },
     careers:{
        type:[String],
        required:[true],
        enum:[
            'Web Development',
            'Mobile Development',
            'UX/UI',
            'Data Science',
            'Business',
            'Other'
        ]
    },
     averageCost:Number, 
     photo:{
        type:String,
        default:'emptyphoto.jpg'
    },
     housing:{
        type:Boolean,
      default:false
    }, 
    jobAssistance:{
        type:Boolean,
       default:false
    },
     jobGuarantee:{
        type:Boolean,
       default:false
    },
     acceptGi:{
        type:Boolean,
       default:false
    }, 
   
},{timestamps:true})

ApiSchema.pre('save',function (next) {
    this.slug =slugify(this.name ,{lower:true})
    next()
})

ApiSchema.pre('save', async function(next){
    const loc =await GeoCoders.geocode(this.address)
    this.location ={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress,
        street:loc[0].streetName,
        city:loc[0].city,
        state:loc[0].stateCode,
        zipcode:loc[0].zipcode,
        country:loc[0].country,
        
    }
    this.address =undefined
    next()
})
module.exports =mongoose.model('Api',ApiSchema)