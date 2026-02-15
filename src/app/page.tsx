export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Movie Tracker
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          A funky Netflix-inspired app for tracking and organizing your favorite movies
        </p>
        <div className="bg-card-background rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Project Setup Complete</h2>
          <p className="mb-4">
            The Movie Tracking App has been successfully set up with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js 14+ with App Router and TypeScript</li>
            <li>Tailwind CSS with custom theme variables</li>
            <li>Zustand for state management</li>
            <li>Fast-check for property-based testing</li>
            <li>Testing Library for component testing</li>
            <li>Project directory structure (app/, components/, store/, theme/, data/, types/)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}