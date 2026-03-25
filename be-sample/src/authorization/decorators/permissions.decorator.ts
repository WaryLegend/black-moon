import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionCode } from '../constants/permissions.constant';

export const PERMISSIONS_KEY = 'required_permissions';

export const Permissions = (
  ...permissions: PermissionCode[]
): CustomDecorator<string> => SetMetadata(PERMISSIONS_KEY, permissions);
