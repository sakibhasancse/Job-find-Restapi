const ErrorResponse = require("../utils/errorResponse");


const errorHandeler = (err ,req,res,next)=>{
    let error ={...err}
    error.message =err.message;


    
    if(err.name === 'ValidationError'){
        const message =Object.values(err.errors).map(val=> val.message  ) 
        error=new ErrorResponse(message ,400)
    }

    if(err.name === 'CastError'){
        const message =`Resources Not Found with this id ${err.value},404`
        error=new ErrorResponse(message ,404)
    }

    if(err.code === 11000){
        const message =`Duplicate Field value`
        error=new ErrorResponse(message ,400)
    }
    
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Internal Server Error'
    })

}

module.exports =errorHandeler