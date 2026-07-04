import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> { // promise meaning that this function will return a promise that resolves to a string (the hashed password)
    const salt = await bcrypt.genSalt(10) // Generate a salt with 10 rounds means the hashing will be done 10 times to increase security
    const hashedPassword = await bcrypt.hash(password, salt) // Hash the password with the generated salt
    return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> { 
    return await bcrypt.compare(password, hashedPassword); // Compare the provided password with the hashed password and return true if they match, false otherwise
}