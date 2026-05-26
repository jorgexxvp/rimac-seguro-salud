import { type FC } from "react";
import { CustomCheckBox } from "@/presentation/common/components/GroupInput";
import { Loading } from "@/presentation/common/components/Loading";
import {
  type Slide,
  Slider,
} from "@/presentation/common/components/Slider/Slider";
import { CardPlans } from "@/presentation/common/views/Portal/CardPlans";
import { portalMocks } from "@/presentation/toolbox/mocks/PortalMocks";
import styles from "./Portal.module.sass";
import { usePortalHook } from "./Portal.hook";
import { EOptionQuote } from "./Portal.interface";

export const Portal: FC = () => {
  const { handleSelectedOption, isLoading, options, plans, slides, user } =
    usePortalHook();

  if (isLoading) {
    return (
      <div className={styles.grid_system_layout}>
        <div className={styles.portal_loading}>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.portal}>
      <div className={styles.portal_head}>
        <div className={styles.portal_head_title}>
          <h1>{user.name} ¿Para quién deseas cotizar?</h1>
          <p>Selecciona la opción que se ajuste más a tus necesidades.</p>
        </div>
        <div className={styles.portal_head_options}>
          {portalMocks.map(({ content, icon, title, value }, idx) => {
            const selectedCard = options === value;

            return (
              <div
                className={`${styles.card} ${styles.custom_card} ${styles.custom_card_short} ${selectedCard && styles.custom_card_selected}`}
                onClick={() => handleSelectedOption(value)}
                key={idx}
              >
                <div className={styles.card_checkbox}>
                  <CustomCheckBox
                    checked={selectedCard}
                    onChange={() => {}}
                    variant="round"
                  />
                </div>
                <div className={styles.card_content}>
                  {icon}
                  <h3>{title}</h3>
                  <p>{content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {plans.length > 0 && (
        <>
          <div className={styles.portal_body}>
            {plans
              .filter(
                (data) =>
                  data.idx === (options === EOptionQuote.FOR_ME ? 1 : 2),
              )
              .map((plans, idx) => (
                <CardPlans key={idx} plans={plans} />
              ))}
          </div>
          <div className={styles.portal_body_mobile}>
            <Slider slides={slides} visibleItemsNumber={1}>
              {(slide: Slide) => <div>{slide.component}</div>}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};
