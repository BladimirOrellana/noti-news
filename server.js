require('dotenv').config();
var $ = require('jquery')
const express = require('express');
const axious = require('axios')
const xhandlebars = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', xhandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require('./routes/htmlRoutes')(app)
require('./routes/apiRoutes')(app)



app.listen(PORT, ()=>{
    console.log("APP On PORT ", PORT)
})



