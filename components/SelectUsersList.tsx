import { useTheme } from "@/src/context/ThemeContext";
import { User } from "@/src/models/models";
import { FlatList } from "react-native";
import MainButton from "./buttons/MainButton";

type SelectUsersListProps = {
  selectedIds: Set<string>;
  handleSelected: (ids: string) => void;
  data: User[];
};

export default function SelectUsersList(props: SelectUsersListProps) {
  const {theme} = useTheme();

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      extraData={props.selectedIds}
      contentContainerStyle={{
        flex: 1,
        gap: 10,
      }}
      renderItem={({item}) => {
        const selected = props.selectedIds.has(item.id);

        return (
          <MainButton
            text={`- ${item.name}`}
            onPress={() => props.handleSelected(item.id)}
            containerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: selected ? theme.accent : "",
            }}
            textStyle={{
              color: selected ? theme.background : theme.foreground,
            }}
          />
        );
      }}
    />
  );
}
