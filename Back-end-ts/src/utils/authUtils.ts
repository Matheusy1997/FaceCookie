import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Faz o hash da senha para armazenar no db ou comparar
export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

// Faz a comparação das senha assim permitindo acessor ou site
export const comparePassword = async (dbPassword:string, userPassword:string) =>  {
    return bcrypt.compare(dbPassword, userPassword)
}

// Cria o token para validar algumas operações no front como deletar e atualizar
const secretKey = process.env.CHAVE_SECRETA;
export const generateToken = (user: any) => {
    if(!secretKey) throw new Error('A chave secreta JWT não está definida nas variáveis de ambiente.')
    
        const userToken = {
        id: user.id,
        email: user.email,
        name: user.name
    }

    const token = jwt.sign(
        userToken,
        secretKey,
        {expiresIn: '1h'}
    );

    return token
}