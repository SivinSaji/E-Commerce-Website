var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:'redmi Note 10',
      category:'Mobile',
      description:'This is a good phone',
      image:'https://i1.wp.com/www.pdevice.com/wp-content/uploads/2020/05/Xiaomi-Redmi-Note-10-450x450.jpg'
    },
    {
      name:'Samsung Galaxy M51',
      category:'Mobile',
      description:'This is a good phone',
      image:'data:image/jpeg;base64,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'
    },
    {
      name:'OnePlus Nord N10',
      category:'Mobile',
      description:'This is a good phone',
      image:'data:image/jpeg;base64,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'
    },
    {
      name:'iPhone 12 pro',
      category:'Mobile',
      description:'This is a good phone',
      image:'data:image/jpeg;base64,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'
    }
  ]
  res.render('admin/view-products',{admin:true,products});
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
   productHelpers.addProduct(req.body,(id)=>{
  
    let image=req.files.Image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
      }else{
        console.log(err);
      }
    })
  res.render('admin/add-product')
  })
})
module.exports = router;
