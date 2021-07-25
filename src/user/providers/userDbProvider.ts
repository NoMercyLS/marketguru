import { User } from '../entities';
import { USERS_REPOSITORY } from '../../_common/helpers';

export const userDbProvider = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
]