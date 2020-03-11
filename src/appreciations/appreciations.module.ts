import { Module } from '@nestjs/common';
import { AppreciationsService } from './appreciations.service';

@Module({
  providers: [AppreciationsService],
  exports: [AppreciationsService],
})
export class AppreciationsModule {}