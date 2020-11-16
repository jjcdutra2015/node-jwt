import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    name: String,
    role: String,
    username: String,
    password: String
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id,
            delete ret._id
        }
    },
    versionKey: false
})

const UsersModel = Mongoose.model('Users', schema)

export default UsersModel