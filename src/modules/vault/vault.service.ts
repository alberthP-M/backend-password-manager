import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VaultService {
  constructor(private prisma: PrismaService) {}

  /**
   * Almacenar un nuevo VaultItem cifrado.
   * @param userId ID del usuario dueño del item
   * @param data Datos cifrados recibidos desde el cliente
   */
  async createVaultItem(
    userId: number,
    data: {
      serviceName: string;
      username: string;
      cipherText: string; // cifrado con AES-256-GCM en el cliente
      notesCipher?: string; // notas cifradas (opcional)
      algorithm?: string; // default AES-256-GCM
    },
  ) {
    if (!data.cipherText || !data.serviceName || !data.username) {
      throw new BadRequestException('Datos incompletos para guardar VaultItem');
    }

    return this.prisma.vaultItem.create({
      data: {
        userId,
        serviceName: data.serviceName,
        username: data.username,
        cipherText: data.cipherText,
        notesCipher: data.notesCipher,
        algorithm: data.algorithm || 'AES-256-GCM',
      },
    });
  }

  /**
   * Obtener todos los VaultItems de un usuario
   */
  async getVaultItems(userId: number) {
    return this.prisma.vaultItem.findMany({
      where: { userId },
      select: {
        id: true,
        serviceName: true,
        username: true,
        cipherText: true,
        notesCipher: true,
        algorithm: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
