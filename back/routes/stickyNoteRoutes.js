const express = require('express');
const router = express.Router();
const { createStickyNote, editStickyNote, deleteStickyNote } = require('../controllers/stickyNotesController');


router.post('/', createStickyNote);
router.put('/:id', editStickyNote);
router.delete('/:id', deleteStickyNote);

module.exports = router;
