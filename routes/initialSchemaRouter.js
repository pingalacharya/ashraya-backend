const express = require('express');
const schemaController = require('./../controllers/initialSchemaController');
const router = express.Router();

router.route('/').get(schemaController.createSchema);

module.exports = router;
