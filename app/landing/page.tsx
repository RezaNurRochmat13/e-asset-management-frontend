import { FeatureCard, Container, SectionHeader, Navbar, Footer } from "@/app/shared/components";

const features = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Core Asset Management",
    description: "Track every asset from procurement to disposal with complete lifecycle visibility.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Manage Location",
    description: "Organize assets by buildings, floors, and zones with accurate location tracking.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Dashboard Analytics",
    description: "Real-time reports on asset utilization, maintenance costs, and lifecycle trends.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Asset Depreciation",
    description: "Automate depreciation with straight-line, declining balance, or custom schedules.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
                Manage Every Asset with Confidence
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-500">
                Track, monitor, and optimise your organisation&apos;s physical assets
                from acquisition to disposal — all in one platform.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <a
                  href="/login"
                  className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="rounded-md px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  Learn More
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section id="features" className="border-t border-gray-100 py-20 sm:py-24">
          <Container>
            <SectionHeader
              title="Everything You Need to Manage Assets"
              description="Four core capabilities designed to give you full control over your asset portfolio."
            />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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

        <section className="border-t border-gray-100 py-20 sm:py-24">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Ready to Streamline Asset Management?
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-500">
                Start managing your valuable assets the simple way.
              </p>
              <a
                href="/login"
                className="mt-6 inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Get Started
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
