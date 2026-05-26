import type { FC, ReactNode } from "react";

import { Header } from "@/presentation/common/components/Header";

import styles from "./Layout.module.sass";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <article className={styles.layout}>
      <Header />
      <div className={styles.layout_content}>
        <section className={styles.layout_content_grid}>
          <section>{children}</section>
        </section>
      </div>
    </article>
  );
};
