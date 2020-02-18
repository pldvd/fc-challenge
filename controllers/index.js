const Cache = require('../models/cache');

exports.show_all = function (_, res) {
  Cache.find()
    .then(keys => {
      return keys.length > 0 ? res.status(200).send(keys) : res.status(204).send('No keys are available')
    })
    .catch(err => {
      res.status(400).send(`The following error occured: ${err.message}`)
    });

exports.delete_all = function (req, res) {
  //define
}

exports.show_selected = function (req, res) {
  //define 
}

exports.update_selected = function (req, res) {
  //define
}

exports.delete_selected = function (req, res) {
  //define
}