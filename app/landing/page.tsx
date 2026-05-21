import { FeatureCard, Container, SectionHeader, Navbar, Footer } from "@/app/shared/components";

const features = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Core Asset Management",
    description: "Track and manage every asset from procurement to disposal with complete lifecycle visibility and audit trails.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Manage Location",
    description: "Organize assets by buildings, floors, rooms, and zones. Pinpoint any item with accurate location tracking.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Dashboard Analytics",
    description: "Real-time dashboards and reports on asset utilization, maintenance costs, inventory status, and lifecycle trends.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Asset Depreciation",
    description: "Automate depreciation calculations using straight-line, declining balance, or custom schedules for accurate valuation.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-24 pb-20 sm:pt-32 sm:pb-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                Enterprise Asset Management
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Manage Every Asset with Confidence
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                Track, monitor, and optimise your organisation&apos;s physical assets
                from acquisition to disposal — all in one platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <a
                  href="/login"
                  className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Learn More
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Features */}
        <section id="features" className="py-20 sm:py-28">
          <Container>
            <SectionHeader
              label="Features"
              title="Everything You Need to Manage Assets"
              description="Four core capabilities designed to give you full control over your asset portfolio."
            />
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Streamline Asset Management?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Join organisations that trust eAsset to manage their valuable assets.
              </p>
              <a
                href="/login"
                className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Start Now
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
