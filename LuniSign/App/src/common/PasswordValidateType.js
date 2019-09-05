import messageProvider from './MessageProvider';

const PasswordValidateType = [
  {
    validateName: 'isPasswordLengthValidate',
    warningMessage: messageProvider.common.password_length_validate_desc,
  },
  {
    validateName: 'isPasswordRegValidate',
    warningMessage: messageProvider.common.password_pattern_validate_desc,
  },
  {
    validateName: 'isPasswordConfirmValidate',
    warningMessage: messageProvider.common.password_confirm_validate_desc,
  },
];

export default PasswordValidateType;
