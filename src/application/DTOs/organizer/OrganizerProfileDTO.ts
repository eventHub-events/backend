export class OrganizerProfileDTO {
  name?:string;
  email?:string;
  phone?:number;
  organizerId?: string;
  location?: string;
  organization?: string;
  website?: string;
  profilePicture?: string;
  bio?: string;
  trustScore:number = 0;
  totalEarnings:number = 0;

  constructor(data: Partial<OrganizerProfileDTO>) {

    Object.assign(this,data)
    // if (data.location && this.locationValidation(data.location.trim())) {
    //   this.location = data.location.trim();
    // }

    // if (data.organization && this.organizationValidation(data.organization.trim())) {
    //   this.organization = data.organization.trim();
    // }

    // if (data.website && this.websiteValidation(data.website.trim())) {
    //   this.website = data.website.trim();
    // }

    // if (data.profilePicture && this.profilePictureValidation(data.profilePicture.trim())) {
    //   this.profilePicture = data.profilePicture.trim();
    // }

    // if (data.bio && this.bioValidation(data.bio.trim())) {
    //   this.bio = data.bio.trim();
    // }

    // if (data.organizerId && this.organizerIdValidation(data.organizerId.trim())) {
    //   this.organizerId = data.organizerId.trim();
    // }

    // if (typeof data.kycVerified === 'boolean') {
    //   this.kycVerified = data.kycVerified;
    // }
    // this.trustScore=data.trustScore??0;
    // this.totalEarnings=data.totalEarnings??0
  }

  // organizerIdValidation(organizerId: string) {
  //   if (!organizerId) throw new Error('Organizer ID is required');
  //   if (!/^[a-f\d]{24}$/i.test(organizerId)) {
  //     throw new Error('Organizer ID must be a valid 24-character ObjectId');
  //   }
  //   return true;
  // }

  // locationValidation(location: string) {
  //   if (!location) throw new Error("Location cannot be empty");
  //   if (!/^[A-Za-z]/.test(location)) {
  //     throw new Error("Location must start with an alphabet");
  //   }
  //   if (location.length > 30) {
  //     throw new Error("Location must be less than or equal to 30 characters");
  //   }
  //   return true;
  // }

  // organizationValidation(organization: string) {
  //   if (!organization) throw new Error("Organization cannot be empty");
  //   if (!/^[A-Z]/.test(organization)) {
  //     throw new Error("Organization must start with a capital letter");
  //   }
  //   if (organization.length > 30) {
  //     throw new Error("Organization must be at most 30 characters");
  //   }
  //   return true;
  // }

  // websiteValidation(website: string) {
  //   if (!website) throw new Error("Website cannot be empty");

  //   if (website.length > 100) {
  //     throw new Error("Website URL must be at most 100 characters");
  //   }

  //   if (!/^https?:\/\/.+\..+/.test(website)) {
  //     throw new Error("Website must start with http:// or https:// and be valid");
  //   }

  //   try {
  //     new URL(website);
  //   } catch {
  //     throw new Error("Website must be a valid URL");
  //   }

  //   return true;
  // }

  // profilePictureValidation(profilePicture: string) {
  //   if (!profilePicture) throw new Error("Profile picture cannot be empty");

  //   if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(profilePicture)) {
  //     throw new Error(
  //       "Profile picture must be a valid image URL ending in .jpg, .jpeg, .png, or .webp"
  //     );
  //   }

  //   try {
  //     new URL(profilePicture);
  //   } catch {
  //     throw new Error("Profile picture must be a valid URL");
  //   }

  //   return true;
  // }

  // bioValidation(bio: string) {
  //   if (!bio) throw new Error("Bio cannot be empty");

  //   if (bio.length < 10) {
  //     throw new Error("Bio must be at least 10 characters long");
  //   }

  //   if (bio.length > 500) {
  //     throw new Error("Bio must be at most 500 characters");
  //   }

  //   if (!/\S/.test(bio)) {
  //     throw new Error("Bio cannot be just whitespace");
  //   }

  //   return true;
  // }
}
