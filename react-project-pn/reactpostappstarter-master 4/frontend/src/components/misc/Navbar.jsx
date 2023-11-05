import React from "react";
import classes from "./Navbar.module.css";
import { MantineLogo } from "@mantine/ds";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";
import { LightDarkSlider } from "./LightDarkSlider.tsx";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  // I've modified the mantine logo header to change make the user go to the homepage on click
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <NavLink key={"home"} onClick={handleClick} style={{background: '#FFFFFF', color: '#000000'}} end to="/">
          <MantineLogo size={28} />
        </NavLink>
        <Group gap={5} visibleFrom="xs">
          {items}
          <LightDarkSlider />
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
