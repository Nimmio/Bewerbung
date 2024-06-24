import { Divider, Flex, InputLabel, Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface TitleLabelProps {
  title: string;
  text: ReactNode;
}

const TitleLabel = ({ title, text }: TitleLabelProps) => (
  <Flex direction="column" h={"3.75em"}>
    <InputLabel>{title}</InputLabel>
    <Text tt="capitalize">{text}</Text>
  </Flex>
);

export default TitleLabel;
