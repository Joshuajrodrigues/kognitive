import { Box, useRadio } from "@chakra-ui/react";

{/* @ts-ignore */ }
const RadioCard = (props) => {

  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box tabIndex={0} as="label">
      <input aria-label={props.value} name={props.value} {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "purple.600",
          color: "white",
          borderColor: "purple.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {/* @ts-ignore */}
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard