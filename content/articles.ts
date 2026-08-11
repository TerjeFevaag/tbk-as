export type Article = {
  slug: string;
  title: string;
  publishedAt: string; // ISO date, best-effort from original if findable, else omit precision to YYYY-MM
  excerpt: string;
  coverImage?: string;
  images?: string[]; // additional real photos shown after the article body
  body: string[]; // paragraphs, Norwegian, HTML-stripped
};

export const articles: Article[] = [
  {
    slug: "innregulering-varmeanlegg",
    title: "Innregulering Varmeanlegg",
    publishedAt: "2015-02-09",
    excerpt:
      "Et godt innregulert varmeanlegg gir lavere driftskostnader og bedre inneklima - ofte er innsparingen så stor at innreguleringen betaler seg selv det første driftsåret.",
    body: [
      "Innregulering av varmeanlegg er trolig den viktigste arbeidsoppgaven på ditt nye vannbårende varmesystem. Ett godt innregulert oppvarmingssystem bidrar til lave driftskostnader og et godt inneklima med høy komfort. Erfaring viser at kostnader til innregulering av varmeanlegg ofte er innspart det første driftsåret på grunn av vesentlig lavere fyringskostnader, en besparelse på 15-30% er ikke unormalt.",
    ],
  },
  {
    slug: "innregulering-ventilasjon",
    title: "Innregulering Ventilasjon",
    publishedAt: "2015-02-09",
    excerpt:
      "Riktig innregulering av ventilasjonsanlegget sikrer at prosjekterte luftmengder faktisk leveres til rommene, og er en forutsetning for lavt energiforbruk i moderne, behovsstyrte ventilasjonsanlegg.",
    coverImage: "/images/articles/innregulering-ventilasjon/ventilasjon-innregulering.jpg",
    images: [
      "/images/articles/innregulering-ventilasjon/ventilasjon-2.jpg",
      "/images/articles/innregulering-ventilasjon/ventilasjon-3.jpg",
    ],
    body: [
      "Innregulering av ventilasjonsanlegg er trolig den viktigste arbeidsoppgaven på ditt ventilasjons- og klimasystem. Innreguleringen er også funksjonskontroll som vil avdekke om de prosjekterte mengder og effekter leveres til ønsket rom. Dagens ventilasjonsanlegg er ofte komplekse da de skal samarbeide med byggets varme-, kjøle-, automatikk- og EL-anlegg. For å oppnå dagens krav til energiforbruk i bygninger er man avhengig av å benytte behovstyrte ventilasjonsanlegg som også samarbeider med bygget øvrige tekniske anlegg.",
      "Teknisk Byggkontroll utfører innregulering av VAV-, CAV- og DCV baserte ventilasjonsanlegg.",
    ],
  },
  {
    slug: "leier-du-ut-bolig",
    title: "Leier du ut bolig?",
    publishedAt: "2013-04-30",
    excerpt:
      "Alle som leier ut bolig plikter å kontrollere radonnivået i utleieboligen samt å gjøre eventuelle utbedringer ifølge kravene i strålevernforskriften, innen 1. januar 2014.",
    body: [
      "Alle som leier ut bolig plikter å kontrollere radonnivået i utleieboligen samt å gjøre eventuelle utbedringer ifølge kravene i strålevernforskriften, innen 1. januar 2014.",
      "Les mer om radonkontroll av utleiebolig her; Radonnytt.",
    ],
  },
  {
    slug: "lekker-boligen-din-varme",
    title: "Lekker boligen din varme?",
    publishedAt: "2013-05-12",
    excerpt:
      "Termografering avdekker isolasjonsfeil, kuldebroer og luftlekkasjer ved hjelp av varmekamera - en metode som kan vise akkurat hvor boligen din taper varme, spesielt om vinteren.",
    coverImage: "/images/articles/lekker-boligen-din-varme/termografi-varmebilde.gif",
    body: [
      "Termografering er en metode som avdekker mangelfull isolering, kuldebroer og luftlekkasjer.",
      "- Spesielt i vintermånedene, når temperaturforskjellen inne og ute er størst, kan det være store energitap i boliger. Vi tror mange vil bli overrasket når de ser hvor mye varme boligen deres lekker, og hvor lekkasjene er, sier spesialrådgiver Sverre Heimdal i Enova.",
      "Termografering er en metode for å avdekke mangelfull isolering, kuldebroer og luftlekkasjer. Undersøkelsen utføres av en termograf som analyserer bilder tatt med et spesialkamera som ser temperaturforskjeller.",
    ],
  },
  {
    slug: "prosjektledelse-frydenhaug-skole",
    title: "Prosjektledelse Frydenhaug skole",
    publishedAt: "2015-06-12",
    excerpt:
      "Teknisk Byggkontroll ledet VVS-prosjektet for Frydenhaug skole i Drammen - en 5500 m² passivhusskole med solenergi, energibrønner og komplett teknisk anlegg, til en total entreprisekostnad på 27 millioner kroner.",
    coverImage: "/images/articles/prosjektledelse-frydenhaug-skole/frydenhaug-skole.png",
    body: [
      "Teknisk Byggkontroll har utført prosjektledelse for VVS-entreprisen til ny passivhus skole for VITO teknisk entreprenør AS. Frydenhaug Skole er Drammen Kommunale Eiendoms nye flaggskip innen bygg med lave drift- og energikostnader.",
      "Ny spesialskole på 5500m2 for elever med spesielle behov. Skolen bygges som PassivHus med et prosjektmål på 37 Kw/h pr.m2 levert energi. Levering av total VVS teknisk anlegg med solenergi og varme/kjøling fra energibrønner. Levert 70.000m3/h behandlet luft og 5.000m3/h aggregat til terapibasseng.",
      "Komplett sanitæranlegg, varmeanlegg med vannbåren gulvvarme og 300 m2 snøsmelteanlegg med komplett SD-anlegg. Bygget er fullsprinklet.",
      "Total entreprisekostnad kr 27 mill.",
    ],
  },
  {
    slug: "radonmaling-vinterhalvaret",
    title: "Radonmåling i vinterhalvåret!",
    publishedAt: "2015-02-09",
    excerpt:
      "Radonmåling bør gjennomføres i den kalde årstiden, med sporfilm over minst to måneder fra midten av oktober til midten av april, for å få et representativt resultat.",
    body: [
      "Nå er tiden inne for å gjennomføre måling av radon i ditt bygg. Radon skal måles i den kalde årstiden da radoninnholdet i luften er mest stabil. Godkjent radonmåling utføres med sporfilm i minimum 2 måneder, fortrinnsvis i perioden midten av oktober til midten av april. Ta kontakt med Teknisk Byggkontroll for gjennomføring av radonmåling og eventuelt avklaring av nødvendige tiltak.",
    ],
  },
];
