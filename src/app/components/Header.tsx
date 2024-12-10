import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <nav className="bg-white shadow-md p-4 flex space-x-6 items-center">
    <Link href="/">
      <Image
        src={`/logo.png`}
        className="h-10 object-contain"
        alt="Pulppo"
        width={256}
        height={54}
      />
    </Link>
    <ul>
      <li>
        <Link
          className="text-zinc-500 hover:text-zinc-800 transition-colors"
          href="/listings"
        >
          Geo stats
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
