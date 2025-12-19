import { ISeedAdmin } from '../application/interface/useCases/admin/ISeedAdmin';
import { ILoggerService } from '../application/interface/common/ILoggerService';
import { IHashService } from '../application/interface/useCases/user/IHashService';
import { DbConnection } from '../config/mongoose/DbConnection';
import { IUserRepository } from '../domain/repositories/user/IUserRepository';

import { UserRegisterDTO } from '../application/DTOs/user/RegisterUserDTO';
import { UserEntity } from '../domain/entities/User';
import { KycStatus } from '../infrastructure/db/models/user/UserModel';
import { ENV } from '../infrastructure/config/common/env';

export class SeedAdmin implements ISeedAdmin {
  private name: string;
  private email: string;
  private password: string;

  constructor(
    private _userRepo: IUserRepository,
    private _hashService: IHashService,
    private _logger: ILoggerService
  ) {
    this.name = ENV.ADMIN_NAME || '';
    this.email = ENV.ADMIN_EMAIL || '';
    this.password = ENV.ADMIN_PASSWORD || '';
  }

  async execute() {
    try {
      await DbConnection.connect();
      const existingAdmin = await this._userRepo.verifyUser(this.email);
      if (existingAdmin?.role === 'admin') {
        this._logger.info(`Admin already exists: ${existingAdmin.email}`);
        return;
      }
      console.log('admin email', this.email, this.password);
      const adminDTO: UserRegisterDTO = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: 9999999999,
        isVerified: true,
        role: 'admin',
        isBlocked: false,
        kycStatus: KycStatus.NotApplicable,
      };

      adminDTO.password = await this._hashService.hash(this.password);

      const result = await this._userRepo.createUser(adminDTO as UserEntity);
      console.log('result is ', result);

      this._logger.info(`admin created :${this.email}`);
    } catch (error) {
      this._logger.error('Error seeding admin', error);
    } finally {
      process.exit(0);
    }
  }
}
