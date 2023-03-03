export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDto = {
  id: string;
  name: string;
  email: string;
};
