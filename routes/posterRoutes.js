const express = require('express');
const { createPoster, getPosters, getPosterById, updatePoster, deletePoster } = require('../controllers/posterController');
const router = express.Router();

router.post('/posters', createPoster);
router.get('/posters', getPosters);
router.get('/posters/:id', getPosterById);
router.put('/posters/:id', updatePoster);
router.delete('/posters/:id', deletePoster);

module.exports = router;
