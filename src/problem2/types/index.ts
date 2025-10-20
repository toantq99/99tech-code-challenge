/**
 * Token price data from API
 */
export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

/**
 * Processed token information
 */
export interface Token {
  currency: string;
  price: number;
  iconUrl: string;
  timestamp: number;
}
