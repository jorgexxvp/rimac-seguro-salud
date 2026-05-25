import type { PlanRepository } from "@/core/domain/repositories/PlanRepository";

export class PlanUseCase {
  private repo: PlanRepository;

  constructor(repo: PlanRepository) {
    this.repo = repo;
  }

  public async GetPlans() {
    return this.repo.GetPlans();
  }
}
