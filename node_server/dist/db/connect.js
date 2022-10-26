"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonsCollection = exports.connectToServer = void 0;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
let dbConnection;
const connectToServer = function (callback) {
    client.connect(function (err, db) {
        if (err || !db) {
            return callback && callback(err);
        }
        dbConnection = db.db("frontend-portal");
        console.log("Successfully connected to MongoDB.");
        return callback && callback();
    });
};
exports.connectToServer = connectToServer;
const getDb = function () {
    return dbConnection;
};
const lessonsCollection = () => getDb().collection("lessons");
exports.lessonsCollection = lessonsCollection;
