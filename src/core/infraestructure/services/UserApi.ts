import type { UserRepository } from "@/core/domain/repositories/UserRepository";
import type { IUser } from "@/core/domain/models/User";
import { PublicApi } from "../api/Api";

export class UserApi extends PublicApi implements UserRepository {
  public GetUser = async () => {
    const data = await this.get<IUser>("/api/user.json");
    return data.data;
  };
}
