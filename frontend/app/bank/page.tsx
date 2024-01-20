"use client"

import { useState, useEffect, useRef } from "react"
import { localhost } from 'viem/chains'
import {
  Box,
  Card,
} from "@chakra-ui/react"


export default function Bank() : React.ReactNode {
  return (
    <main p={5}>
      <Box
        display="flex"
        alignItems="center"
        w="100%"
        justifyContent="center"
      >
        <Card w="66%" mt={5} p={2}>
          <Box p={1} alignSelf="center">
            Salut Gros
          </Box>
        </Card>
      </Box>
    </main>
  )
}
