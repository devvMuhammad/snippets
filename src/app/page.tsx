import Link from "next/link";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      Yo this is the main page <br />
      For dashboard, click <Link href="/dashboard">Here</Link>
    </div>
  );
}
