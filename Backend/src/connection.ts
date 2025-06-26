import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const connectionString: String | undefined = process.env.MONGO_URL;

    if (!connectionString || typeof connectionString !== "string") {
      console.log("Mongo connection string not found!");
      process.exit(1);
    }

    await mongoose.connect(connectionString);
    console.log("MONGO connected successfully!");
  } catch (err) {
    console.log("Error while connecting mongodb : ", err);
    process.exit();
  }
};

export default mongoConnect;
