import bcrypt from 'bcrypt';
const saltrounds = 10;


export const hashpassword = (password)=>{
    const salt = bcrypt.genSaltSync(saltrounds);
    return bcrypt.hashSync(password,salt);
};
export const comparePassword = (plain,hashed)=>
    bcrypt.compareSync(plain,hashed)
