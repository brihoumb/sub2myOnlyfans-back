import { Router } from 'express';
import { migrateUp, migrateDown, migrationGet } from '../api/migration';

const migrationRouter = Router();

migrationRouter.patch('/up', migrateUp);
migrationRouter.patch('/down', migrateDown);
migrationRouter.get('/', migrationGet);

export default migrationRouter;
