import { Button, Grid, theme } from "@nextui-org/react";
import React, { ReactElement, useState } from "react";
import styles from "@/styles/Tab.module.scss";

type TabProps = {
  label: string;
  key: string;
  children: string | ReactElement | any;
  defaultActive: string;
  onChange: VoidFunction;
};

function CustomTab({
  tabOptions,
  defaultActive,
  onChange,
  ...rest
}: TabProps | any) {
  const [activeKeys, setActiveKeys] = useState(defaultActive);

  return (
    <div className={styles.customtab__wrapper} {...rest}>
      <div className={styles.customtab__button} style={{background: theme.colors.secondaryBorder.value}}>
        {tabOptions?.map((i: TabProps, k: string) => {
          return (
            <button
              className={activeKeys === i.key ?  styles.button__active :styles.button}
              style={{backgroundColor: `${activeKeys === i.key ? theme?.colors.secondary.value : 'unset'}`}}
              key={i.key}
              onClick={() => {
                onChange(i.key);
                setActiveKeys(i.key);
              }}
            >
              <span style={{color: theme?.colors.white.value}}>{i.label}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.customtab__content}>
       <span> {tabOptions.filter((item: any) => item.key === activeKeys)[0]?.children}</span>
      </div>
    </div>
  );
}

export default CustomTab;
