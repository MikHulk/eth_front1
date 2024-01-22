import { forwardRef } from "react";
import { Input, InputGroup as InG, InputLeftAddon } from "@chakra-ui/react";

const InputGroup = forwardRef(
  ({ label, h, w, ...inputProps }: any, ref): React.ReactNode => {
    return (
      <InG mt={2}h={h} w={w} justifyContent="center">
        <InputLeftAddon w="15%">{label}</InputLeftAddon>
        <Input
          errorBorderColor="red.300"
          _placeholder={{ color: "gray.100" }}
          ref={ref}
          {...inputProps}
        ></Input>
      </InG>
    );
  },
);

export default InputGroup;
