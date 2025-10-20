import { InputNumber, InputNumberProps } from "antd";
import styles from "./styles.module.css";
import { FC } from "react";

const AmountInput: FC<InputNumberProps> = (props) => {
  return (
    <InputNumber
      className={styles.input}
      placeholder="0.00"
      size="large"
      formatter={(value) => {
        if (!value) return "";
        return new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        }).format(Number(value));
      }}
      parser={(value: string | undefined) => {
        if (!value) return "";
        // Remove thousand separators (commas) and keep only digits and decimal point
        return value.replace(/,/g, "");
      }}
      stringMode
      {...props}
    />
  );
};

export default AmountInput;
