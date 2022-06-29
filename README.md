# Nest Validation Pipe

Inherits `ValidationPipe` of `@nestjs/common`, but provides override options decorator.

## Installation

```shell
npm install nest-validation-pipe
```

## Usage

```typescript
import { ValidationPipe } from 'nest-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}
```

```typescript
import { ValidationOptions } from 'nest-validation-pipe';

@ValidationOptions({
  // Override global validation options
  whitelist: false,
})
export class SomeDTO {

}
```

## Implementation Principle

<https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts>

```typescript
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
```
