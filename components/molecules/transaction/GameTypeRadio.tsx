import {
  useRadioGroup,
  HStack,
  Box,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';
import React, {
  ChangeEventHandler,
  forwardRef,
  ReactNode,
  ForwardedRef,
} from 'react';

// 1. Create a component that consumes the `useRadio` hook
const CustomRadioOption = (props: UseRadioProps & { children: ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" flex={1}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        _checked={{
          bg: 'cyan.400',
          color: 'white',
          borderColor: 'cyan.400',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export type CustomRadioGroupProps<T extends string | number | undefined> = {
  options: { label: string; value: T }[];
  name: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const CustomRadioGroup = <T extends string | number | undefined>(
  { options, name, defaultValue, onChange }: CustomRadioGroupProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
  });

  const group = getRootProps({ ref, onChange });

  return (
    <HStack {...group}>
      {options.map(({ label, value }) => {
        const radio = getRadioProps({ value });
        return (
          <CustomRadioOption key={value} {...radio}>
            {label}
          </CustomRadioOption>
        );
      })}
    </HStack>
  );
};
export default forwardRef(CustomRadioGroup) as <
  T extends string | number | undefined
>(
  props: CustomRadioGroupProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof CustomRadioGroup>;
