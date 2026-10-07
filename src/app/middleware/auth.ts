import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export interface CustomRequest extends Request {
  user?: JwtPayload | { id: string; email: string; role: string };
}

const auth = (...requiredRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const headerToken = req.headers.authorization;

      if (!headerToken && !req.cookies?.token) {
        throw new Error("You are not authorized!");
      }

      // Accept "Bearer <token>", a raw Authorization token, or the httpOnly cookie.
      const splitToken =
        headerToken?.split(" ")[1] || headerToken || req.cookies?.token;

      const decoded = jwt.verify(
        splitToken,
        config.jwt_secret_key as string
      ) as JwtPayload;

      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new Error("You have no permission to access this route!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;