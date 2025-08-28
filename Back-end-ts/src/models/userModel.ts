import { prisma } from "../prisma/client";

export const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const create = async (name: string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const currentDelee = async (email: string) => {
  return await prisma.user.delete({ where: { email } });
};

export const update = async (
  email: string,
  data: { name: string; email: string; password: string }
) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};
