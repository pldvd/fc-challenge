const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');


router.get('/', controllers.show_all);
router.delete('/', controllers.delete_all);
router.get('/key/:key', controllers.show_selected);
router.put('/key/:key', controllers.update_selected);
router.delete('/key/:key', controllers.delete_selected);

module.exports = router;
