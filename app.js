const express = require('express')
const apiRouter =require('./api/routers/apiRouter')
const bodyparser =require('body-parser')
const mongoose =require('mongoose')
const errorhandeler =require('./api/middleware/errorhandeler')
const logger =require('./api/middleware/logger.js')

const app =express()
 

    const morgan =require('morgan')
    app.use(morgan('dev'))
    mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology:true ,useNewUrlParser:true})
    .then(res=>{
        console.log('DataBase is Connected')
    })
    .catch(err=>[
        console.log('Somthing went worng'+err)
    ])

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.use(logger)

app.use('/api/job',apiRouter)
app.use(errorhandeler)



module.exports = app