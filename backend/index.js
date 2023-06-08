const express = require('express');
const mongodb = require("./db");
const cors = require('cors')
const bodyParser = require('body-parser');
const sendemail = require('./utils/sendemail');
const port = 5000;

const app = express();

/*app.use((req, res ,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type ,Accept"
        );
        next();
    })*/
    
    
app.use(cors());
app.use(bodyParser.json());


app.use(express.json())
app.use('/api' , require('./routes/CreateUser'));
app.use('/api' , require('./routes/DisplayData'));
app.use('/api' , require('./routes/OrderData'));
//app.get('/mail' , sendemail );
app.listen(port , ()=>{
    console.log(`app listening on ${port}` )
})


