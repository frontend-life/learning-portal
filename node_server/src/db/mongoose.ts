import mongoose, { ConnectOptions } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/frontend-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions);