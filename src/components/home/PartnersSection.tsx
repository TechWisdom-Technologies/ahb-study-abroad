import { useLanguage } from "@/contexts/LanguageContext";

const partners = [
  { name: "University of Manchester", logo: "/partners/manchester.svg", url: "https://www.manchester.ac.uk" },
  { name: "University of Leeds", logo: "/partners/leeds.svg", url: "https://www.leeds.ac.uk" },
  { name: "Coventry University", logo: "/partners/coventry.png", url: "https://www.coventry.ac.uk" },
  { name: "University of Sunderland", logo: "/partners/sunderland.svg", url: "https://www.sunderland.ac.uk" },
  { name: "Middlesex University", logo: "/partners/middlesex.svg", url: "https://www.mdx.ac.uk" },
  { name: "University of Toronto", logo: "/partners/toronto.svg", url: "https://www.utoronto.ca" },
  { name: "Monash University", logo: "/partners/monash.svg", url: "https://www.monash.edu" },
  { name: "University of Melbourne", logo: "/partners/melbourne.svg", url: "https://www.unimelb.edu.au" },
  { name: "University of Auckland", logo: "/partners/auckland.svg", url: "https://www.auckland.ac.nz" },
  { name: "University of Canterbury", logo: "/partners/canterbury.svg", url: "https://www.canterbury.ac.nz" },
  { name: "University of Malaya", logo: "/partners/malaya.svg", url: "https://www.um.edu.my" },
  { name: "Taylor's University", logo: "/partners/taylors.png", url: "https://university.taylors.edu.my" },
];

const chunkSize = Math.ceil(partners.length / 3);
const rows = Array.from({ length: 3 }, (_, i) =>
  partners.slice(i * chunkSize, (i + 1) * chunkSize)
);

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">{t.partners.title}</h2>
      </div>
      <div className="space-y-5">
        {rows.map((row, rowIdx) => {
          const isReverse = rowIdx % 2 === 1;
          const items = [...row, ...row, ...row];
          return (
            <div key={rowIdx} className="overflow-hidden relative">
              <div className={`flex gap-8 items-center ${isReverse ? "animate-ticker-reverse" : "animate-ticker"}`}>
                {items.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={p.name}
                    className="flex-shrink-0 w-[200px] h-[80px] bg-white border border-border rounded flex items-center justify-center p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PartnersSection;
