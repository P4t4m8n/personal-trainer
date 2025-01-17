import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="h-fit w-full flex flex-col gap-4 justify-center items-center">
      <a
        href="/api/auth/google"
        className="p-2 w-20 border rounded flex items-center justify-center"
      >
        Google
      </a>
      <Link
        href="signin/email"
        className="p-2 w-20 border rounded flex items-center justify-center"
      >
        Email
      </Link>
    </div>
  );
}
