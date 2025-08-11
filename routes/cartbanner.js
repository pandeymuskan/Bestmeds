var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")



router.post("/savebanner",upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into cartbanner(bannerstatus,bannerpicture)values ?"
    pool.query(q,[req.files.map((item)=> [req.body.bannerstatus,item.filename])],function(error,result){
    
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




router.get('/displayallbanner',function(req,res){
  pool.query("select * from cartbanner",function(error,result){
    if(error)
    {
      res.status(500).json({result:[]})
    }
    else
    {
      res.status(200).json({result:result})
    
    }
    
      })
    
  })

  router.post('/deletebanner', function(req, res, next) {

    pool.query("delete from  cartbanner  where cartbannerid=?",[req.body.bannerid],function(error,result){
  
      if(error)
      { console.log(error)
        res.status(500).json({result:false,msg:'Server Error'})
      }
      else
      {
       res.status(200).json({result:true,msg:'Deleted'})
       
      }
   
    })
  
  })


module.exports=router;
