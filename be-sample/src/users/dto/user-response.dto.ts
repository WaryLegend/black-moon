export class UserResponseDto {
  id: number;
  email: string;
  activated: boolean;
  createdAt: string;
  lastLogin: string | null;
  role: { id: number; name: string } | null;
  profile: {
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    birthDate: string | null;
    phoneNumber: string | null;
    gender: string | null;
    avatarUrl: string | null;
    avatarName: string | null;
  } | null;
}
