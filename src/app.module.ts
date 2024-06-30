import { Module } from '@nestjs/common';
import { HealthModule } from '@/modules/health/health.module';
import { AuthenticationModule } from '@/modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import envs from '@/config/env';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '@/modules/task/tasks.service';

@Module({
  imports: [
    HealthModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [envs],
    }),
    ScheduleModule.forRoot()
  ],
  providers: [TasksService],
})
export class AppModule {}
