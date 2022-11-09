"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCol = exports.tracksCol = exports.lessonsCollection = exports.connectToServer = void 0;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MODE === "dev"
    ? "mongodb://localhost:27017"
    : `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`;
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
        console.log("Successfully connected to MongoDB 11.");
        return callback && callback();
    });
};
exports.connectToServer = connectToServer;
const getDb = function () {
    return dbConnection;
};
const lessonsCollection = () => getDb().collection("lessons");
exports.lessonsCollection = lessonsCollection;
const tracksCol = () => getDb().collection("tracks");
exports.tracksCol = tracksCol;
const usersCol = () => getDb().collection("users");
exports.usersCol = usersCol;
