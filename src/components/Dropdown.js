import React from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

export default function Dropdown({options, selected, onSelect}) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Button onPress={() => setVisible(true)}>{selected}</Button>}
    >
      {options.map(opt => (
        <Menu.Item key={opt.value} onPress={() => { onSelect(opt.value); setVisible(false); }} title={opt.label} />
      ))}
    </Menu>
  );
}