import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/config";

const exceptPath = ["/", "/api/auth/login", "/api/auth/register"];

export type JWTUser = {
  id: number;
};

export type JWTRequest = Request & {
  user?: JWTUser;
};

export function authenticateToken(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  if (exceptPath.includes(req.path)) {
    return next();
  }

  const jwtSecret = appConfig().jwtSecret;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded as JWTUser;
    next();
  });
}
