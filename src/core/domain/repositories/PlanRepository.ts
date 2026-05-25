import type { IPlanResponse } from "@/core/domain/models/Plan";

export interface PlanRepository {
  GetPlans: () => Promise<IPlanResponse>;
}
