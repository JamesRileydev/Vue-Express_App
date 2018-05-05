const stores = require('./data/stores.js');
const _ = require('lodash');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/api/stores', function(req, res){
  var response = [];
  console.log(req.query)

  // this would usually adjust your database query
  if(typeof req.query.nsfw != 'undefined'){
    stores.filter(function(store){
      if(store.nsfw.toString() == req.query.nsfw){
        response.push(store);
      }
    });
  }

  // this would usually adjust your database query
  if(typeof req.query.location != 'undefined'){
    stores.filter(function(store){
      if(store.location === req.query.location){
        response.push(store);
      }
    });
  }

  // de-duplication:
  response = _.uniqBy(response, 'id');

  // in case no filtering has been applied, respond with all stores
  if(Object.keys(req.query).length === 0){
    response = stores;
  }

  res.json(response);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});

