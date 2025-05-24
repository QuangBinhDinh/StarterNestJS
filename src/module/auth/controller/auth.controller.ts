import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ZodValidationPipe } from 'src/validation/zod-validation.pipe';
import { SignInDto, signInSchema } from '../dto/sign-in.dto';
import { BaseResposne } from '../../my-menu/base-response';
import { Message } from 'src/decorators/metadata.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Message('Login successful')
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(@Body() signInDto: SignInDto) {
    const userData = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return userData;
  }

  @Get('test-async-function')
  testAsyncFunction() {
    console.log('Start'); // 1st

    setTimeout(() => console.log('Timeout completed'), 1000); //4th

    (async function () {
      console.log('Before await'); //2nd

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('After await'); //5th
    })();

    console.log('End'); //3rd
    return 'Test async function';
  }

  @Get('test-async-function-2')
  async testAsyncFunction2() {
    console.log('Start'); // 1st

    setTimeout(() => console.log('Timeout completed'), 1000); //3rd

    await (async function () {
      console.log('Before await'); //2nd

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('After await'); //4th
    })();

    console.log('End'); //5th
    return 'Test async function';
  }
}
