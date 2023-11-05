import React from 'react';
import { useEffect } from 'react';
import { Switch, Group, useMantineColorScheme } from '@mantine/core';
//@ts-ignore - I'm getting a weird typescript error where it says it's not finding my stylesheet even though it's actively using it
import classes from './LightDarkSlider.module.css'; 
import {useHotkeys, useLocalStorage } from '@mantine/hooks';

export function LightDarkSlider() {

  // Cookie and type declaration from mantine UI
  type ColorScheme = 'dark' | 'light';
  
  const [preferredColor, setPreferredColor] = useLocalStorage<ColorScheme> ({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  });

  // function obtained from mantine UI
  const { setColorScheme } = useMantineColorScheme();
  useHotkeys([['mod+J', () => changeColorScheme()]]);

  // set initial color for application it will use default value useEffect was needed for this to avoid causing a warning
  useEffect(() => {
    if(preferredColor != undefined){
      setColorScheme(preferredColor);
    }
  }, [preferredColor, setColorScheme]);


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