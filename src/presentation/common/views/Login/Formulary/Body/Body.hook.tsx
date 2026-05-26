import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PORTAL } from "@/presentation/toolbox/constants/route";
import { EDocumentUser } from "@/presentation/toolbox/enum/user";
import { useUserInfoState } from "@/presentation/zustand/userInfoState";

export const useBodyHook = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserInfoState();

  const [document, setDocument] = useState<EDocumentUser>(EDocumentUser.DNI);

  const [numberDocument, setNumberDocument] = useState<string>("");
  const [errorNumberDocument, setErrorNumberDocument] = useState(false);

  const [phone, setPhone] = useState<string>("");
  const [errorPhone, setErrorPhone] = useState(false);

  const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);
  const [communicationsPolicy, setCommunicationsPolicy] =
    useState<boolean>(false);

  const handleChangeNumberDocument = (value: string) => {
    const isValidNumber = /^\d+$/.test(value);

    if (isValidNumber && value.length <= 8) {
      setNumberDocument(value);
      setErrorNumberDocument(false);
    } else if (!isValidNumber && value.length === 0) {
      setNumberDocument(value);
      setErrorNumberDocument(false);
    }
  };

  const handleBlurNumberDocument = (value: string) => {
    if (value.length < 8) setErrorNumberDocument(true);
  };

  const handleChangePhone = (value: string) => {
    const isValidNumber = /^\d+$/.test(value);

    if (isValidNumber && value.length <= 9) {
      setPhone(value);
      setErrorPhone(false);
    } else if (!isValidNumber && value.length === 0) {
      setPhone(value);
      setErrorPhone(false);
    }
  };

  const handleBlurPhone = (value: string) => {
    if (value.length < 9) setErrorPhone(true);
  };

  const handleSumbit = () => {
    if (!disabledButton) {
      setUser({
        ...user,
        info: {
          type: document,
          value: numberDocument,
          phone: Number(phone),
        },
      });
      navigate(ROUTE_PORTAL);
    }
  };

  const disabledButton =
    errorNumberDocument ||
    errorPhone ||
    !privacyPolicy ||
    !communicationsPolicy;

  return {
    setDocument,
    handleChangeNumberDocument,
    handleBlurNumberDocument,
    handleChangePhone,
    handleBlurPhone,
    handleSumbit,
    disabledButton,
    document,
    numberDocument,
    phone,
    errorNumberDocument,
    errorPhone,
    privacyPolicy,
    communicationsPolicy,
    setPrivacyPolicy,
    setCommunicationsPolicy,
  };
};
