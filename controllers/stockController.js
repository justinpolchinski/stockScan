const db = require("../models");

// Defining methods for the StocksController
module.exports = {
  // findAll: function(req, res) {
  //   db.Stock
  //     .findOne({userName: req.body.userName, password: req.body.password},function(err,doc){

  //     }
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  
  signIn: function(req,res){
    console.log("controller signIn hit");
    console.log(req.body);
    db.Stock.findOne({userName: req.body.userName, password: req.body.password}, function(err,doc){
    console.log("Doc %O",doc)})
      .then(dbModel=>res.json(dbModel)) 
      .catch(err => res.status(422).json(err));
    
  },
  findById: function(req, res) {
    console.log("find by Id");
    db.Stock
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("controller create hit")
    
    db.Stock.findOne({userName: req.body.userName, password: req.body.password}, function(err,doc){
      console.log(req.body);
      if(err){console.log(err)}
      if(doc!=null){
        console.log("User Exists");
        return res.send("User Exists");
      }
      else{db.Stock
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      }
    });
    
    
  },
  update: function(req, res) {
    console.log("update %O", req.body);
    console.log(req.params.id);
    db.Stock 
      .findOneAndUpdate({ _id: req.params.id }, {$push: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("controller remove");
    console.log("update %O", req.body);
    db.Stock
      .findOneAndUpdate({ _id: req.params.id },{Symbol: req.body})
      
      .then(dbModel =>{
        
        console.log(dbModel); 
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  }
};
