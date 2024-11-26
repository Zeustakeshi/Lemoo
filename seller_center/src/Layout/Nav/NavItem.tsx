import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  to: string;
  primaryText: string;
}

function NavItem({ to, primaryText }: NavItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={to} className="[&.active]:font-bold">
        <ListItemText primary={primaryText} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
