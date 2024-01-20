"use client"

import {Button, ButtonGroup, Link} from "@chakra-ui/react"
import {NextLink} from "next/link"
import { usePathname, useRouter } from 'next/navigation'

const width = 90

export default function NavBar() : React.ReactNode {
  const links = [
    ["/", "Home"],
    ["/bank", "Bank"],
  ];
  const router = useRouter()
  return (
     <ButtonGroup bg="gray.700" variant="ghost" pl={1} colorScheme='green' display="flex">
       {
         links.map(
           ([link, title], ind) =>(
             <Button key={ind} w={width} onClick={() => router.push(link)}>
               {title}
             </Button>
           )
         )
       }
     </ButtonGroup>
   )
}
