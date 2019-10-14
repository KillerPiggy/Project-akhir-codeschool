const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

// model
const {Shoes} = require('../models/shoes')

// image path
var imagepath = 'tmp/my-uploads/'
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagepath)
  },
  filename: function (req, file, cb) {
    var extension = file.originalname.substr(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + extension)
  }
})
var upload = multer({ storage: storage })

// Insert shoes
router.post('/insert', upload.single('image'), function (req, res) {
  try {
    var img = req.file.filename

    var myobj = { 
      // id: req.body.id,
      title: req.body.title,
      brand: req.body.brand,
      description: req.body.description,
      image: img,
      price: req.body.price,
      featured: req.body.featured,
      color: req.body.color,
      date: Date.now()
      
    }
    const shoes = new Shoes(myobj)
    shoes.save()
    res.send("1 document inserted")
  } catch (error) {
    res.status(400).send('Error')
    // console.log(error)
  }
})

// Find One
router.get('/findOne/:id', async function (req, res) {
  try {
    const id = req.params.id
    var filter = {
      _id: id
    }
    const shoes = await Shoes.findOne(filter)
    shoes.image = 'http://localhost:3000/img/' + shoes.image
    res.send(shoes)
  } catch (error) {
    res.status(400).send('Error')
    // console.log('Ada error')
  }
})

// Find All
// router.get('/findAll', async function (req, res) {
//   try {
//     const customers = await Customers.find({})
//     const customerData = []
//     if (customers) {
//       for (var index in customers) {
//         customerData.push({
//           _id: customers[index]._id,
//           name: customers[index].name,
//           address: customers[index].address,
//           image: 'http://localhost:3000/img/' + customers[index].image
//         })
//       }
//     }
//     res.send(customerData)
//   } catch (error) {
//     res.status(400).send('Error')
//     // console.log('Ada error')
//   }
// })

// Find All + Filter
router.get('/findAllFilter', async function (req, res) {
  try {
    var filter = {
      featured: req.body.featured
    }
    const shoes = await Shoes.find(filter)
    res.send(shoes)
  } catch (error) {
    console.log('Error')
  }
})

// Delete One
router.delete('/deleteOne/:id', async function (req, res) {
  try {
    var myquery = {
      _id: req.params.id
    }

    var shoes = await Shoes.findOne({
      _id: req.params.id
    })
    if (shoes) {
      //hapus image
      fs.unlink(imagepath + shoes.image, (err) => {
        if (err) throw err;
        console.log('image was deleted');
      });
    }

    await Shoes.deleteOne(myquery)
    res.send('1 document deleted')
  } catch (error) {
    console.log('Error')
  }
})

// Delete Many
// router.get('/deleteMany', async function (req, res) {
//   try {
//     var myquery = {
//       name: 'Highway 37 2'
//     }
//     var result = await Customers.deleteMany(myquery)
//     res.send(result)
//     res.send(result.n + ' document(s) deleted')
//   } catch (error) {
//     console.log('Error')
//   }
// })

// Update One
router.patch('/updateOne/:id', upload.single('image'), async function (req, res) {
  try {
    var myquery = {
      _id: req.params.id
    }
    var img = req.file.filename
    var newvalues = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: img,
        price: req.body.price,
        featured: req.body.featured
      } 
    }
     
    var shoes = await Shoes.findOne({
      _id: req.params.id
    })
    if (shoes) {
      //hapus image
      fs.unlink(imagepath + shoes.image, (err) => {
        if (err) throw err;
        console.log('image was update');
      });
    }

    var result = await Shoes.updateOne(myquery, newvalues)
    res.send('1 document updated')
  } catch (error) {
    console.log('Error')
  }
})

// Update Many
// router.get('/updateMany', async function (req, res) {
//   try {
//     var myquery = {
//       name: 'Highway 37 2'
//     }
//     var newvalues = {
//       $set: {
//         name: 'Mickey'
//       } 
//     }
//     var result = await Customers.updateOne(myquery, newvalues)
//     // res.send('1 document updated')
//     res.send(resDB.result.nModified + " document(s) updated")
//   } catch (error) {
//     console.log('Error')
//   }
// })

// show data + featured
router.get('/findAll', async function (req, res) {
  try {
    const shoes = await Shoes.find({})
    const shoesData = []
    if (shoes) {
      for (var index in shoes) {
        shoesData.push({
          id: shoes[index]._id,
          title: shoes[index].title,
          brand: shoes[index].brand,
          description: shoes[index].description,
          image: 'http://localhost:3000/img/' + shoes[index].image,
          price: shoes[index].price,
          featured: shoes[index].featured,
          color: shoes[index].color,
          date: shoes[index].date
        })
      }
    }
    res.send(shoesData)
  } catch (error) {
    res.status(400).send('Error')
    // console.log('Ada error')
  }
})


module.exports = router