import { Filter } from "@/types/filter";
import { ActionIcon, Flex, Grid, GridCol, TextInput } from "@mantine/core";
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
                <TextInput
                  size="xs"
                  readOnly
                  value={filter[0]}
                  key={`FilterListKeyInputs1_${index}`}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  size="xs"
                  readOnly
                  value={filter[1]}
                  key={`FilterListKeyInputs2_${index}`}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  size="xs"
                  readOnly
                  value={filter[2] as string}
                  key={`FilterListKeyInputs3_${index}`}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={1} key={`FilterListKeyButtons_${index}`}>
            <Flex h="100%" align={"flex-end"}>
              <ActionIcon
                mb="0.25em"
                color="red"
                size="sm"
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
