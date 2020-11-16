import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const config = {
    uri: 'mongodb://localhost:27017/node-mongoose',
    options: {
        useNerUrlParser: true,
        useFindAndModify: false
    }
}

mongoose.connection.on('open', () => {
    console.log('Successfuly connected to database')
})

mongoose.connection.on('error', () => {
    console.log('Could not connect to MongoDB')
})

export default {
    connect: () => mongoose.connect(config.uri, config.options)
}