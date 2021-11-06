const router = require('express').Router();

//get all valid employees
router.get('/', (req, res) =>{
    res.send('Employee Route');
})