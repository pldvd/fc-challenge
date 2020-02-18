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
  Cache.deleteMany()
  .then(deleted => {
    if (deleted.ok === 1) {
      res.status(200).send('Cache has been deleted');
      return;
    }
    if (deleted.n !== deleted.deletedCount) {
      res.status(400).send('The request could not be fully completed');
      return;
    }
  })
  .catch(err => res.status(400).send(`The following error occured: ${err.message}`));
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

        newEntry.save()
          .then(_ => {
            res.status(201).send(newEntry.data);
            return;
          })
          .catch(err => res.status(400).send(`The following error occured: ${err.message}`));

      }

      console.log('Cache hit');
      res.status(200).send(cacheEntry);
    })
    .catch(err => res.status(400).send(`The following error occured: ${err.message}`));
}

exports.update_selected = function (req, res) {

  const newValues = Object.assign(req.body, { updatedAt: Date.now(), ttl: Date.now() +  86400 })

  Cache.findOneAndUpdate({ key: req.params.key }, newValues)
    .then(cacheEntry => {
      if (cacheEntry) {
        res.status(200).send(`Item with key ${req.params.key} was updated`);
        return;
      }
      res.status(404).send(`Item with key ${req.params.key} was not found`);
    })
    .catch(err => res.status(400).send(`The following error occured: ${err.message}`));
}


exports.delete_selected = function (req, res) {
  Cache.findOneAndDelete({
    key: req.params.key
  })
    .then(deletedItem => {
      if (deletedItem) {
        res.status(200).send(`Item with key ${req.params.key} deleted`);
        return;
      }
      res.status(404).send('Item not found');
    })
    .catch(err => res.status(400).send(`The following error occured: ${err.message}`));
}
