export default function Home() {
  const productCategories = [
    "Fine Wines",
    "Premium Jamon",
    "Artisanal Cheeses",
    "Extra Virgin Olive Oil",
  ];

  const valuePoints = [
    "AI-powered matching between HoReCa buyers and vetted suppliers",
    "Transparent wholesale pricing and smart volume recommendations",
    "Reliable logistics planning for recurring B2B procurement",
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ee] text-[#3c0d14]">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 md:px-10 md:py-16">
        <header className="mb-20 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Iriska
          </span>
          <a
            href="#contact"
            className="rounded-full border border-[#c9a227] px-5 py-2 text-sm font-medium text-[#6e1a26] transition-colors hover:bg-[#c9a227]/10"
          >
            Request Access
          </a>
        </header>

        <section className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a0781f]">
              AI-powered B2B marketplace for HoReCa
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Source premium Mediterranean products with precision.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#5b2a33]">
              Iriska helps restaurants, hotels, and catering teams purchase
              wine, jamon, cheeses, and olive oil through one intelligent
              procurement platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-[#8b1e2d] px-6 py-3 text-sm font-semibold text-[#f8f4ee] transition-colors hover:bg-[#731724]"
              >
                Book a Demo
              </a>
              <a
                href="#products"
                className="rounded-full border border-[#8b1e2d]/25 px-6 py-3 text-sm font-semibold text-[#6e1a26] transition-colors hover:border-[#8b1e2d]/50"
              >
                Explore Categories
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#c9a227]/40 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#a0781f]">
              Why Iriska
            </p>
            <ul className="space-y-4 text-base leading-7 text-[#4b1e28]">
              {valuePoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#c9a227]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="products" className="mt-24">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#a0781f]">
            Product Portfolio
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {productCategories.map((product) => (
              <article
                key={product}
                className="rounded-2xl border border-[#8b1e2d]/15 bg-white/80 p-6"
              >
                <h2 className="text-xl font-semibold text-[#5c1622]">{product}</h2>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-24 rounded-3xl bg-[#8b1e2d] px-8 py-10 text-[#f8f4ee] md:px-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f0d98a]">
            For procurement teams
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Transform your HoReCa sourcing with data-backed buying decisions.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#f8e9cc]">
            Join Iriska to centralize supplier discovery, optimize order cycles,
            and scale quality across every location.
          </p>
          <a
            href="mailto:sales@iriska.com"
            className="mt-8 inline-flex rounded-full bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#4a151f] transition-colors hover:bg-[#ddb53a]"
          >
            Contact Sales
          </a>
        </section>
      </main>
    </div>
  );
}
