import { useState, useEffect, useMemo, useCallback, FC } from "react";
import {
  Card,
  Button,
  notification,
  Form,
  FormProps,
  Flex,
  Typography,
  Spin,
} from "antd";
import { SwapOutlined } from "@ant-design/icons";
import AmountInput from "../AmountInput";
import CurrencySelect from "../CurrencySelect";
import { Token } from "../../types";
import { calculateOutputAmount } from "../../utils";
import styles from "./styles.module.css";

interface SwapFormProps {
  tokens: Token[];
  tokenMap: Map<string, Token>;
}

interface SwapFormValues {
  fromCurrency: string;
  fromAmount: string;
  toCurrency: string;
}

const SwapForm: FC<SwapFormProps> = ({ tokens, tokenMap }) => {
  const [form] = Form.useForm<SwapFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [toAmount, setToAmount] = useState<number>();

  const [notificationApi, contextHolder] = notification.useNotification();

  const initialValues = useMemo<SwapFormValues>(
    () => ({
      fromCurrency: tokens[0]?.currency || "",
      toCurrency: tokens[1]?.currency || "",
      fromAmount: "",
    }),
    [tokens]
  );

  // Reset form and state
  const resetForm = useCallback(() => {
    form.resetFields();
    setToAmount(undefined);
  }, [form]);

  // Reset form when initialValues change
  useEffect(() => {
    resetForm();
  }, [initialValues, resetForm]);

  // Calculate output amount when inputs change
  const handleValuesChange = useCallback<
    NonNullable<FormProps<SwapFormValues>["onValuesChange"]>
  >(
    (_, allValues) => {
      const { fromCurrency, toCurrency, fromAmount } = allValues;

      if (!fromCurrency || !toCurrency || !fromAmount) {
        setToAmount(undefined);
        return;
      }

      const fromToken = tokenMap.get(fromCurrency);
      const toToken = tokenMap.get(toCurrency);

      if (!fromToken || !toToken) return;

      const output = calculateOutputAmount({
        fromAmount,
        fromToken,
        toToken,
      });

      setToAmount(output);
    },
    [tokenMap]
  );

  // Handle swapping currencies direction (flip from/to currencies)
  const handleSwapDirection = useCallback(() => {
    const { fromCurrency, toCurrency } = form.getFieldsValue([
      "fromCurrency",
      "toCurrency",
    ]);

    const newValues: SwapFormValues = {
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      fromAmount: toAmount?.toString() ?? "",
    };

    form.setFieldsValue(newValues);

    handleValuesChange(newValues, newValues);
  }, [form, toAmount, handleValuesChange]);

  // Handle form submission
  const handleSubmit = useCallback<
    NonNullable<FormProps<SwapFormValues>["onFinish"]>
  >(
    async (values) => {
      const { fromCurrency, toCurrency, fromAmount } = values;

      if (fromCurrency === toCurrency) {
        notificationApi.error({
          message: "Error",
          description: "Cannot swap the same currency",
        });
        return;
      }

      setSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitting(false);

      notificationApi.success({
        message: "Swap Successful!",
        description: `Successfully swapped ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency}`,
      });

      // Reset form and state
      resetForm();
    },
    [toAmount, resetForm, notificationApi]
  );

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        initialValues={initialValues}
        component={false}
      >
        <Card className={styles.card} title="Currency Swap">
          <Spin size="large" spinning={submitting} tip="Processing...">
            <Flex vertical gap="small">
              <Flex vertical gap="small">
                <Typography.Text strong>You Send</Typography.Text>
                <Flex gap="small">
                  <Form.Item
                    className={styles.amountFormItem}
                    name="fromAmount"
                    validateFirst
                    rules={[
                      { required: true, message: "Please enter an amount" },
                      {
                        validator: (_, value) => {
                          if (!value || parseFloat(value) <= 0) {
                            return Promise.reject(
                              "Please enter a valid amount"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <AmountInput />
                  </Form.Item>
                  <Form.Item
                    name="fromCurrency"
                    className={styles.currencyFormItem}
                  >
                    <CurrencySelect tokens={tokens} tokenMap={tokenMap} />
                  </Form.Item>
                </Flex>
              </Flex>

              <Flex justify="center" align="center">
                <Button
                  shape="circle"
                  icon={<SwapOutlined />}
                  onClick={handleSwapDirection}
                  size="large"
                  className={styles.swapButton}
                />
              </Flex>

              <Flex vertical gap="small">
                <Typography.Text strong>You Receive</Typography.Text>
                <Flex gap="small">
                  <div className={styles.amountFormItem}>
                    <AmountInput value={toAmount} readOnly />
                  </div>
                  <Form.Item
                    name="toCurrency"
                    className={styles.currencyFormItem}
                  >
                    <CurrencySelect tokens={tokens} tokenMap={tokenMap} />
                  </Form.Item>
                </Flex>
              </Flex>

              <Button
                type="primary"
                size="large"
                block
                onClick={() => form.submit()}
                className={styles.confirmButton}
              >
                Confirm Swap
              </Button>
            </Flex>
          </Spin>
        </Card>
      </Form>
      {contextHolder}
    </>
  );
};

export default SwapForm;
