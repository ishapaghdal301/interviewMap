const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/', testController.getAllTests);
router.get('/:id', testController.getTestById);
router.post('/add-test', testController.createTest);
router.post('/:id/add-problem', testController.addProblem);

module.exports = router;
