import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { VaultService } from './vault.service';

@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post(':userId')
  async addVaultItem(
    @Param('userId') userId: number,
    @Body()
    body: {
      serviceName: string;
      username: string;
      cipherText: string;
      notesCipher?: string;
      algorithm?: string;
    },
  ) {
    return this.vaultService.createVaultItem(userId, body);
  }

  @Get(':userId')
  async listVaultItems(
    @Param('userId') userId: number,
    @Query('algorithm') algorithm: string,
  ) {
    return this.vaultService.getVaultItems(userId, algorithm);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: number) {
    return this.vaultService.delete(userId);
  }
}
