import {useTheme} from "@/src/context/ThemeContext";
import {User} from "@/src/models/models";
import {useState} from "react";
import {FlatList} from "react-native";
import MainButton from "./buttons/MainButton";

type SelectUsersListProps = {
  data: User[];
};

export default function SelectUsersList(props: SelectUsersListProps) {
  const {theme} = useTheme();
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      extraData={selectedIds}
      contentContainerStyle={{
        flex: 1,
        gap: 10,
      }}
      renderItem={({item}) => {
        const selected = selectedIds.has(item.id);

        return (
          <MainButton
            text={item.name}
            onPress={() => toggle(item.id)}
            containerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: selected ? theme.foreground : "",
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
