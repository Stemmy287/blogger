export type LoginType = {
  loginOrEmail: string;
  password: string;
};

export type UserType = {
  email: string;
  login: string;
  userId: string;
};

export type TokensType = {
  accessToken: string;
  refresh: string;
};

export type RegistrationDataType = {
  login: string;
  password: string;
  email: string;
};