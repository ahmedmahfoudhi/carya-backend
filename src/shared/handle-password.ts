import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  try {
    const comparisonResult = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    return comparisonResult;
  } catch (error) {
    return false;
  }
};
