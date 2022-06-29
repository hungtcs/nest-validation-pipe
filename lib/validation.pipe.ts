import { ValidatorOptions, validate } from 'class-validator';
import { Injectable, SetMetadata, ValidationPipe as NestValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidationPipe extends NestValidationPipe {

  protected validate(object: object, validatorOptions?: ValidatorOptions) {
    const overrideOptions = Reflect.getMetadata(VALIDATION_OPTIONS, object.constructor);
    return validate(object, { ...validatorOptions, ...overrideOptions });
  }

}

export const VALIDATION_OPTIONS = Symbol('VALIDATION_OPTIONS');

export function ValidationOptions(options: { whitelist?: boolean }) {
  return SetMetadata(VALIDATION_OPTIONS, options);
}
