const Cache = require('../models/cache');

function randomString(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.show_all = function (_, res) {
  Cache.find()
    .then(keys => {
      return keys.length > 0 ? res.status(200).send(keys) : res.status(204).send('No keys are available')
    })
    .catch(err => {
      res.status(400).send(`The following error occured: ${err.message}`)
    });
}

exports.delete_all = function (req, res) {
  //define
}

exports.show_selected = function (req, res) {
  Cache.find({
    key: req.params.key
  })
    .then(cacheEntry => {
      if (cacheEntry.length === 0) {
        console.log('Cache miss');
        const newEntry = new Cache({
          key: randomString(8),
          data: randomString(50)
        })

        return newEntry.save()
          .then(_ => res.status(201).send(newEntry.data))
          .catch(err => res.status(400).send(`The following error occured: ${err.message}`))
      }

      console.log('Cache hit');
      return res.status(200).send(cacheEntry);
    })
    .catch(err => res.status(400).send(`The following error occured: ${err.message}`));
}

exports.update_selected = function (req, res) {
  //define
}

exports.delete_selected = function (req, res) {
  //define
}