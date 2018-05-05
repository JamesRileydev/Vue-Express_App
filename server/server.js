const stores = require('./data/stores.js');
const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('Hello World!')
});

// app.get('/api/stores', function(req, res){
//   res.json(stores);
// });

app.get('/api/stores', function(req, res){
  var response = [];

  if( typeof req.query.nsfw != 'undefined' ){
    response = stores.filter(function(store){
      if(store.nsfw === true){
        return store;
      }
    });
  } else {
    response = stores;
  }

  res.json(response);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});

