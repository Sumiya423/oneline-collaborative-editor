const express = require('express');
const router = express.Router();
const {createWorkspace, editWorkspace, getWorkspaces, getWorkspaceByID} = require('../controllers/workSpaceController');

// @route   POST api/workspace
// @desc    Create new workspace
// @access  Private
router.post('/', createWorkspace);
router.put('/:id', editWorkspace);
router.get('/', getWorkspaces);
router.get('/:id', getWorkspaceByID);

module.exports = router;
