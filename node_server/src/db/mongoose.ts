import mongoose, { ConnectOptions } from "mongoose";
import { isProd } from "../utils";

const url = isProd()
  ? `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`
  : "mongodb://localhost:27017/frontend-portal";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
