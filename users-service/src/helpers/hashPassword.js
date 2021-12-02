import bcrypt from "bcrypt";

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export default hashPassword;