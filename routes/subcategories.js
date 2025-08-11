var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")


router.post('/savesubcategories',upload.single('icon'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into subcategories(categoryid,subcategoryname,description,icon)values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.myfilename],function(error,result){

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
    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S",function(error,result){
      if(error){
        console.log(error)
        res.status(500).json({result:[]})
      }else{
        console.log(result)
        res.status(200).json({result:result})
      }
    })
  }) 

  router.post('/displaysubcategorybycategoryid', function(req,res){
    console.log(req.body)
    pool.query('select * from subcategories where categoryid=?',[req.body.categoryid], function(error, result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            
            res.status(200).json({result:result})
        }
    })
})
router.post('/editsubcategory', function(req, res, next) {

  pool.query("update subcategories set categoryid=?,subcategoryname=?, description=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.subcategoryid],function(error,result){

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

  pool.query("update subcategories set icon=? where subcategoryid=?",[req.myfilename,req.body.subcategoryid],function(error,result){

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

router.post('/deletesubcategory', function(req, res, next) {

  pool.query("delete from  subcategories  where subcategoryid=?",[req.body.subcategoryid],function(error,result){

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
