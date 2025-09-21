import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { VaultController } from './modules/vault/vault.controller';
import { VaultService } from './modules/vault/vault.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, VaultController],
  providers: [AppService, VaultService],
})
export class AppModule {}
