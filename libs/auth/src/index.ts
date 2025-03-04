import { canActivateAuth } from './lib/auth/access.guard';
import { authTokenInterceptor } from './lib/auth/auth.interseptor';
import { AuthService } from './lib/auth/auth.service';

export * from './lib/feature-login';

export { canActivateAuth, authTokenInterceptor, AuthService };
