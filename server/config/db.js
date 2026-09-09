const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ No MongoDB URI found. Set MONGODB_URI in server/.env');
    console.error('   Example: MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/campus2career');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Required for Atlas (TLS/SRV connections)
      serverSelectionTimeoutMS: 10000,   // fail fast instead of hanging 30s
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    const host = conn.connection.host;
    const isAtlas = host.includes('mongodb.net');
    console.log(`✅ MongoDB Connected: ${host} ${isAtlas ? '(Atlas ☁️)' : '(Local 🖥️)'}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('   → Local MongoDB is not running. Start it or use MongoDB Atlas.');
    } else if (error.message.includes('authentication failed')) {
      console.error('   → Atlas authentication failed. Check username/password in MONGODB_URI.');
    } else if (error.message.includes('network')) {
      console.error('   → Network error. Check Atlas IP whitelist (allow 0.0.0.0/0 for Render).');
    } else if (error.message.includes('timed out') || error.message.includes('buffering')) {
      console.error('   → Connection timed out. Verify MONGODB_URI and Atlas Network Access settings.');
    }

    process.exit(1);   // hard fail on startup so the issue is obvious
  }
};

// Log Mongoose connection events for debugging
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Reconnecting...');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
});

module.exports = connectDB;
