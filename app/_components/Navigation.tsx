import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              <img
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                className="h-8 w-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="hover:text-accent-400 transition-colors"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
