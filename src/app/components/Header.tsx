"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const links = [
    { label: "CityStats", href: "/" },
    { label: "About", href: "/about" },
  ];
  const currentPath = usePathname();

  return (
    <nav className="bg-white shadow-md p-4 flex space-x-6 items-center">
      <Link href="/">
        <Image
          className="h-10 object-contain"
          src={`/logo.png`}
          alt="Pulppo"
          width={256}
          height={54}
        />
      </Link>
      <ul>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "hover:text-zinc-800 transition-colors": true,
              "text-zinc-800": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "m-5": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
