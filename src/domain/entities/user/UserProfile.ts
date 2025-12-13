import { Address } from '../../valueObject/user/address';

/**
 *  Represents the User Profile domain entity in the system.
 *
 * This entity encapsulates core user-related data such as name, address,
 * and membership information.It is part of the domain layer and remains independent of infrastructure layer.
 */
export class UserProfileEntity {
  /**
   *
   * @param profileId - It represents userProfile Unique ID.
   * @param name - User's display name.
   * @param address - Address value object representing user location based data.
   * @param memberSince - For representing  user joining Date.
   * @param image - It represent user profile picture.
   * @param favorites - This contain user favorite event's ids
   */

  constructor(
    public readonly name: string,
    public readonly address: Address,
    public readonly memberSince: Date,
    public readonly image?: string,
    public readonly twoFAEnabled?: boolean,
    public readonly favorites?: string[],
    public readonly profileId?: string | undefined,
    public readonly user?: string
  ) {}
}
