var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")


router.post('/savebrands',upload.single('icon'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into brands(categoryid,subcategoryid,brandname,status,icon)values(?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.status,req.myfilename],function(error,result){

   if(error)
   { console.log(error)
       res.status(500).json({result:false})
   }
   else
   {
       res.status(200).json({result:true})
   }


  })
});

router.get("/DisplayAll",function(req,res){
    pool.query("select B.*,(select C.categoryname from categories C where C.categoryid=B.categoryid) as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=B.subcategoryid) as subcategoryname from brands B",function(error,result){
      if(error){
        console.log(error)
        res.status(500).json({result:[]})
      }else{
        console.log(result)
        res.status(200).json({result:result,data:result})
      }
    })
  }) 
  router.post('/displayallbrandsbystatus',function(req,res,next){
    pool.query("select * from brands where status=? group by brandname",[req.body.status],function(error,result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

  router.post('/displaybrandbysubcategoryid', function(req,res){
    console.log(req.body)
    pool.query('select * from brands where subcategoryid=?',[req.body.subcategoryid], function(error, result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            
            res.status(200).json({result:result})
        }
    })
})
router.post('/editbrand', function(req, res, next) {

  pool.query("update brands set categoryid=?,subcategoryid=?,brandname=?,status=? where brandid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.status,req.body.brandid],function(error,result){

    if(error)
    { console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else
    {
     res.status(200).json({result:true,msg:'Edited'})
    }
 


  })

})


router.post('/editicon',upload.single("icon"), function(req, res, next) {

  pool.query("update brands set icon=? where brandid=?",[req.myfilename,req.body.brandid],function(error,result){

    if(error)
    { console.log(error)
      res.status(500).json({result:false,msg:'Server Error'})
    }
    else
    {
     res.status(200).json({result:true,msg:'Edited'})
    }
 


  })

})

router.post('/deletebrand', function(req, res, next) {

  pool.query("delete from  brands  where brandid=?",[req.body.brandid],function(error,result){

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

module.exports = router;
