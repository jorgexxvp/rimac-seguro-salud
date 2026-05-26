import { type FC } from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "@/presentation/common/components/CustomButton/CustomButton";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/presentation/common/components/GroupInput";
import { EDocumentUser } from "@/presentation/toolbox/enum/user";
import styles from "./Body.module.sass";
import { useBodyHook } from "./Body.hook";

const optionsDocuments = [
  { label: "DNI", value: EDocumentUser.DNI },
  { label: "CE", value: EDocumentUser.CE },
];

export const Body: FC = () => {
  const {
    communicationsPolicy,
    setDocument,
    disabledButton,
    document,
    numberDocument,
    phone,
    errorNumberDocument,
    errorPhone,
    privacyPolicy,
    handleBlurNumberDocument,
    handleBlurPhone,
    handleChangeNumberDocument,
    handleChangePhone,
    handleSumbit,
    setCommunicationsPolicy,
    setPrivacyPolicy,
  } = useBodyHook();

  return (
    <div className={styles.formulary}>
      <p>
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </p>

      <div className={styles.formulary_form}>
        <div className={styles.formulary_form_numberDocument}>
          <label>Documento</label>
          <div className={styles.formulary_form_numberDocument_input}>
            <CustomSelect
              options={optionsDocuments}
              onChange={(value) => setDocument(value as EDocumentUser)}
              value={document}
              variant="outline"
            />
            <CustomInput
              value={numberDocument}
              onChange={(value) => handleChangeNumberDocument(String(value))}
              onBlur={(value) => handleBlurNumberDocument(String(value))}
              placeholder="Nro. de doc"
              variant="outline"
            />
          </div>
          {errorNumberDocument && (
            <p className={styles.input_error_message}>
              Numero de documento inválido.
            </p>
          )}
        </div>
        <div className={styles.formulary_form_phone}>
          <CustomInput
            value={phone}
            onChange={(value) => handleChangePhone(String(value))}
            onBlur={(value) => handleBlurPhone(String(value))}
            placeholder="Celular"
            label="Celular"
          />
          {errorPhone && (
            <p className={styles.input_error_message}>
              Numero de celular inválido.
            </p>
          )}
        </div>
      </div>

      <div className={styles.formulary_policy}>
        <div>
          <CustomCheckBox
            checked={privacyPolicy}
            onChange={() => setPrivacyPolicy((prev) => !prev)}
          />
          <p>Acepto lo Política de Privacidad</p>
        </div>
        <div>
          <CustomCheckBox
            checked={communicationsPolicy}
            onChange={() => setCommunicationsPolicy((prev) => !prev)}
          />
          <p>Acepto la Política Comunicaciones Comerciales</p>
        </div>
        <Link to={""}>
          <p className={styles.formulary_policy_terms_Conditions}>
            Aplican Términos y Condiciones.
          </p>
        </Link>
      </div>

      <CustomButton
        handleSubmit={handleSumbit}
        variant="black"
        text="Cotiza aquí"
        disabled={disabledButton}
      />
    </div>
  );
};
