
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '01051998',
        database: 'task-manager',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
