import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('X-API-KEY');

    if (apiKey !== 'nest-is-awesome') {
      return false;
    }

    return true;
  }
}
