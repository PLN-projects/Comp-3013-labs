import { Switch, Group, useMantineColorScheme } from '@mantine/core';
//@ts-ignore - I'm getting a weird typescript error where it says it's not finding my stylesheet even though it's actively using it
import classes from './LightDarkSlider.module.css'; 
import React from 'react';
import {useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function LightDarkSlider() {

  // Cookie and type declaration from mantine UI
  type ColorScheme = 'dark' | 'light';

  const [preferredColor, setPreferredColor] = useLocalStorage<ColorScheme> ({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  });

  // function obtained from mantine UI
  const { setColorScheme } = useMantineColorScheme();
  useHotkeys([['mod+J', () => changeColorScheme()]]);

  if(preferredColor != undefined){
    setColorScheme(preferredColor); // set initial color for application it will use default value
  }

  // change value of cookie and set it to the cookies color value
  function changeColorScheme(){
    setPreferredColor(preferredColor === 'dark' ? 'light' : 'dark');
    if(preferredColor != undefined){
      setColorScheme(preferredColor);
    }
  }

  return (
    <Group justify="center" p="md">
      <Switch onClick={() => changeColorScheme()} aria-label="Toggle color scheme" classNames={classes} />
    </Group>
  )
}