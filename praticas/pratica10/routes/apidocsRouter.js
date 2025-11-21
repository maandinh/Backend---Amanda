const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();
const File = fs.readFileSync('swagger.yaml', 'utf8');
const SwaggerDocument = YAML.parse(File);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(SwaggerDocument));

module.exports = router;
