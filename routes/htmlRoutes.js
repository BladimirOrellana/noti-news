const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const databaseUrl = "noti_news_db";
const collections = ["food_posts"];
var db = require('./../models');
const chalk = require('chalk');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/noti_news";

mongoose.connect(MONGODB_URI);

module.exports = function(app){

    app.get('/',(req,res)=>{

        res.render("index");
        
          
    })
 
    app.get('/save/:id',(req,res)=>{
        console.log("K")
console.log(req.params.id)
        db.Food.find({_id: req.params.id}).then((result)=>{
           var savePost = {
               title: result[0].title,
               link: result[0].link,
               photo: result[0].photo
           }
           console.log(savePost)
           db.Save.create(savePost).then((result)=>{
               
           })
           
        })
        
          
    }) 
    app.get('/delete/:id',(req,res)=>{
        console.log(req.params.id)
               
                db.Save.deleteOne({ _id: req.params.id }).then((result)=>{
                    res.json(result.ok)

                });
            }) 
//Delete post route
            app.get('/delete/comment/:commentId',(req,res)=>{
                 db.Comment.deleteOne({ _id: req.params.commentId }).then((result)=>{
                            console.log(result.ok)
                            res.json(result)
        
                        });
                    }) 
//COOMENT ROUTE
            app.get('/comment/:id',(req,res)=>{
                console.log(req.params.id)
                       
                        db.Save.findOne({ _id: req.params.id }).populate('comment')
                        .then((result)=>{
                            res.json(result)
        
                        }).catch(function(err) {
                            // If an error occurred, send it to the client
                            res.json(err);
                          });
                    }) 
                    //SAVE  POST COOMENT
                    app.post('/comment/:id',(req,res)=>{
                        req.baseUrl.new = true;
                  if(req.body.title && req.body.body){
                    db.Comment.create(req.body)
                    .then((result)=>{
                        return db.Save.findByIdAndUpdate({_id: req.params.id},{comment: result._id}, {new: true})
    
                    }).then(function(result) {
                        // If we were able to successfully update an Article, send it back to the client
                        if(result){
                            const saved = 1
                            res.json(saved)
                        }else{
                            const saved = 0
                            res.json(saved)
                        }
                      }).catch(function(err) {
                        // If an error occurred, send it to the client
                        res.json(err);
                      });
                   }else{
                    const saved = 0
                    res.json(saved)
                    console.log(saved)
                   }
                            }) 
          
    
//SCRAPE BY SECTION NAME
//THIS ACTION COMES FROM THE INDEX PAGE WHEN USER CLICKS A BUTTON IN THE HEADER DIV
    app.get('/:section',(req,res)=>{
const search = req.params.section;
 scrapeSearch(search)

switch(search){
    case "food":
        db.Food.find({}).then((result)=>{
            res.render('food',{data: result});

        })
        
        break;
   
    default:
            res.render('index');
            break;
}
 

         
    })


}














//This is call in the /:section route 
const scrapeSearch = function(search){
    axios.get("https://www.nytimes.com/section/"+search).then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function(i, element) {
          
    // Add the text and href of every link, and save them as properties of the result object
         const  result = { 
         title: $(element).find(".headline").text().replace(/\s\s+/g, '') || $(element).find("h2").text().replace(/\s\s+/g, ''),
         link: $(element).find("a").attr("href"),
         photo: $(element).find("img").attr("src")
         }
        

       console.log(result)
        
         

if(result.title && result.link && result.photo){

    db.Food.create(result).then(function(result){
    
    }).catch(function(err){
        console.log(err)   
    })
    
    db.All.create(result).then(function(result){
        
    }).catch(function(err){
        console.log(err)   
        
    })

}


        });
    
        
        
      });
}
  
    
        