import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtDashboardGuard extends AuthGuard('jwtdashboard') {}

@Injectable()
export class JwtShareGaurd extends AuthGuard('jwtshare') {}
