const mongojs = require('mongojs');
const cheerio = require('cheerio');
const axios = require('axios');

axios.get("https://www.nytimes.com/section/technology").then((response)=>{
    const $ = cheerio.load(response.data);
    var cont = 0;

    //MAIN CONTENT
    $("ol").each((i, element)=>{
        cont++;
        const title = $(element).find("h2.e1xfvim30").text();
        const link = $(element).find("figure a").attr("href")
        var photo = $(element).find("figure img").attr("src")
        const postData = {
                    title: title,
                     link: "https://www.nytimes.com"+link,
                     photo: photo
                    }
        console.log("DATA ",cont ,"  ",postData)
        

    //    if(title && link && photo){
    //     const postData = {
    //         title: title,
    //          link: link,
    //          photo: photo
    //         };
    //         db.food_posts.insert(postData)

    // console.log("DATA ",cont ,"  ",postData)
    //    }
       
    })
    })







//FOOD SECTION CODE

// axios.get("https://www.nytimes.com/section/food").then((response)=>{
//     const $ = cheerio.load(response.data);
//     var cont = 0;
//     $(".theme-summary").each((i, element)=>{
//         cont++;
//         const title = $(element).find(".headline").text().replace(/\s\s+/g, "");
//         const link = $(element).find("figure a").attr("href")
//         var photo = $(element).find("figure img").attr("src")
      
        

//        if(title && link && photo){
//         const postData = {
//             title: title,
//              link: link,
//              photo: photo
//             };
//             db.food_posts.insert(postData)

//     console.log("DATA ",cont ,"  ",postData)
//        }
       
//     })
//     })