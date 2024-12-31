export interface UsersAutorizationService {
  isAdmin(userId: string): Promise<boolean>
}