require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const checkIndexes = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  const indexes = await mongoose.connection.db.collection('users').indexes();
  console.log('Users collection indexes:', JSON.stringify(indexes, null, 2));
  await mongoose.disconnect();
};

checkIndexes();
