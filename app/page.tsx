import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Student Mentorship Platform',
  description:
    'Welcome to the Student Mentorship Platform - Connect with experienced mentors for academic guidance, career development, and personal growth',
  keywords: [
    'student mentorship',
    'academic guidance',
    'career development',
    'mentoring platform',
    'education',
  ],
  openGraph: {
    title: 'Student Mentorship Platform',
    description:
      'Connect students with mentors for academic guidance and career development',
    type: 'website',
  },
};

export default function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="w-full max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to the{' '}
            <span className="text-blue-600">Student Mentorship Platform</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            Connect with experienced mentors who can guide you through your
            academic journey and help you achieve your career goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Find Mentors
            </h2>
            <p className="text-gray-600">
              Browse through our diverse community of experienced mentors ready
              to guide you.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Track Progress
            </h2>
            <p className="text-gray-600">
              Monitor your learning journey and celebrate milestones with your
              mentor.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Achieve Goals
            </h2>
            <p className="text-gray-600">
              Set and accomplish your academic and career objectives with
              personalized guidance.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Learn More
          </button>
        </div>

        <div className="pt-8 text-sm text-gray-500">
          <p>
            Join thousands of students already benefiting from personalized
            mentorship
          </p>
        </div>
      </div>
    </main>
  );
}