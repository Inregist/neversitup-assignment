/**
 * validate OTP
 * @param {number} otp
 * @returns {boolean}
 */
const validateOTP = (otp) => {
  const otpString = otp.toString();
  const otpArrayLength = otpString.length;

  if (otpArrayLength !== 6) {
    return false;
  }

  const pairs = otpString.match(/(\d)\1{1,}/g);
  if (pairs && pairs.length > 2) {
    return false;
  }

  let diff = +otpString[1] - +otpString[0];

  for (let i = 2; i < otpArrayLength; i++) {
    if (diff !== 0 && diff === +otpString[i] - +otpString[i - 1]) {
      return false;
    }
    diff = +otpString[i] - +otpString[i - 1];
  }

  return true;
};

module.exports = validateOTP;

console.log(validateOTP(123546));
