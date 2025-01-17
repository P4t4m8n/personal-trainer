import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="">
      <div className="">
        <a href="/api/auth/google" className="">
          Google
        </a>
        <Link href="signin/email" className="">
          Email
        </Link>
      </div>
    </div>
  );
}
