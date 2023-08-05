import { AdminGuard } from './admin.guard'
import { JwtGuard } from './jwt.guard'

export const GUARDS = [AdminGuard, JwtGuard]

export * from './admin.guard'
export * from './jwt.guard'
