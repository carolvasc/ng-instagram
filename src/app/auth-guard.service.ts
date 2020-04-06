import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessService } from './access/access.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private accessService: AccessService) { }

  canActivate(): boolean {
    return this.accessService.auth();
  }
}