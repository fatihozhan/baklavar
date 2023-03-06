import mongoose from "mongoose";
const connection = {};


//Database bir bağlantı sağlamadan önce bir bağlantı var mı kontrol edip ondan sonra yeni bağlantı sağlıyoruz daha sonrasında da yeniden  yeniden bağlantı sağlamamak için açtığımız bağlantıyı kaydediyoruz ve onun üzerinden yeni bağlantılar oluşturuyoruz.
async function connectDb() {
     if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
     }
     if (mongoose.connection.length > 0) {
        connection.isConnected = mongoose.connection[0].readyState;
        if (connection.isConnected ===1) {
            console.log("Use previous connetion to the database.");
            return;
        }
        await mongoose.disconnect();
     }
     mongoose.set('strictQuery', false);
     const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true
     });
     console.log("New connection to the database.");
     connection.isConnected = db.connections[0].readyState;
}

//Eğer production modda isek database connection işleminden sonra bağlantıyı kapatıyoruz ki databasede bağlantı sürekli açık kalarak sistemi yormasın.
async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV ==="production") {
            mongoose.disconnect();
            connection.isConnected = false;
        }else {
            console.log("Not disconnecting from the database.");
        }
    }
}

const db = {connectDb, disconnectDb};
export default db;