export interface PasswordHashing {
  hash: (password: string) => Promise<string>;
  compare: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}
