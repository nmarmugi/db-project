'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function ProviderChakra({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}