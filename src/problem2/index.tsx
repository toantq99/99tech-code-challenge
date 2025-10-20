import { Spin } from "antd";
import { FC } from "react";
import SwapForm from "./components/SwapForm";
import { useTokens } from "./hooks";
import styles from "./styles.module.css";

const Problem2: FC = () => {
  const { tokens, tokenMap, loading } = useTokens();

  return (
    <div className={styles.container}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <SwapForm tokens={tokens} tokenMap={tokenMap} />
      )}
    </div>
  );
};

export default Problem2;
