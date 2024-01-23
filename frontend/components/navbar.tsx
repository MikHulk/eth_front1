"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

const width = 90;

export default function NavBar(): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const links = [
    ["/", "Home", /^\/$/g],
    ["/bank", "Bank", /^\/bank$/g],
    ["/bank/accounts", "Accounts", /^\/bank\/accounts(\/0x[A-z0-9]{40})?$/g],
  ].map(([link, title, re], ind) => {
    if (pathname.match(re)) {
      return (
        <Button
          key={ind}
          w={width}
          borderBottomStyle="solid"
          borderBottomColor="red"
          borderBottomWidth="1px"
          borderRadius="0px"
          onClick={() => router.push(link)}
        >
          {title}
        </Button>
      );
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
      );
    }
  });
  return (
    <ButtonGroup
      bg="gray.700"
      variant="ghost"
      pl={1}
      colorScheme="green"
      display="flex"
    >
      {links}
    </ButtonGroup>
  );
}
