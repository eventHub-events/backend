import express from 'express';
import { RedisCacheService } from '../../../infrastructure/services/otp/RedisCacheService';
import { OtpService } from '../../../infrastructure/services/otp/OtpService';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { GenerateOtpUseCase } from '../../../application/user/auth/GenerateOtpUseCase';
import { RegisterUserUseCase } from '../../../application/user/auth/RegisterUserUseCase';
import { VerifyOtpUseCase } from '../../../application/user/auth/VerifyOtpUseCase';
import { AuthController } from '../../controllers/user/AuthController';
import { BcryptHashService } from '../../../infrastructure/services/hashing/BcryptHashService';
import { HashService } from '../../../infrastructure/services/hashing/HashService';
import { NodeMailerEmailService } from '../../../infrastructure/services/nodeMailer/NodeMailerEmailService';
import { EmailService } from '../../../infrastructure/services/nodeMailer/EmailService';
import { ResendOtpUseCase } from '../../../application/user/auth/ResendOtp';
import { LoginUserUseCase } from '../../../application/user/auth/LoginUserUseCase';
import { TokenService } from '../../../infrastructure/services/JwT/TokenService';
import { JWTToken } from '../../../infrastructure/services/JwT/JWTToken';

const router = express.Router();

const cacheService = new RedisCacheService();
const otpService = new OtpService(cacheService);
const userRepository = new UserRepository();
const generateOtpUseCase = new GenerateOtpUseCase(otpService);
const nodeMailerEmailService = new NodeMailerEmailService();
const emailService = new EmailService(nodeMailerEmailService);
const registerUserUseCase = new RegisterUserUseCase(userRepository, generateOtpUseCase, emailService);

// Hashing related dependency injection
const bcryptHashService = new BcryptHashService();
const hashService = new HashService(bcryptHashService);
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, otpService, hashService);
const jwtToken = new JWTToken()
const tokenService  = new TokenService(jwtToken)

const resendOtpUseCase = new ResendOtpUseCase(generateOtpUseCase, nodeMailerEmailService);
const loginUserUseCase   = new LoginUserUseCase(tokenService,hashService,userRepository)

const authController = new AuthController(registerUserUseCase, resendOtpUseCase, verifyOtpUseCase,loginUserUseCase);

router.post('/register', (req, res) => authController.registerUser(req, res));
router.post('/verify-otp', (req, res) => authController.verifyOtp(req, res));
router.post('/resend-otp', (req, res) => authController.resendOtp(req, res));
router.post("/login",(req,res)=>authController.loginUser(req,res))

export default router;
