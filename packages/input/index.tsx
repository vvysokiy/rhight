import React, { useState, useCallback } from "react";
import cn from "classnames";

import { IInput } from "@rhight/input";

import s from "./styles.css";

/** HelloWorld - тестовый компонент в репозитории. Новые создаются по аналогии */
const Input: React.FC<IInput> = ({
  value,
  onChange,
  height = "default",
  placeholder,
  labelId,
  label,
  isDisabled = false,
}) => {
  const onLocalChange = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
    },
    [onChange]
  );
  return (
    <div className={s["input-wrapper"]}>
      <label className={s["label-input"]} htmlFor={labelId}>
        {label}
      </label>
      <input
        type="text"
        id={labelId}
        value={value}
        className={cn(
          s["text-input"],
          { [s["default"]]: height === "default" },
          { [s["small"]]: height === "small" }
        )}
        onChange={onLocalChange}
        placeholder={placeholder}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;

{
  /* <IconCheckbox className={cn(s.icon, { [s["icon--active"]]: activeBtn })} />; */
}
