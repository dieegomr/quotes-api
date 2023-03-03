export type LoginInputDto = {
  email: string;
  password: string;
};

export type LoginOutputDto = {
  id: string;
  name: string;
  email: string;
  token: string;
};
