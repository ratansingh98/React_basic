const express = require('express'); //Create express variable
const router = express.Router();  // Create router variable

// Return Response to the request.
router.get('/',(req,res)=>{
    res.send('server is up and running');
});

module.exports = router;