import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class DepartmentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Admin has full access
    if (user.role === 'ADMIN') return true;

    // HODs must match the department param (assumes route param is :departmentId)
    const routeDepartmentId =
      request.params.departmentId || request.body.departmentId;

    if (user.role === 'HOD') {
      if (!routeDepartmentId) return false;
      if (user.departmentId !== routeDepartmentId) {
        throw new ForbiddenException(
          'Access restricted to your assigned department',
        );
      }
      return true;
    }

    return false;
  }
}
