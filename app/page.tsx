import { Logo } from "@/components/Logo";

const curatedProducts = [
  {
    name: "Rioja Reserva 2019",
    origin: "La Rioja, ES",
    trust: 98,
    price: "€24",
  },
  {
    name: "Manchego 12-month",
    origin: "La Mancha, ES",
    trust: 94,
    price: "€38",
  },
  {
    name: "Koroneiki EV Oil",
    origin: "Crete, GR",
    trust: 92,
    price: "€18",
  },
];

export default function Home() {
  const valuePoints = [
    "AI-powered matching between HoReCa buyers and vetted suppliers",
    "Transparent wholesale pricing and smart volume recommendations",
    "Reliable logistics planning for recurring B2B procurement",
  ];

  return (
    <div className="min-h-screen bg-linen text-ink">
      <main className="max-w-content mx-auto flex w-full flex-col px-6 py-12 md:px-10 md:py-16">
        <header className="mb-20 flex items-center justify-between">
          <Logo width={180} priority />
          <a
            href="#contact"
            className="rounded-full bg-burgundy px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-burgundy-deep"
          >
            Request Access
          </a>
        </header>

        <section className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              AI-powered B2B marketplace for HoReCa
            </p>
            <h1 className="font-display max-w-3xl text-5xl italic leading-[1.02] tracking-[-0.035em] text-burgundy-deep md:text-7xl">
              Source premium Mediterranean products with precision.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-graphite">
              The Mediterranean, well-chosen.
            </p>
            <p className="max-w-xl text-lg leading-8 text-graphite">
              Iriska helps restaurants, hotels, and catering teams purchase
              wine, jamon, cheeses, and olive oil through one intelligent
              procurement platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-burgundy-deep"
              >
                Book a Demo
              </a>
              <a
                href="#products"
                className="rounded-full border border-pebble/60 px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy/40"
              >
                Explore Categories
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-pebble/60 bg-cream p-8">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              Why Iriska
            </p>
            <ul className="space-y-4 text-base leading-7 text-graphite">
              {valuePoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-olive" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="products" className="mt-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            Product Portfolio
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curatedProducts.map((product) => (
              <article
                key={product.name}
                className="rounded-2xl border border-pebble/60 bg-cream p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-pebble/60 bg-bone px-3 py-1 text-xs font-medium text-graphite">
                    <span
                      aria-hidden
                      className="grid h-5 w-5 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(#722f3a ${product.trust}%, #ede5d4 ${product.trust}% 100%)`,
                      }}
                    >
                      <span className="h-3 w-3 rounded-full bg-cream" />
                    </span>
                    Trust {product.trust}
                  </div>
                  <p className="text-lg font-semibold text-burgundy">{product.price}</p>
                </div>
                <h2 className="text-xl font-semibold text-ink">{product.name}</h2>
                <p className="mt-2 text-sm text-stone">{product.origin}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-24 rounded-3xl bg-burgundy px-8 py-10 text-cream md:px-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre-soft">
            For procurement teams
          </p>
          <h2 className="font-display mt-4 text-3xl italic leading-tight md:text-4xl">
            Transform your HoReCa sourcing with data-backed buying decisions.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream/85">
            Join Iriska to centralize supplier discovery, optimize order cycles,
            and scale quality across every location.
          </p>
          <a
            href="mailto:sales@iriska.com"
            className="mt-8 inline-flex rounded-full bg-cream px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-bone"
          >
            Contact Sales
          </a>
        </section>
      </main>
    </div>
  );
}
