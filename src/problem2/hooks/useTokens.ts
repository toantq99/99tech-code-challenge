import { useState, useEffect } from "react";
import { Token } from "../types";
import { getAvailableTokens } from "../services";

interface UseTokensReturn {
  tokens: Token[];
  tokenMap: Map<string, Token>;
  loading: boolean;
  error: boolean;
}

export const useTokens = (): UseTokensReturn => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tokenMap, setTokenMap] = useState<Map<string, Token>>(new Map());

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        setError(false);
        const { tokenMap, tokens } = await getAvailableTokens();

        if (tokens.length === 0) {
          setError(true);
        } else {
          setTokens(tokens);
          setTokenMap(tokenMap);
        }
      } catch (err) {
        console.error("Error fetching tokens:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, tokenMap, loading, error };
};
