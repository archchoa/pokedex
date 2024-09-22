"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";

interface ProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryParamProvider>
  );
};
