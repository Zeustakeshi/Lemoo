import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  to: string;
  primaryText: string;
  icon?: React.ReactNode;
}

function NavItem({ to, primaryText, icon }: NavItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={to} className="[&.active]:font-bold">
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primaryText} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
