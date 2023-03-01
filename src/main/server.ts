import { config } from 'dotenv';

import { MongoClient } from '../external/database/mongo';
import app from './config/app';

const main = async () => {
  config();

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.listen(port, () =>
    console.log(`server runnig at: http://localhost:${port}`)
  );
};

main();
