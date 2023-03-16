const express = require('express');
const expbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const port = 3000;
const app = express();
// const input = require('../RS_P1/public/scripts/createTags');
const key = process.env.GOOGLE_API_KEY;
console.log("the key is: ", key);
app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.engine('handlebars', expbs.engine({
  defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})

app.get('/', (req, res) => {


    // console.log(req)
    res.render('index');
})

app.get('/suggestions', (req, res) => {

  res.render('suggestions');
})


app.post('/', (req, res) => {

		res.status(200).json({
      "fromServerInput": req.body.input,
      "fromServerLocation": req.body.location
    });
});

app.post('/suggestions', (req, res) => {

  res.status(200).json({
    "fromServerInput": req.body.input,
    "fromServerLocation": req.body.location
  });  
})