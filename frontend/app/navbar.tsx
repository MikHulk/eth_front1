"use client"

import {Box, Button, ButtonGroup, Link} from "@chakra-ui/react"
import {NextLink} from "next/link"
import { usePathname, useRouter } from 'next/navigation'

const width = 90

export default function NavBar() : React.ReactNode {
  const links = [
    ["/", "Home"],
    ["/bank", "Bank"],
  ];
  const router = useRouter()
  const pathname = usePathname()
  return (
    <ButtonGroup bg="gray.700" variant="ghost" pl={1} colorScheme='green' display="flex">
      {
        links.map(
          ([link, title], ind) =>{
            if (link == pathname) {
              return (
                <Button
                  key={ind}
                  w={width}
                  borderBottomStyle="solid"
                  borderBottomColor="red"
                  borderBottomWidth="1px"
                  borderRadius="0px"
                >
                  {title}
                </Button>
              )
            } else {
              return (
                <Button 
                  borderRadius="0px"
                  key={ind}
                  w={width}
                  onClick={() => router.push(link)}
                >
                  {title}
                </Button>
              )
            }
          }
        )
      }
    </ButtonGroup>
  )
}
