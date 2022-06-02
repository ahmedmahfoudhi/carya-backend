import * as bcrypt from 'bcrypt';

export const hashPassword =async (plainPassword:string) => {
            //generate salt
            const salt = await bcrypt.genSalt();

            // hash password 
            const hashedPassword = await bcrypt.hash(plainPassword,salt);

            return hashedPassword;
}


export const comparePasswords = async (plainTextPassword:string,hashedPassword:string) => {
    console.log(plainTextPassword,hashedPassword)
    return await bcrypt.compare(plainTextPassword,hashedPassword);
}