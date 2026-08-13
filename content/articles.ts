export type ArticleSection = {
  heading: string;
  body?: string[]; // paragraphs under the heading
  items?: string[]; // optional bullet list after the paragraphs
  diagram?: string; // optional named schematic rendered after body/items (see ArticleDiagram)
};

export type ArticleImage = {
  src: string; // path under /public/images
  alt: string; // descriptive alt text (accessibility + SEO)
  caption?: string; // optional visible caption shown under the image
};

export type Article = {
  slug: string;
  title: string;
  publishedAt: string; // ISO date, best-effort from original if findable, else omit precision to YYYY-MM
  updatedAt?: string; // ISO date of a substantial rewrite/refresh; shown as "Oppdatert" and emitted as dateModified
  excerpt: string;
  coverImage?: string;
  images?: ArticleImage[]; // additional real photos shown after the article body
  body: string[]; // lead paragraphs, Norwegian, HTML-stripped
  // Optional richer structure (H2 headings + paragraphs + bullets) rendered
  // after the lead paragraphs. Articles without this keep rendering just `body`.
  sections?: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "innregulering-varmeanlegg",
    title: "Innregulering av varmeanlegg",
    publishedAt: "2015-02-09",
    updatedAt: "2026-08-13",
    excerpt:
      "Et riktig innregulert varmeanlegg gir jevn temperatur, lavere energibruk og bedre komfort. I dårlig innregulerte anlegg er sparepotensialet så stort at innreguleringen ofte betaler seg selv i løpet av kort tid.",
    body: [
      "Innregulering er trolig den viktigste – og mest oversette – arbeidsoppgaven på et nytt vannbårent varmeanlegg. Et riktig innregulert anlegg leverer riktig vannmengde til hver kurs, gir jevn temperatur i hele bygget og lar varmekilden arbeide effektivt. Resultatet er lavere driftskostnader, bedre komfort og mindre slitasje på pumper og ventiler.",
    ],
    sections: [
      {
        heading: "Hva er innregulering av et varmeanlegg?",
        body: [
          "Vannet i et varmeanlegg følger naturlig veien med minst motstand. Uten innregulering får kurser nær pumpen for stor vannmengde, mens kurser lenger unna får for lite. Noen rom blir for varme, mens andre aldri når ønsket temperatur.",
          "Ved innregulering måles og justeres vannmengdene slik at radiatorer, gulvvarmekurser og varmebatterier får akkurat den mengden de er dimensjonert for. Arbeidet utføres normalt etter proporsjonalmetoden, der strupe- og reguleringsventiler forinnstilles og deretter kontrollmåles mot prosjekterte verdier.",
        ],
        diagram: "innregulering-balansering",
      },
      {
        heading: "Tegn på at anlegget ikke er innregulert",
        items: [
          "Ujevn temperatur – noen rom blir for varme, andre for kalde.",
          "Sus og støy i ventiler og rør.",
          "Høyere energibruk enn forventet.",
          "Pumpen går på høy hastighet for å kompensere.",
          "Liten forskjell mellom tur- og returtemperatur (lav ΔT).",
          "Manglende dokumentasjon på vannmengder og tidligere innregulering.",
        ],
      },
      {
        heading: "Hva vi kontrollerer og justerer",
        body: [
          "En grundig innregulering handler om mer enn å skru på en ventil. Vi gjennomgår anleggsunderlaget og kontrollerer at anlegget fungerer slik det er prosjektert:",
        ],
        items: [
          "Forinnstilling av strupe- og reguleringsventiler mot beregnede vannmengder.",
          "Måling av vannmengder og differansetrykk på tvers av anlegget.",
          "Innstilling av differansetrykkregulatorer der anlegget har variabel last.",
          "Kontroll og optimalisering av turtallsstyrt sirkulasjonspumpe.",
          "Kontroll av tur- og returtemperatur (ΔT) mot prosjekterte verdier.",
          "Funksjonskontroll av reguleringen, slik at ventiler og romstyring reagerer stabilt.",
        ],
      },
      {
        heading: "Hvor mye kan du spare?",
        body: [
          "Sparepotensialet avhenger av anleggets tilstand. I anlegg som allerede fungerer godt, er gevinsten gjerne 5–15 %. I eldre eller dårlig innregulerte anlegg rapporterer bransjen ofte 20–30 % lavere energibruk til oppvarming.",
          "Besparelsen kommer først og fremst fra mindre overoppvarming, lavere pumpehastighet og redusert differansetrykk, og fra bedre temperaturforskjell mellom tur- og returvann. En lav returtemperatur gir i tillegg høyere virkningsgrad for kondenserende kjeler og varmepumper.",
          "Fordi driftskostnadene faller umiddelbart, er det ikke uvanlig at innreguleringen er tjent inn allerede det første driftsåret.",
        ],
      },
      {
        heading: "Dokumentert resultat: innreguleringsprotokollen",
        body: [
          "Arbeidet avsluttes med en innreguleringsprotokoll som dokumenterer både prosjekterte og målte verdier, i tråd med anerkjent metodikk og gjeldende krav til vannbårne varmeanlegg (blant annet NS-EN 14336). Protokollen viser at anlegget faktisk leverer de vannmengdene det er dimensjonert for, og gir et etterprøvbart grunnlag for videre drift, vedlikehold og energioppfølging.",
          "Som uavhengig kontrollør er vi ikke bundet til noen leverandør eller entreprenør. Vi dokumenterer tilstanden slik den er – ikke slik den burde vært.",
        ],
      },
      {
        heading: "Når bør varmeanlegget innreguleres?",
        items: [
          "Ved ferdigstillelse av et nytt bygg eller varmeanlegg.",
          "Etter ombygging, utvidelse eller utskifting av pumper, ventiler eller varmekilde.",
          "Når bygget har vedvarende ujevn temperatur eller støy i anlegget.",
          "Når energibruken er høyere enn forventet.",
          "Når anlegget ikke oppnår ønsket tur- og returtemperatur.",
          "Når det mangler dokumentasjon på tidligere innregulering.",
        ],
      },
      {
        heading: "Trenger anlegget ditt en gjennomgang?",
        body: [
          "Har bygget ujevn varme, støy eller unormalt høyt energiforbruk, bør vannmengder og innregulering kontrolleres. Ta kontakt for en uforpliktende vurdering av anlegget.",
        ],
      },
    ],
  },
  {
    slug: "innregulering-ventilasjon",
    title: "Innregulering av ventilasjonsanlegg",
    publishedAt: "2015-02-09",
    updatedAt: "2026-08-13",
    excerpt:
      "Riktig innregulering sikrer at prosjekterte luftmengder faktisk leveres til hvert rom. Det er en forutsetning for godt inneklima og lavt energiforbruk i moderne, behovsstyrte ventilasjonsanlegg.",
    coverImage: "/images/articles/innregulering-ventilasjon/ventilasjon-2.jpg",
    images: [
      {
        src: "/images/articles/innregulering-ventilasjon/ventilasjon-innregulering.jpg",
        alt: "Kontrollør måler luftmengde med målehette (balometer) på en takventil.",
        caption:
          "Luftmengdene måles på hver ventil med målehette (balometer) og sammenlignes med prosjekterte verdier.",
      },
      {
        src: "/images/articles/innregulering-ventilasjon/ventilasjon-3.jpg",
        alt: "Måling av luftmengde med målehette på et større ventilasjonsanlegg.",
        caption:
          "Måling og justering utføres punkt for punkt til hele anlegget er i balanse.",
      },
    ],
    body: [
      "Innregulering er trolig den viktigste arbeidsoppgaven på et nytt ventilasjonsanlegg – og samtidig en funksjonskontroll. Den avdekker om anlegget faktisk leverer de prosjekterte luftmengdene til hvert rom. Uten riktig innregulering får noen rom for lite luft og dårlig inneklima, mens andre får for mye – med unødvendig energibruk, trekk og støy som resultat.",
    ],
    sections: [
      {
        heading: "Hva er innregulering av et ventilasjonsanlegg?",
        body: [
          "Ved innregulering måles luftmengdene til og fra alle rom, og spjeld og ventiler justeres slik at hvert rom får den mengden det er prosjektert for. Luftmengdene måles på ventiler og armaturer med målehette (balometer), og anlegget balanseres normalt etter proporsjonalmetoden.",
          "Prinsippet i proporsjonalmetoden er at forholdet mellom luftmengdene i to grener holder seg konstant selv om totalmengden endres. Da kan man balansere grenene mot hverandre først, og justere hovedmengden til slutt – uten å måtte gå tilbake og korrigere.",
        ],
      },
      {
        heading: "Moderne anlegg er behovsstyrte",
        body: [
          "Dagens ventilasjonsanlegg er ofte komplekse. De skal samarbeide med byggets varme-, kjøle-, automatikk- og el-anlegg, og for å nå energikravene benyttes som regel behovsstyrt ventilasjon (DCV). Da reguleres luftmengden automatisk etter målt behov i hvert rom – for eksempel CO₂, temperatur eller tilstedeværelse.",
          "Teknisk Byggkontroll utfører innregulering av VAV- (variabel), CAV- (konstant) og DCV-baserte (behovsstyrte) anlegg. Behovsstyrte anlegg krever i tillegg idriftsettelse under normale driftsforhold, der samspillet mellom ventilasjon, varme og kjøling kontrolleres (jf. NS-EN 12599).",
        ],
      },
      {
        heading: "Hvorfor er innregulering viktig?",
        body: ["Et anlegg som ikke er innregulert, gir en rekke problemer:"],
        items: [
          "For lite luft i enkelte rom – dårlig inneklima, høy CO₂ og tung luft.",
          "For mye luft i andre rom – unødvendig energibruk, trekk og støy.",
          "Ubalanse mellom tilluft og avtrekk – kan gi fukt- og trykkproblemer i bygget.",
          "Høyere vifteeffekt (SFP) enn nødvendig.",
          "Behovsstyring og automatikk som ikke fungerer som forutsatt.",
        ],
      },
      {
        heading: "Sammenhengen med energibruk",
        body: [
          "I moderne bygg er det først og fremst reduserte luftmengder gjennom behovsstyring og lavere spesifikk vifteeffekt (SFP) som gir energibesparelse. Et riktig innregulert anlegg med lavt kanaltrykk lar viftene arbeide effektivt og bruker bare den luften som faktisk trengs.",
          "Feil innregulering trekker i motsatt retning: viftene må kompensere med høyere trykk og turtall, og anlegget bruker mer energi enn nødvendig – ofte uten at inneklimaet blir bedre.",
        ],
      },
      {
        heading: "Hva innreguleringen omfatter",
        body: [
          "En fullstendig innregulering dokumenterer at anlegget leverer som prosjektert:",
        ],
        items: [
          "Måling av luftmengder til og fra alle rom med målehette.",
          "Justering av spjeld og ventiler etter proporsjonalmetoden.",
          "Kontroll av totale tilluft- og avtrekksmengder og balansen mellom dem.",
          "Kontroll av vifter, kanaltrykk og spesifikk vifteeffekt (SFP).",
          "Funksjonskontroll av behovsstyring og samspill med varme og kjøling.",
          "Innreguleringsprotokoll med prosjekterte og målte verdier.",
        ],
      },
      {
        heading: "Dokumentert resultat",
        body: [
          "Arbeidet avsluttes med en innreguleringsprotokoll som viser prosjekterte og målte luftmengder for hvert punkt i anlegget. Protokollen dokumenterer at anlegget faktisk leverer det som er prosjektert, og gir et etterprøvbart grunnlag for drift, vedlikehold og energioppfølging – i tråd med kravene til måling og kontroll i NS-EN 12599.",
          "Som uavhengig kontrollør er vi ikke bundet til noen leverandør eller entreprenør. Vi dokumenterer tilstanden slik den er.",
        ],
      },
      {
        heading: "Når bør anlegget innreguleres?",
        items: [
          "Ved ferdigstillelse av et nytt ventilasjonsanlegg.",
          "Etter ombygging, utvidelse eller endret bruk av lokalene.",
          "Etter utskifting av vifter, aggregat eller automatikk.",
          "Når rom har dårlig inneklima, trekk eller støy fra anlegget.",
          "Når energibruken til ventilasjon er høyere enn forventet.",
          "Når det mangler dokumentasjon på tidligere innregulering.",
        ],
      },
      {
        heading: "Trenger anlegget ditt en gjennomgang?",
        body: [
          "Har bygget rom med dårlig luft, trekk, støy eller høyt energiforbruk, bør luftmengdene og innreguleringen kontrolleres. Ta kontakt for en uforpliktende vurdering av anlegget.",
        ],
      },
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
    coverImage: "/images/articles/radonmaling-vinterhalvaret/radon-illustrasjon.jpg",
    body: [
      "Nå er tiden inne for å gjennomføre måling av radon i ditt bygg. Radon skal måles i den kalde årstiden da radoninnholdet i luften er mest stabil. Godkjent radonmåling utføres med sporfilm i minimum 2 måneder, fortrinnsvis i perioden midten av oktober til midten av april. Ta kontakt med Teknisk Byggkontroll for gjennomføring av radonmåling og eventuelt avklaring av nødvendige tiltak.",
    ],
  },
];
