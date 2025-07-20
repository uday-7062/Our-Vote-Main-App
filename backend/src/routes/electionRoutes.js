const express = require('express');
const router = express.Router();
const {
  getAllElections,
  createElection,
  registerForElection,
  unregisterFromElection,
  getNearbyElections
} = require('../controllers/electionController');
const auth = require('../middleware/auth');

router.get('/', getAllElections);
router.post('/', auth, createElection);
router.post('/:id/register', auth, registerForElection);
router.post('/:id/unregister', auth, unregisterFromElection);
router.get('/nearby', getNearbyElections);

module.exports = router; 