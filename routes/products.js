var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")


router.post('/saveproduct',upload.single('picture'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into products(categoryid,subcategoryid,brandid,productname,description,price,offerprice,offertype,stock,status,salestatus,rating,picture)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salestatus,req.body.rating,req.myfilename],function(error,result){
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
    pool.query("select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid) as brandname from Products P",function(error,result){
      if(error){
        console.log(error)
        res.status(500).json({result:[]})
      }else{
        console.log(result)
        res.status(200).json({result:result})
      }
    })
  }) 
  router.post('/editproduct', function(req, res, next) {

    pool.query("update products set categoryid=?,subcategoryid=?,brandid=?,productname=?,description=?,price=?,offerprice=?,offertype=?,stock=?,status=?,salestatus=?,rating=? where productid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salestatus,req.body.rating,req.body.productid],function(error,result){
  
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
  
  
  router.post('/editicon',upload.single("picture"), function(req, res, next) {
  
    pool.query("update products set picture=? where productid=?",[req.myfilename,req.body.productid],function(error,result){
  
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
  
  router.post('/deleteproduct', function(req, res, next) {

    pool.query("delete from  Products  where productid=?",[req.body.productid],function(error,result){
  
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

  router.post('/displaydevicebystatus',function(req,res,next){
    pool.query("select * from products where status=? and categoryid=? group by productname",[req.body.status,req.body.categoryid],function(error,result){
      if(error){
      res.status(500).json({result:[]})
      }

      else
      {
        res.status(200).json({result:result})
      }
    })
  })
  router.post('/displayproductbybrandid', function(req,res){
    console.log(req.body)
    pool.query('select * from products where brandid=? and subcategoryid=?',[req.body.brandid,req.body.subcategoryid], function(error, result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            
            res.status(200).json({result:result})
        }
    })
})

router.post("/displayallproducttrending", function (req, res, next) {
  pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select productname from products Po where Po.productid=P.productid) as productname from products P where P.status='Trending'", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {

      res.status(200).json({ data: result });
    }
  });
});


router.post("/displayallproductsbycategoryid", function (req, res, next) {
  pool.query(
    "select P.*,(select C.categoryname from categories C where C.categoryid=P.categoryid)as categoryname,(select S.subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid)as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid)as brandname from products P where P.categoryid=?",[req.body.categoryid],
    function (error, result) {
      if (error) {
        res.status(500).json({ result: [] });
      } else {
        res.status(200).json({ result: result });
      }
    }
  );
});


module.exports = router;