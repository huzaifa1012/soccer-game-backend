import mongoose from "mongoose";
const uri = `mongodb+srv://huzaifanebs:iamNebras@cluster0.sufycak.mongodb.net/soccer_league`;

export async function ConnectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  } finally {
    // await client.close();
  }
}
ConnectDB().catch(console.dir);
