var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer");
router.post("/fetchproductimages",upload.any(), function(req, res, next) {
pool.query("select * from productimages where productid=?",[req.body.productid],function(error,result){
  if(error)
  {
     return res.status(500).json([])
  }
  else{
     return res.status(200).json({result:result})
  }
})

})

router.post("/saveproductimages",upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into productimages(categoryid,subcategoryid,brandid,productid,image)values ?"
    pool.query(q,[req.files.map((item)=> [req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,item.filename])],function(error,result){
    
    if (error)
    {
       console.log(error)
       res.status(500).json({result:false});
    }
    else
    {
     
      res.status(200).json({result:true});
    }
  })
})


module.exports = router;