'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type Props = {
    children: React.ReactNode;
};
//in this children we can wrap our entire react application

const queryClient = new QueryClient();

const Providers = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}> {children}
    </QueryClientProvider>
  );
};

export default Providers;