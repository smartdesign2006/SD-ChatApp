const mongoose = require('mongoose')

const SiteSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        required: [true, 'Name is required.'],
        minlength: [4, 'Name too short. Minimum is 4 symbols.'],
        maxlength: [50, 'Name too long. Maximum is 50 symbols.']
    },
    description: {
        type: String,
        default: '',
        maxlength: [100, 'Description too long. Maximum is 100 symbols.']
    },
    logo: {
        type: String
    },
    creator: {
        type: 'ObjectId',
        ref: 'User',
        required: true
    },
    open: {
        type: Boolean,
        default: false
    },
    invitations: [{
        type: 'ObjectId',
        ref: 'User'
    }],
    requests: [{
        type: 'ObjectId',
        ref: 'User'
    }]
}, {
    timestamps: {
        updatedAt: false
    }
})

module.exports = mongoose.model('Site', SiteSchema)