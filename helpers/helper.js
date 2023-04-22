exports.isEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return emailRegex.test(email);
};
