import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT') || '5432'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],

  synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
});
