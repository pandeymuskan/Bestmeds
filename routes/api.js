const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:zipcode', function (req, res, next) {
    const {zipcode}=req.params
    axios.get("http://www.postalpincode.in/api/pincode/" + zipcode).then(response => {
        if (Array.isArray(response.data.PostOffice) && response.data.PostOffice.length) {
            res.status(200).json({ data: response.data.PostOffice[0], status: true })
        } else {
            res.status(500).json({ data: {}, status: false })

        }
    }).catch(err=>{
        res.status(500).json({ data: {}, status: false })
    })
});


module.exports = router;
