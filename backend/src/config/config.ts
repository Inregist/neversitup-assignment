import dotenv from "dotenv";

dotenv.config();

const resolveInt = (value: string | undefined, defaultValue: number) => {
  if (value === undefined) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

const resolveString = (value: string | undefined, defaultValue: string) => {
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

export const appConfig = () => ({
  port: resolveInt(process.env.PORT, 3001),
  hostname: resolveString(process.env.HOSTNAME, "localhost"),
  corsOrigin: resolveString(process.env.CORS_ORIGIN, "http://localhost:3001"),

  jwtSecret: resolveString(process.env.JWT_SECRET, "secret"),
});
