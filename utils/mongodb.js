import mongoose from "mongoose";

const connection = {};

const URI =
  "mongodb+srv://dbLenax:" +
  process.env.DB_PASSWORD +
  "@lnx.1rdhz.mongodb.net/lnx?retryWrites=true&w=majority";

const dbConnect = async () => {
  if (!connection.isConnected) {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
  }
};

export default dbConnect;
