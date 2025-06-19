import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8 text-center">
      <h1 className="text-3xl font-bold">Thank you!</h1>
      <p>Thank you for providing us your details.</p>
      <Link
        href="/profile"
        className="rounded bg-blue-600 px-5 font-medium text-white hover:bg-blue-700"
      >
        Go to profile
      </Link>
    </main>
  );
}