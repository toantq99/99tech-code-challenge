import { Select, Avatar, SelectProps, Flex, Typography } from "antd";
import { Token } from "../../types";
import styles from "./styles.module.css";
import { FC } from "react";

interface CurrencySelectProps extends SelectProps {
  tokens: Token[];
  tokenMap: Map<string, Token>;
}

const CurrencySelect: FC<CurrencySelectProps> = ({
  tokens,
  tokenMap,
  ...props
}) => {
  const selectedToken = tokenMap.get(props.value);

  return (
    <Flex vertical gap={4} align="flex-end">
      <Select
        className={styles.select}
        size="large"
        showSearch
        optionFilterProp="label"
        {...props}
        options={tokens.map((token) => ({
          label: (
            <Flex gap="small" align="center">
              <Avatar src={token.iconUrl} size="small">
                {token.currency}
              </Avatar>
              <span>{token.currency}</span>
            </Flex>
          ),
          value: token.currency,
        }))}
      />
      {selectedToken?.price && (
        <Typography.Text type="secondary" className={styles.price}>
          1 {selectedToken.currency} = ${selectedToken.price.toFixed(2)}
        </Typography.Text>
      )}
    </Flex>
  );
};

export default CurrencySelect;
