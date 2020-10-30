import { config } from 'migrate-mongo';

const initMigration = () => {
  const myConfig = {
    mongodb: {
      url: 'mongodb://localhost:27017',
      databaseName: 'subToMyOnlyfan',
      options: { useNewUrlParser: true },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
  };
  config.set(myConfig);
};

export default initMigration;
