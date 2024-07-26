const mongoose = require('mongoose');

const StackHolderProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    city: String,
    country: String,
    role: String,
    documents: [
        {
            title: String,
            url: String,
        }
    ],
    certificate: {
        certifiedAt: Date,
        expiredAt: Date,
        certificateType: String
    },
    projects: [
        {
            name: String,
            description: String,
            budget: Number,
            startDate: Date,
            endDate: Date,
            status: String,
            latitude: String,
            longitude: String,
            subProjects: [
                {
                    name: String,
                    description: String,
                    budget: Number,
                    startDate: Date,
                    endDate: Date,
                    status: String,
                    latitude: String,
                    longitude: String
                }
            ]
        }
    ]
},
{
    timestamps: true
}
);

const StackHolderProfile = mongoose.model('StackHolderProfile', StackHolderProfileSchema);

module.exports = StackHolderProfile;