export interface TokenGenerator {
  sign: (userId: string) => Promise<string>;
}
