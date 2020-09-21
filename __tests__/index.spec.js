import mongoose from 'mongoose'

beforeAll(async() => {
    await mongoose.connect('mongodb://localhost:27017/devTest', ({
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }), () => console.log('db connected'))
})





afterAll(() => {
    mongoose.disconnect()
})