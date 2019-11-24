var express = require('express');
var router = express.Router();
var User = require('../models/user');
var multer = require("multer")


var sequelize = require('sequelize');
const Op = sequelize.Op;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index' ,{ title: 'Document Editor' });
});


/* GET LIST OF DOCUMENTS. */
router.get('/service', function (req, res) {
  const start = parseInt(req.query.start)
  const length = parseInt(req.query.length)
  const draw = parseInt(req.query.draw)
  
  let searchText = req.query.search.value;
  // console.log("-------");
  // console.log(searchText);
  // console.log("-------");
  User.findAndCountAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          title: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          bodyContent: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          subjectContent: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          createdAt: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          updatedAt: {
            [Op.like]: '%' + searchText + '%'
          }
        }
      ]
    }

  }).then(function (data) {
    const recordTotal = data.count
    User.findAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: '%' + searchText + '%'
            }
          },
          {
            title: {
              [Op.like]: '%' + searchText + '%'
            }
          },
          {
            bodyContent: {
              [Op.like]: '%' + searchText + '%'
            }
          },
          {
            subjectContent: {
              [Op.like]: '%' + searchText + '%'
            }
          },
          {
            createdAt: {
              [Op.like]: '%' + searchText + '%'
            }
          },
          {
            updatedAt: {
              [Op.like]: '%' + searchText + '%'
            }
          }
        ]
      },
      order: [
        ['updatedAt', 'DESC'],
      ],
      limit: length,
      offset: start

    }).then(function (serviceData) {
     
      if (serviceData) {
        res.json({
          'draw': draw,
          'recordsTotal': recordTotal,
          'recordsFiltered': recordTotal,
          data: serviceData
        })
      } else {
        res.json({
          responseCode: '101',
          resMessage: 'Something Went Wrong',
          data: serviceData
        })
      }
    }).catch(function (err) {
      console.log(err);
      return res.send({
        responseCode: '999',
        responseMessage: 'Internal Server Error'
      })
    })
  }).catch(function (err) {
    console.log(err)
    return res.send({
      responseCode: '999',
      responseMessage: 'Internal Server Error'
    })
  })

})



/* CREATE DOCUMENT */
router.post('/', async (req, res) => {

  var data = JSON.stringify(req.body)
  if (data) {
    var response = await User.create(JSON.parse(data))
  
    return res.json({
      code: 200,
      status: 'success',
      message: 'Added Successfully',
      data: response
    })

  }

});

// UPDATE DOCUMENT
router.put('/:id', async (req, res) => {

  let data = JSON.stringify(req.body)

  let id = req.params.id;
 

  if (data) {
  

    var response = await User.update(JSON.parse(data), {
      where: {
        id: id
      }
    })
    console.log(response.dataValues)
    return res.json({
      code: 200,
      status: 'Success',
      message: 'Document updated successfully',
      data: response
    })

  }

});





var storage = multer.diskStorage({
  destination: function (req, file, cb) {   
    cb(null,'uploads/')
  }

})
var upload = multer({ storage: storage });

// router.post('/upload' ,upload.single('avatar'),function(req, res) {
//   return res.json({
//     code: 200,
//     status: 'Success',
//     message: 'file Uploaded successfully',
    
//   })
 

// });

module.exports = router;
