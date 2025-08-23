import {prisma} from '../prisma/client'

export const findByEmail = async (email:string) => {
    const user = await prisma.user.findUnique({where: { email }})
    return user;
}

export const create = async (user: any) => {
    return await prisma.user.create({ data: user})
}

export const currentDelee = async (id:number) => {
    return await prisma.user.delete({where: {id}})
}

export const update = async (id:number, email:string, name:string, password:string) => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            email,
            password
        }
    })
}