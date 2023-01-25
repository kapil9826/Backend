const express = require('express')
const fs = require('fs')
const router = require('./route/news')
const News = require('./model/info.js')
let ejs = require('ejs');
const mongoose = require('mongoose')
const multer  = require('multer')
const cors = require('cors')
const { urlencoded } = require('express')


const app = express()

app.use(express.json({limit: '30mb',extended: true}))

app.use(express.urlencoded({limit: '30mb',extended: false}))

app.use(cors())
mongoose.set("strictQuery", false);
const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      
      cb(null, file.originalname )
    }
  })
  
  const upload = multer({ storage: storage }).single('textImage')
app.get('/', (req,res)=>{
    res.send("Admin Panel Api")
})

app.post('/',  (req,res,next) => {
//     var obj = {
//         description: req.body.description,
//         image: {
//             data: req.file.filename,
//             contentType: 'image/png'
//         }
//     }
//     News.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             item.save();
//             res.redirect('/');
//         }
//     });
// })
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

app.set('view engine','ejs'); 

app.engine('ejs', require('ejs').__express);
app.use('/admin', router)


const PORT = process.env.PORT || 5000

const CONNECTION_URL = 'mongodb+srv://kapil98:9826sharma@cluster0.dyky53r.mongodb.net/News?retryWrites=true&w=majority'



mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`)))
.catch((err)=>console.log(err.message))