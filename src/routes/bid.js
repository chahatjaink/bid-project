const express = require('express');
const router = express.Router();
const BidController = require('../controllers/bid');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, BidController.placeBid);
router.get('/project/:projectId', authenticate, BidController.getBidsForProject);
router.post('/project/:projectId', authenticate, BidController.assignBidToUser);

module.exports = router;
