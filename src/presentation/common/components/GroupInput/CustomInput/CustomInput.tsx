import type { FC, ReactNode } from "react";

import styles from "./CustomInput.module.sass";

type EVariantGeneral = "default" | "outline";

interface ICustomInputProps<T> {
  value: string;
  onChange: (value: T) => void;
  onBlur?: (value: T) => void;
  placeholder?: string;
  variant?: EVariantGeneral;
  label?: string;
}

export const CustomInput: FC<ICustomInputProps<ReactNode>> = ({
  onChange,
  value,
  onBlur,
  placeholder,
  variant,
  label,
}) => {
  return (
    <div className={styles.custom_input}>
      {label && <label>{label}</label>}
      <input
        className={`${styles["e-placeholder"]} ${styles.input} ${variant === "outline" && styles.input_outline}`}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur?.(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
