import Link from "next/link";

export default function _404() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </>
  );
}
