import mongoose, { ConnectOptions } from "mongoose";

const url =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/frontend-portal";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
