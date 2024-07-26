const StackHolderProfile = require("../models/stack_holder_profile.model");

const createStackHolderProfile = async (req, res) => {
    try {
       const stackHolderProfile =  await StackHolderProfile.create(req.body);
       res.status(201).json(stackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getStackHolderProfiles = async (req, res) => {
    try {
        const stackHolderProfiles = await StackHolderProfile.find({});
        res.status(200).json(stackHolderProfiles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getStackHolderProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const stackHolderProfile = await StackHolderProfile.findById(id);
        res.status(200).json(stackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateStackHolderProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const stackHolderProfile = await StackHolderProfile.findByIdAndUpdate(id, req.body);
        if(!stackHolderProfile) {
            return res.status(404).json({message: 'Stack Holder Profile not found'});
        }
        const updatedStackHolderProfile =  await StackHolderProfile.findById(id);
        res.status(200).json(updatedStackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteStackHolderProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const stackHolderProfile = await StackHolderProfile.findByIdAndDelete(id);
        if(!stackHolderProfile) {
            return res.status(404).json({message: 'Stack Holder Profile not found'});
        }
        res.status(200).json({message: 'Stack Holder Profile deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const uploadDocumentStackHolderProfile = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).json({message: 'Please upload a file!'});           
        }
        const {id} = req.params;
        const stackHolderProfile = await StackHolderProfile.findById(id);

        if(!stackHolderProfile) {
            return res.status(404).json({message: 'Stack Holder Profile not found'});
        }

        if(stackHolderProfile.documents == undefined || stackHolderProfile.documents == null) {
            stackHolderProfile.documents = [];
        }
        
        stackHolderProfile.documents.push({
            title: req.body.title,
            url: req.file.filename
        });

        await StackHolderProfile.findByIdAndUpdate(id, stackHolderProfile);
        const updatedStackHolderProfile =  await StackHolderProfile.findById(id);
        res.status(200).json(updatedStackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const downloadDocumentStackHolderProfile = async (req, res) => {
    try {
        const {id, documentId} = req.params;
        const stackHolderProfile = await StackHolderProfile.findById(id);

        if(!stackHolderProfile) {
            return res.status(404).json({message: 'Stack Holder Profile not found'});
        }

        if(stackHolderProfile.documents == undefined || stackHolderProfile.documents == null) {
            return res.status(404).json({message: 'No documents found'});
        }

        const document = stackHolderProfile.documents.find(doc => doc._id.toString() === documentId);

        if(!document) {
            return res.status(404).json({message: 'Document not found'});
        }
        
        res.download(`./files/${document.url}`, document.url);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addStackHolderProfileCertificate = async (req, res) => {
    try {
        const {id} = req.params;
        const {certifiedAt, expiredAt, certificateType} = req.body;
        const stackHolderProfile = await StackHolderProfile.findById(id);

        stackHolderProfile.certificate = {certifiedAt, expiredAt, certificateType};

        await StackHolderProfile.findByIdAndUpdate(id, stackHolderProfile);
        const updatedStackHolderProfile =  await StackHolderProfile.findById(id);

        res.status(200).json(updatedStackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const addStackHolderProfileProjects = async (req, res) => {
    try {
        const {id} = req.params;
        const {projects} = req.body;
        const stackHolderProfile = await StackHolderProfile.findById(id);

        stackHolderProfile.projects = projects;

        await StackHolderProfile.findByIdAndUpdate(id, stackHolderProfile);
        const updatedStackHolderProfile =  await StackHolderProfile.findById(id);

        res.status(200).json(updatedStackHolderProfile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createStackHolderProfile,
    getStackHolderProfiles,
    getStackHolderProfile,
    updateStackHolderProfile,
    deleteStackHolderProfile,
    uploadDocumentStackHolderProfile,
    downloadDocumentStackHolderProfile,
    addStackHolderProfileCertificate,
    addStackHolderProfileProjects
}