import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  SUPER_ADMIN = 'super_admin',
  SERVICE_ADMIN = 'service_admin',
  VEGAN_ADMIN = 'vegan_admin',
  USER = 'user',
}
registerEnumType(Role, { name: 'Role' });
