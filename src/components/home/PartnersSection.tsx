import { useLanguage } from "@/contexts/LanguageContext";
import { Marquee } from "@/components/ui/marquee";

const partners = [
  { name: "University of Manchester", logo: "/partners/manchester.svg", url: "https://www.manchester.ac.uk" },
  { name: "University of Leeds", logo: "/partners/leeds.svg", url: "https://www.leeds.ac.uk" },
  { name: "University of Sunderland", logo: "/partners/sunderland.svg", url: "https://www.sunderland.ac.uk" },
  { name: "Middlesex University", logo: "/partners/middlesex.svg", url: "https://www.mdx.ac.uk" },
  { name: "University of Toronto", logo: "/partners/toronto.svg", url: "https://www.utoronto.ca" },
  { name: "Monash University", logo: "/partners/monash.svg", url: "https://www.monash.edu" },
  { name: "University of Melbourne", logo: "/partners/melbourne.svg", url: "https://www.unimelb.edu.au" },
  { name: "University of Auckland", logo: "/partners/auckland.svg", url: "https://www.auckland.ac.nz" },
  { name: "University of Canterbury", logo: "/partners/canterbury.svg", url: "https://www.canterbury.ac.nz" },
  { name: "University of Malaya", logo: "/partners/malaya.svg", url: "https://www.um.edu.my" },
];

const firstRow = partners.slice(0, partners.length / 2);
const secondRow = partners.slice(partners.length / 2);

const PartnerCard = ({ p }: { p: typeof partners[0] }) => {
  const isIcon = p.logo.endsWith('.svg');
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      title={p.name}
      className="flex-shrink-0 w-[82px] sm:w-auto sm:min-w-[200px] h-[50px] sm:h-[90px] flex items-center justify-center px-1 sm:px-4 hover:scale-105 transition-all duration-300 mx-0.5 sm:mx-2"
    >
      {isIcon ? (
        <div className="flex items-center gap-1 sm:gap-3 w-full justify-center">
          <img
            src={p.logo}
            alt=""
            className="w-5 h-5 sm:w-12 sm:h-12 object-contain mix-blend-multiply dark:mix-blend-normal"
            loading="lazy"
          />
          <span className="font-heading font-medium text-[8px] sm:text-[17px] leading-tight tracking-tight text-[#141C3A] dark:text-white max-w-[48px] sm:max-w-[140px] text-left">
            {p.name}
          </span>
        </div>
      ) : (
        <img
          src={p.logo}
          alt={p.name}
          className="max-w-[70px] max-h-[38px] sm:max-w-[180px] sm:max-h-[70px] object-contain mix-blend-multiply dark:mix-blend-normal"
          loading="lazy"
        />
      )}
    </a>
  );
};

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">{t.partners.title}</h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2 max-w-xl mx-auto">{t.partners.subtitle}</p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 gap-3 sm:gap-8">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((p, i) => (
            <PartnerCard key={i} p={p} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((p, i) => (
            <PartnerCard key={i} p={p} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
};

export default PartnersSection;
