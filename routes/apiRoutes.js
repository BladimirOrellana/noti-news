const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const databaseUrl = "noti_news_db";
const collections = ["food_posts"];
var db = require('./../models');
mongoose.connect("mongodb://localhost/noti_news", { useNewUrlParser: true });



module.exports = function(app){
    app.get('/api/food/posts',(req,res)=>{
     db.Food.find().then(function(result){
         res.json(result)
     })
    })

    app.get('/api/all/posts',(req,res)=>{
        db.All.find().then(function(result){
            res.json(result)
        })
       })
       app.get('/api/saved/posts',(req,res)=>{
        db.Save.find({}).then(function(result){
            if(result.length === 0){
                res.json(result.length)
             
            }else{
             
                res.json(result)
           
            }
        })
       })

       app.get('/api/comments/:postId',(req,res)=>{
          
        db.Save.find({_id: req.params.postId}).then(function(result){
           
            db.Comment.findOne({_id: result[0].comment}).then(function(result){

res.json(result)
            })
        })
       })
       
}