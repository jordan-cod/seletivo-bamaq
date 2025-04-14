declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;

      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_SYNCHRONIZE: string;

      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_FROM: string;
    }
  }
}
