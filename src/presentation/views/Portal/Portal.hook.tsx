import { clientPlanApi, clientUserApi } from "@/core";
import { HomeIcon, HospitalIcon } from "@/presentation/toolbox/assets/icons";
import { useEffect, useState } from "react";
import { EOptionQuote } from "./Portal.interface";
import { CardPlans } from "@/presentation/common/views/Portal/CardPlans";
import type { IPlan } from "@/presentation/toolbox/interface/Plan";
import { useUserInfoState } from "@/presentation/zustand/userInfoState";

export const usePortalHook = () => {
  const { user, setUser } = useUserInfoState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<EOptionQuote | null>(null);
  const [plans, setPLans] = useState<IPlan[]>([]);

  const slides = plans
    .filter((data) => data.idx === (options === EOptionQuote.FOR_ME ? 1 : 2))
    .map((plan, idx) => ({
      id: idx.toString(),
      component: <CardPlans key={idx} plans={plan} />,
    }));

  const handleSelectedOption = async (value: EOptionQuote) => {
    setOptions(value);
    try {
      const { list } = await clientPlanApi.GetPlans();
      setPLans([
        {
          ...list[0],
          icon: HomeIcon,
          recommended: false,
          idx: 1,
        },
        {
          ...list[1],
          icon: HospitalIcon,
          recommended: true,
          idx: 1,
        },
        {
          ...list[3],
          icon: HomeIcon,
          recommended: false,
          idx: 1,
        },
        {
          ...list[0],
          icon: HomeIcon,
          recommended: false,
          disccount: 37.05,
          idx: 2,
        },
        {
          ...list[1],
          icon: HospitalIcon,
          recommended: true,
          disccount: 94.05,
          idx: 2,
        },
        {
          ...list[3],
          icon: HomeIcon,
          recommended: false,
          disccount: 46.55,
          idx: 2,
        },
      ]);
    } catch {
      alert("Fallo al traer informacion intentelo mas tarde");
    }
  };

  useEffect(() => {
    const handleUserApi = async () => {
      try {
        setIsLoading(true);
        const userApi = await clientUserApi.GetUser();
        setIsLoading(false);
        const { birthDay, lastName, name } = userApi;
        setUser({ ...user, birthDay, lastName, name });
      } catch {
        setIsLoading(true);
        alert("Fallo al traer informacion intentelo mas tarde");
      }
    };

    handleUserApi();
  }, []);

  return {
    user,
    options,
    plans,
    slides,
    handleSelectedOption,
    isLoading,
  };
};
