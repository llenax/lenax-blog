import mongoose from "mongoose";

const connection = {};

const dbConnect = async () => {
  if (!connection.isConnected) {
    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
  }
};

export default dbConnect;
