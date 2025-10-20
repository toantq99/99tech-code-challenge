import { Token } from "../types";

/**
 * Calculate output amount based on input amount and exchange rate
 */
export const calculateOutputAmount = ({
  fromAmount,
  fromToken,
  toToken,
}: {
  fromAmount: string;
  fromToken: Token;
  toToken: Token;
}): number => {
  if (!fromAmount || !fromToken || !toToken) {
    return Number.NaN;
  }

  const amount = parseFloat(fromAmount);
  if (isNaN(amount) || amount <= 0) {
    return Number.NaN;
  }

  return (amount * fromToken.price) / toToken.price;
};
