const express = require('express');
const { addPoster, getPosters, getPosterById, updatePoster, deletePoster, searchPosterByTitle, searchPosterByCategory, searchPosterCombined } = require('../controllers/posterController');
const router = express.Router();

router.post('/posters', addPoster);
router.get('/posters', getPosters);
router.get('/posters/:id', getPosterById);
router.put('/posters/:id', updatePoster);
router.delete('/posters/:id', deletePoster);
router.get('/posters/search/title', searchPosterByTitle);
router.get('/posters/search/category', searchPosterByCategory);
router.get('/posters/search/combined', searchPosterCombined);



module.exports = router;
