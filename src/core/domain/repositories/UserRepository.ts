import type { IUser } from "@/core/domain/models/User";

export interface UserRepository {
  GetUser: () => Promise<IUser>;
}
