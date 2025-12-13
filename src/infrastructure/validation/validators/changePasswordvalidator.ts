import { passwordSchema } from '../schemas/changePasswordSchema';

export class ChangePasswordValidator {
  static validate(data: unknown) {
    return passwordSchema.parse(data);
  }
  static safeValidate(data: unknown) {
    return passwordSchema.safeParse(data);
  }
}
