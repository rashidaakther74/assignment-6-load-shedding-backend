import { prisma } from "../../lib/prisma";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

const loginUser = async (payload: TLoginUser) => {
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

  return {
    accessToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
};