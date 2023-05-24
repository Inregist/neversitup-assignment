import prisma from "../../prisma";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcrypt";
import { appConfig } from "../../config/config";

export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

class AuthService {
  jwtSecret: string = "";

  constructor() {
    this.jwtSecret = appConfig().jwtSecret;
  }

  async register(newUser: CreateUserInput) {
    const validatedUser = createUserSchema.safeParse(newUser);

    if (!validatedUser.success) {
      throw new Error(validatedUser.error.message);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(validatedUser.data.password, salt);

    const user = await prisma.user.create({
      data: { ...validatedUser.data, password: hashedPassword, salt },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const users = await prisma.user.findMany();
    console.log(users);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password + user.salt,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid login");
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      this.jwtSecret
    );

    return token;
  }

  async me(userId: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default new AuthService();
