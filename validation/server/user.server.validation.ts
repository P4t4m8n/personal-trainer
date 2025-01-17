import { TUserCreateDto, TUserUpdateDto } from "@/types/user.type";
import { validationService } from "@/utils/server/validation.util";

export const validateUserDto = (userDto: TUserCreateDto | TUserUpdateDto) => {
  const errors: string[] = [];

  const emailError = _validateEmail(userDto?.email);
  if (emailError) errors.push(emailError);

  const firstNameErrorLen = validationService.validateStrLength(
    "First name",
    2,
    userDto?.firstName
  );

  if (firstNameErrorLen) errors.push(firstNameErrorLen);

  const firstNameError = validationService.validateLetters(
    "First name",
    userDto?.firstName
  );
  if (firstNameError) errors.push(firstNameError);

  const lastNameErrorLen = validationService.validateStrLength(
    "Last name",
    2,
    userDto?.lastName
  );
  if (lastNameErrorLen) errors.push(lastNameErrorLen);

  const lastNameError = validationService.validateLetters(
    "Last name",
    userDto?.lastName
  );
  if (lastNameError) errors.push(lastNameError);

  return errors;
};

/**
 * Private function.
 * Validates the given email address.
 *
 * @param email - The email address to be validated.
 * @returns A message if the email is invalid, otherwise null.
 */
const _validateEmail = (email?: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return "Please provide a valid email address.";
  }
  return null;
};
