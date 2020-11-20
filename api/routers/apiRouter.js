
const express =require('express');
const {getAllJob,createJob, getJob,deleteJob , updateJob} =require('../controller/apiController')
const router =express.Router()


router
    .route('/')
    .get(getAllJob)
    .post(createJob)

router
    .route('/:id')
    .get(getJob)
    .put(updateJob)
    .delete(deleteJob)

module.exports =router