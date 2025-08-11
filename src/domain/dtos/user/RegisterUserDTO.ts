export class UserRegisterDTO {
  
  name: string;

  email: string;

  phone: number;

  password: string;

  isVerified?:boolean;

  role:string;
  isBlocked:boolean;

  constructor(data: Partial<UserRegisterDTO>) {
    const nameRegex = /^[A-Z][a-zA-Z]{0,14}$/;

    // ===>name validation  :starts with  capital letter,contain  only letters , and be max 15 characters
    if (!data.name || !nameRegex.test(data.name)) {
      throw new Error(
        'Name must start with a capital letter, contain only letters, and be max 15 characters',
      );
    }

    // ------> phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.phone || !phoneRegex.test(data.phone.toString())) {
      throw new Error('Phone number must contain exactly 10 digits');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email || !emailRegex.test(data.email)) {
      throw new Error('A valid email address is required');
    }
    //= ==> Password Validation: 1 uppercase, 1 lowercase, 1 digit, 1 special char, 8–16 length
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      throw new Error('Password must be 8–16 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character');
    }

    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.isVerified = data.isVerified ?? false;
    this.role = data.role || 'user';
    this.isBlocked=data.isBlocked || false
  }
}
