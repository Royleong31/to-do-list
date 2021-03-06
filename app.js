const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs'); //Use this whenver u use ejs
app.use(express.static('public')); // Used when you want to add local stylesheets
var items = ['wash clothes', 'do laundry'];
let workItems = [];
let day = date.getDate();

app.get('/', function(req, res) {

  res.render('list', {
    kindOfDay: day,
    newListItem: items
  });
});

app.post('/', function(req, res) {
  let item = req.body.newTask;
  
  if (req.body.list === 'Work') {
    workItems.push(req.body.newTask);
    res.redirect('/work');
  } else {
    items.push(req.body.newTask);
    res.redirect('/')
  }
});

app.get('/work', (req, res) => {
  res.render('list', {kindOfDay: 'Work', newListItem: workItems});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});