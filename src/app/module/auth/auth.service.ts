import { Response } from "express";
import { prisma } from "../../lib/prisma";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const registerUserIntoDB = async (payload: TRegisterUser) => {
 
  const saltRounds = Number(config.bcrypt_salt_rounds) || 10;

  
  const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

  const { password, ...userData } = payload;

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });


  const { password: userPassword, ...result } = newUser;
  return result;
};

const getMeFromDB = async (token?: string) => {
  if (!token) {
    throw new Error("You are not authorized!");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_secret_key as string
  ) as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
};

const logoutUser = (res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

const loginUser = async (payload: TLoginUser, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User does not exist!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password as string,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password does not match!");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key as string, {
    expiresIn: "10d",
  });

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  getMeFromDB,
  logoutUser,
};