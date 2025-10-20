import { Token, TokenPrice } from "../types";

const PRICES_API = "https://interview.switcheo.com/prices.json";
const ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

/**
 * Fetch token prices from API
 */
export const fetchTokenPrices = async (): Promise<TokenPrice[]> => {
  try {
    const response = await fetch(PRICES_API);
    if (!response.ok) {
      throw new Error("Failed to fetch token prices");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return [];
  }
};

/**
 * Get token icon URL
 */
export const getTokenIconUrl = (currency: string): string => {
  return `${ICON_BASE_URL}/${currency}.svg`;
};

/**
 * Get all available tokens with prices
 * If a token has multiple prices, use the most recent one
 */
export const getAvailableTokens = async (): Promise<{
  tokens: Token[];
  tokenMap: Map<string, Token>;
}> => {
  const prices = await fetchTokenPrices();

  // Parse and deduplicate token prices, keeping the most recent price for each currency
  const tokenMap = prices.reduce((acc, item) => {
    if (item.price <= 0) return acc;

    const timestamp = new Date(item.date).getTime();
    const existing = acc.get(item.currency);

    // Only update if we don't have this currency yet, or if this entry is more recent
    if (!existing || timestamp > existing.timestamp) {
      acc.set(item.currency, {
        currency: item.currency,
        price: item.price,
        iconUrl: getTokenIconUrl(item.currency),
        timestamp,
      });
    }

    return acc;
  }, new Map<string, Token>());

  // Convert to array and sort alphabetically
  const tokens = Array.from(tokenMap.values()).sort((a, b) =>
    a.currency.localeCompare(b.currency)
  );

  return { tokens, tokenMap };
};
