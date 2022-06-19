// Constants
import {
  USER_REPOSITORY
} from 'src/core/constants';

// Entities
import { User } from 'src/core/entities/user.entity';

export const EntitiesProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User
  }
]
