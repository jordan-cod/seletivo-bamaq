import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
