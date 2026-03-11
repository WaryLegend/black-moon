export interface RoleSummary {
  id: number;
  name: string;
}

export interface ProfileDetails {
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  birthDate: string | null;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  avatarUrl: string | null;
  avatarName: string | null;
}

export interface CurrentAccount {
  id: number;
  email: string;
  activated: boolean;
  createdAt: string;
  lastLogin: string | null;
  role: RoleSummary | null;
  profile: ProfileDetails | null;
}
