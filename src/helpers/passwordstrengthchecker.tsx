export default function isStrongPassword(password: string) {
  // Check for minimum length
  if (password.length < 8) {
    return false;
  }

  // Check for lowercase, uppercase, numbers, and special characters using regular expressions
  var hasLowercase = /[a-z]/.test(password);
  var hasUppercase = /[A-Z]/.test(password);
  var hasNumbers = /[0-9]/.test(password);
  var hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Return true if all conditions are met
  return hasLowercase && hasUppercase && hasNumbers && hasSpecialChars;
}
