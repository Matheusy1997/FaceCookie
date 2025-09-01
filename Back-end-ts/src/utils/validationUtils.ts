import { isEmail } from "validator";

export const isValidEmail = (email:string):boolean => {
    return isEmail(email)
}


export const isValidPassword = (password:string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}

export const isValidName = (name: string):boolean => {
    const nameRegex = /^[A-Za-zÀ-ÿ]+([ ]?[A-Za-zÀ-ÿ]+)*$/;
    return  nameRegex.test(name)
}