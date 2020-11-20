const API =require('../models/apiModel.js')
const ErrorResponse =require('../utils/errorResponse')
exports.getAllJob =async(req,res,next)=>{
try {
    const api = await API.find()
    if(api){
        return res.status(200).json({
            success:true,
            message:'All Information',
            data:api
        })
    }else{
        return res.status(404).json({
            success:false,
            message: 'Somthing Went Worng'
        }) 
    }
   
} catch (err) {
    next(err)
}
}
exports.createJob = async(req,res ,next)=>{
   try {
    const data =req.body
  
    const api = await API.create(req.body)

  if(api){
        res.status(200).json({
            message:`Data Save Successfully`,
            success:true,
            data:data
        })
    }else{
       return res.status(404).json({
            success:false,
            message: `Data is not save ${err}`
        })
    }

   } catch (error) {
       console.log(error) 
        next(error)
   }
    
}



exports.getJob = async(req,res,next)=>{
    const ID =req.params.id
    try {
        const api = await API.findById(ID)
    if(api){
        return res.status(200).json({
            success:true,
            message:'Single Information',
            data:api
        })
    }else{
        return next(new ErrorResponse(`Not Found with this id ${ID}`,404))
    }
    } catch (error) {
        console.log(error) 
        next(error)

        
    }
   
}
exports.updateJob = async(req,res,next)=>{
    
    const ID =req.params.id
    try {
        const api = await API.findByIdAndUpdate(ID,req.body,{
            new:true ,runValidators:true
        })

        if (api) {
            return res.status(200).json({
                success:true,
                message:`${ID} Updated`,
                data:api
            })
        } else {
            
        return res.status(404).json({
            success:false,
            message: 'Somthing Went Worng'
        }) 
        }

    
       
  
  
    } catch (error) {
        next(new ErrorResponse(`Not Found with this id ${ID}`,404))

        
    }
   
}
exports.deleteJob = async(req,res,next)=>{
    const ID =req.params.id
    try {
        const api = await API.findByIdAndDelete(ID)
    if(api){
        return res.status(200).json({
            success:true,
            message:`${ID} is Deleted`,
          
        })
    }else{
        return next(new ErrorResponse(`Not Found with this id ${ID}`,404))

    }
    } catch (error) {
        console.log(error)  
        next(new ErrorResponse(`Not Found with this id ${ID}`,404))

        
    }
   
}