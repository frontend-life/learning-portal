const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  process.env.MODE === "dev"
    ? "mongodb://localhost:27017"
    : `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let dbConnection;

export const connectToServer = function (callback?: any) {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback && callback(err);
    }

    dbConnection = db.db("frontend-portal");
    console.log("Successfully connected to MongoDB.");

    return callback && callback();
  });
};

const getDb = function () {
  return dbConnection;
};

export const lessonsCollection = () => getDb().collection("lessons");
