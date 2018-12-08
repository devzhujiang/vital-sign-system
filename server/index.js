const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.url.startsWith('/')) {
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

app.listen("9000",function(){
    console.log("open Browser http://localhost:9000");
});
