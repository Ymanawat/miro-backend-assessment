import { registerDecorator, ValidationOptions } from 'class-validator';

const regex = new RegExp(
  `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,64}$`,
);

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string): void {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message:
          'Password must be between 8 to 64 characters, and have at least one small, ' +
          'capital, numeric and special character',
        ...validationOptions,
      },
      validator: {
        validate(value: any): boolean {
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}
