import { connect } from 'mongoose';

export const initDb = async () => {
  await connect(process.env.MONGO_URL, {
    dbName: 'auth-test-app-data'
  });
};
