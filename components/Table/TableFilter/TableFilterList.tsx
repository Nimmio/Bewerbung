import { Filter } from "@/types/filter";
import {
  ActionIcon,
  Badge,
  Chip,
  Flex,
  Grid,
  GridCol,
  TextInput,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface TableFilterListProps {
  filters: Filter[];
  onDelete: (index: number) => void;
}
//TODO: Keys
const TableFilterList = ({ filters = [], onDelete }: TableFilterListProps) => {
  return (
    <Grid>
      {filters.map((filter, index) => (
        <>
          <Grid.Col span={11} key={`FilterListKeyInputs_${index}`}>
            <Grid>
              <Grid.Col span={4}>
                {/** 
                <TextInput
                  size="xs"
                  readOnly
                  value={filter[0]}
                  key={`FilterListKeyInputs1_${index}`}
                />*/}
                <Badge fullWidth size="lg" radius="xs">
                  {filter[0]}
                </Badge>
              </Grid.Col>
              <Grid.Col span={4}>
                <Badge fullWidth size="lg" radius="xs">
                  {filter[1]}
                </Badge>
              </Grid.Col>
              <Grid.Col span={4}>
                <Badge fullWidth size="lg" radius="xs">
                  {filter[2] as String}
                </Badge>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={1} key={`FilterListKeyButtons_${index}`}>
            <Flex h="100%" align={"flex-end"}>
              <ActionIcon
                color="red"
                size="md"
                onClick={() => onDelete(index)}
                key={`FilterListKeyButton_${index}`}
              >
                <IconTrash />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </>
      ))}
    </Grid>
  );
};

export default TableFilterList;
