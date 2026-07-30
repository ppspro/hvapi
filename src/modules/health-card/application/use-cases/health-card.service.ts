import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IHealthCardRepository } from '../../domain/repositories/health-card.repository.interface';
import { OnboardHealthCardResponseDto } from '../../presentation/dto/onboard-health-card.dto';
import { VerifyQrDto, VerifyQrResponseDto } from '../../presentation/dto/verify-qr.dto';
import { HealthCardDetailsResponseDto } from '../../presentation/dto/health-card-details.dto';
import { WalletPassResponseDto } from '../../presentation/dto/wallet-pass.dto';
import { Logger } from 'nestjs-pino';
import * as crypto from 'crypto';

@Injectable()
export class HealthCardService {
  constructor(
    @Inject('IHealthCardRepository')
    private readonly healthCardRepository: IHealthCardRepository,
    private readonly logger: Logger,
  ) {}

  async onboardHealthCard(userId: string): Promise<OnboardHealthCardResponseDto> {
    const profile = await this.healthCardRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found. Complete onboarding demographics first.');
    }

    let card = await this.healthCardRepository.findCardByProfileId(profile.id);
    if (!card) {
      // Format: HV360-RAND-HEX-KEYS
      const uniqueSuffix = crypto.randomBytes(6).toString('hex').toUpperCase();
      const cardNumber = `HV360-${uniqueSuffix.slice(0, 4)}-${uniqueSuffix.slice(4, 8)}-${uniqueSuffix.slice(8, 12)}`;
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year validity

      card = await this.healthCardRepository.createCard(profile.id, cardNumber, expiresAt);
      this.logger.log({ msg: 'Health Card generated successfully', cardId: card.id });

      // Generate corresponding secure QR record
      const qrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
      const qrExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days validity
      await this.healthCardRepository.createQr(card.id, qrPayload, qrExpiresAt);
    }

    return {
      cardId: card.id,
      cardNumber: card.cardNumber,
      message: 'Health Card generated successfully during onboarding',
      nextStep: 6,
    };
  }

  async getCardDetails(userId: string): Promise<HealthCardDetailsResponseDto> {
    const profile = await this.healthCardRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const card = await this.healthCardRepository.findCardByProfileId(profile.id);
    if (!card) {
      throw new NotFoundException('Health Card not found for current patient profile');
    }

    const qrRecord = (card as any).healthCardQr;

    return {
      id: card.id,
      cardNumber: card.cardNumber,
      status: card.status,
      issuedAt: card.issuedAt,
      expiresAt: card.expiresAt,
      qrPayload: qrRecord ? qrRecord.encryptedPayload : undefined,
    };
  }

  async verifyQr(verifierUserId: string, dto: VerifyQrDto): Promise<VerifyQrResponseDto> {
    this.logger.log({ msg: 'QR verification request received' });

    const qrWithCard = await this.healthCardRepository.findQrByPayload(dto.qrPayload);
    if (!qrWithCard) {
      throw new NotFoundException('QR Payload signature not found or invalid');
    }

    if (new Date() > new Date(qrWithCard.expiresAt)) {
      await this.healthCardRepository.createVerificationLog(qrWithCard.id, verifierUserId, 'EXPIRED');
      throw new BadRequestException('Verification failed. QR payload has expired.');
    }

    await this.healthCardRepository.createVerificationLog(qrWithCard.id, verifierUserId, 'SUCCESS');
    this.logger.log({ msg: 'QR verification completed successfully' });

    return {
      isValid: true,
      patientName: 'John Doe', // Mocked patient context verification
      cardNumber: qrWithCard.healthCard.cardNumber,
      message: 'QR verification completed successfully',
    };
  }

  async refreshCardQr(userId: string): Promise<HealthCardDetailsResponseDto> {
    const profile = await this.healthCardRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    const card = await this.healthCardRepository.findCardByProfileId(profile.id);
    if (!card) {
      throw new NotFoundException('Health Card not found');
    }

    const newQrPayload = crypto.createHash('sha256').update(card.cardNumber + Date.now()).digest('hex');
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

    await this.healthCardRepository.updateQrPayload(card.id, newQrPayload, newExpiresAt);
    this.logger.log({ msg: 'Monthly refresh completed. Refreshed QR payload generated' });

    return this.getCardDetails(userId);
  }

  async generateWalletPass(userId: string): Promise<WalletPassResponseDto> {
    const profile = await this.healthCardRepository.findProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    this.logger.log({ msg: 'Wallet pass generated request' });

    // Mock PKPass binary content mapping (base64 string represent)
    const mockPkPassContent = Buffer.from('mock-pkpass-binary-content').toString('base64');

    return {
      passPayload: mockPkPassContent,
      mimeType: 'application/vnd.apple.pkpass',
    };
  }
}
