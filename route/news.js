const express = require('express')
const newsUpdate = require('../controller/news')
const router = express.Router()

const News = require('../model/info.js')


// router.get('/', (req, res) => {
//     news.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });


router.post('/admin', (req,res,next) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newNews = new News({
                description: req.body.description,
                image: {
                  data: req.file.fileName,
                  contentType: 'image/png'
                }
            })
            newNews.save()
            .then(()=>res.send("successfully upload")).catch((err)=>console.log(err))
        }
    })
})


module.exports = router