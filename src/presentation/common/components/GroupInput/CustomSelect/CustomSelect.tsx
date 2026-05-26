import { type FC, Fragment } from "react";
import { ArrowDownIcon } from "@/presentation/toolbox/assets/icons";
import styles from "./CustomSelect.module.sass";
import { useCustomSelect } from "./CustomSelect.hook";

interface ISelectOptions {
  label: string;
  value: string;
}

type EVariantGeneral = "default" | "outline";

interface ICustomSelectProps {
  options: ISelectOptions[];
  value: string;
  onChange: (value: string) => void;
  variant?: EVariantGeneral;
}

export const CustomSelect: FC<ICustomSelectProps> = ({
  value,
  options,
  onChange,
  variant = "default",
}) => {
  const { targetRef, open, setOpen } = useCustomSelect();

  return (
    <Fragment>
      <div
        ref={targetRef}
        className={`${styles.select} ${variant === "outline" && styles.select_outline}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={styles.select_value}>
          <div className={styles.select_value_text}>{value}</div>
          <ArrowDownIcon className={styles.select_icon} />
        </div>

        <div
          className={`${styles.select_overlay} ${open && styles.select_overlay_open}`}
        >
          {options.map(({ label, value }, idx) => (
            <div
              key={idx}
              className={styles.select_overlay_option}
              onClick={() => onChange(value)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      {open && <div className={styles.select_background} />}
    </Fragment>
  );
};
