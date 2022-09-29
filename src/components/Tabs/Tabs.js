import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  return (
    <div className="tabs">
      <ul>
        <li className={router.pathname === "/" ? "is-active" : ""}>
          <Link href="/">Tulot ja menot</Link>
        </li>
        <li className={router.pathname === "/budjetti" ? "is-active" : ""}>
          <Link href="/budjetti">Budjetointi</Link>
        </li>
        <li className={router.pathname === "/luottokortit" ? "is-active" : ""}>
          <Link href="/luottokortit">Luottokortit</Link>
        </li>
      </ul>
    </div>
  );
};
