export type AuthUser = {
  _id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  success: boolean;
  token: string;
  data: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
