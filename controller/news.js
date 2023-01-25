const News = require('../model/info.js')


 const newsUpdate = (req,res,next) => {
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
}

module.exports = {
    newsUpdate
}

