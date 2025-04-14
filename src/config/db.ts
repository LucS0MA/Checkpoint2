import { Country } from '../entities/Country'
import { DataSource } from 'typeorm'

export const dataCheckPoint = new DataSource({
    type: 'sqlite',
    database: './dataCheckPoint.sqlite',
    synchronize: true,
    logging: true,
    entities: [Country],
    migrations: ['src/migrations/*.ts'],
})
