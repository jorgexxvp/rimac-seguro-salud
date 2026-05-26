import type { IPlanResponse } from "@/core/domain/models/Plan";
import type { PlanRepository } from "@/core/domain/repositories/PlanRepository";

import { PublicApi } from "../api/Api";

export class PlanApi extends PublicApi implements PlanRepository {
  public GetPlans = async () => {
    const data = await this.get<IPlanResponse>("/api/plans.json");
    return data.data;
  };
}
