import bcrypt from "bcrypt";

const passwordCompareSync = (passwordToTest, passwordHash) => bcrypt.compareSync(passwordToTest, passwordHash);

export default passwordCompareSync;