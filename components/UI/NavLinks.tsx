import { TNavLink } from "../../types/app.type";
import LinkCmp from "./Link";

interface Props {
  navStyle: string;
  itemStyle: string;
  navLinks: TNavLink[];
}
export default function NavLinks({ navStyle, navLinks, itemStyle }: Props) {
  return (
    <nav className={navStyle}>
      {navLinks.map((link) => (
        <LinkCmp
          styleMode="none"
          styleSize="none"
          key={link.href}
          href={link.href}
          className={itemStyle}
        >
          {link.icon}
          <span>{link.text}</span>
        </LinkCmp>
      ))}
    </nav>
  );
}
