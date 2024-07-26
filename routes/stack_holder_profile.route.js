const express = require('express');
const { getStackHolderProfiles, 
    getStackHolderProfile, 
    createStackHolderProfile, 
    updateStackHolderProfile, 
    deleteStackHolderProfile,
    uploadDocumentStackHolderProfile,
    downloadDocumentStackHolderProfile,
    addStackHolderProfileCertificate,
    addStackHolderProfileProjects
} = require('../controllers/stack_holder_profile.controller');
const { upload } = require('../config/multer');
const router = express.Router();

router.post('/', createStackHolderProfile);
router.get('/', getStackHolderProfiles);
router.get('/:id', getStackHolderProfile);
router.put('/:id', updateStackHolderProfile);
router.post('/upload/:id', upload.single('file'), uploadDocumentStackHolderProfile);
router.get('/download/:id/:documentId', downloadDocumentStackHolderProfile);
router.delete('/:id', deleteStackHolderProfile);
router.post('/certificate/:id', addStackHolderProfileCertificate);
router.post('/projects/:id', addStackHolderProfileProjects);

module.exports = router