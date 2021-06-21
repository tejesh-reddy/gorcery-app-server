var bcrypt = require('bcryptjs');

export async function encryptPassword(password: string) {
    const salt = 10;
    return bcrypt.genSalt(salt).then((salt: any) => {
        bcrypt.hash(password, salt);
    }).catch((err:any) => {
        console.error('Error generating salt -- AUTH');
        throw err;
    });
}

export async function validatePassword(password:string, validHash: string) {
    return bcrypt.compare(password, validHash)
    .then((match:any) => match)
    .catch((err: any) => {
        console.log('Error comparing passwords -- AUTH')
    })
}