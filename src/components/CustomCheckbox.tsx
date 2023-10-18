import { Box, chakra, Flex, Text, useCheckbox } from "@chakra-ui/react";
/* @ts-ignore */

function CustomCheckbox(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <>
      <chakra.label
      tabIndex={0}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        w={"100%"}
        maxW={"800px"}
        height={"16"}
        margin={"5px auto"}
        border="1px solid"
        borderColor="purple.500"
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input aria-label={props.value} {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="purple.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="purple.500" />}
        </Flex>
        <Flex direction={"column"}>
          <Text fontSize={"14px"} color="gray.700" {...getLabelProps()}>
            {props.value}
          </Text>
          {props.desc && (
            <Text fontSize={"12px"} fontWeight={"normal"}>
              "{props.desc}"
            </Text>
          )}
        </Flex>
      </chakra.label>
    </>
  );
}

export default CustomCheckbox;
