export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  // Path under /public/images. Omit entirely when no real photo exists yet
  // for this service — presence of heroImage is what decides whether the
  // real image or the styled gradient placeholder renders (see Task 8).
  heroImage?: string;
  galleryImages?: string[]; // additional real photos shown further down the detail page (Task 8)
  // A single striking figure pulled from the copy, shown as a stat callout.
  stat?: { value: string; label: string };
  // 3 short, scannable facts shown in the detail page's sidebar card.
  quickFacts?: string[];
  sections: {
    heading: string;
    body: string[]; // body = paragraphs
    items?: string[]; // optional bullet list rendered right after body, tied to this section's lead-in
  }[];
  // Bullet groups NOT tied to a specific section's lead-in sentence.
  bullets?: {
    heading: string;
    items: string[];
    // "steps" renders a numbered sequence (use only for a genuine ordered process).
    style?: "steps" | "list";
  }[];
};

export const services: Service[] = [
  {
    slug: "innregulering",
    name: "Innregulering",
    shortDescription:
      "Innregulering av varme- og kjøleanlegg gir jevnere temperatur, lavere energibruk og bedre komfort.",
    heroImage: "/images/services/innregulering/innregulering-1.png",
    stat: { value: "5–15 %", label: "typisk lavere energibruk til oppvarming og kjøling" },
    quickFacts: [
      "Gjelder: Varme- og kjøleanlegg",
      "Energibesparelse: 5–15 % (opptil 20 % i dårlig innregulerte anlegg)",
      "Resultat: Dokumentert innreguleringsrapport",
    ],
    sections: [
      {
        heading: "Hvorfor bør varme- og kjøleanlegg innreguleres",
        body: [
          "Et riktig innregulert varme- og kjøleanlegg gir jevnere temperatur, lavere energibruk og bedre komfort. Samtidig reduseres belastningen på pumper, ventiler og annet teknisk utstyr.",
          "Innregulering handler om å kontrollere og justere vannmengdene i anlegget, slik at hver del av bygget får riktig effekt til riktig tid. Det kan gi betydelige besparelser - særlig i bygg der anlegget er gammelt, bygget om eller ikke tidligere er kontrollert.",
        ],
      },
      {
        heading: "Hva er innregulering?",
        body: [
          "Vannet i et varme- eller kjøleanlegg følger naturlig den veien som har minst motstand. Uten riktig innregulering kan områder nær pumpen få for stor vannmengde, mens fjernere deler av anlegget får for lite.",
          "Resultatet kan være at noen rom blir for varme eller kalde, mens andre ikke oppnår ønsket temperatur. Anlegget forsøker gjerne å kompensere med høyere pumpehastighet, større effekt eller unødvendig høye og lave temperaturer. Dette øker energibruken uten nødvendigvis å gi bedre komfort.",
          "Ved innregulering måles og justeres vannmengdene, slik at radiatorer, varmebatterier, kjølebatterier, gulvvarmekurser og andre komponenter får mengden de er dimensjonert for.",
        ],
      },
      {
        heading: "Hvor mye energi kan man spare?",
        body: [
          "Et realistisk anslag er ofte 5-15 % lavere energibruk til oppvarming og kjøling. I dårlig innregulerte anlegg kan sparepotensialet være 10-20 %, mens gevinsten normalt er lavere i anlegg som allerede fungerer godt.",
          "Besparelsen kommer hovedsakelig fra mindre overoppvarming og overkjøling av rom, lavere pumpehastighet og redusert differansetrykk, bedre temperaturforskjell mellom tur- og returvann, høyere virkningsgrad for varmepumper, kjeler og kjølemaskiner, og mer stabil regulering med mindre pendling i ventiler og temperaturer.",
          "Hvor mye som faktisk kan spares, avhenger blant annet av anleggets tilstand, driftstider, vannmengder, temperaturer, pumpeeffekt og hvordan bygget brukes.",
          "Eksempel på mulig besparelse: Dersom et bygg bruker 500 000 kWh per år til varme og kjøling, og energiprisen er 1,50 kr/kWh, kan besparelsen bli: ved 5 % reduksjon, 25 000 kWh spart, som gir 37 500 kr; ved 10 % reduksjon, 50 000 kWh spart, som gir 75 000 kr; ved 15 % reduksjon, 75 000 kWh spart, som gir 112 500 kr; ved 20 % reduksjon, 100 000 kWh spart, som gir 150 000 kr.",
          "Ved en forventet energireduksjon på 10 % vil bygget spare omtrent 50 000 kWh eller 75 000 kroner per år.",
        ],
      },
      {
        heading: "Hva bør en innregulering omfatte?",
        body: [
          "En grundig innregulering bør normalt omfatte kontroll av anleggsunderlaget, måling av vannmengder og differansetrykk, justering av ventiler og pumper samt kontroll av temperaturer og reguleringsfunksjon.",
          "Arbeidet avsluttes med en innreguleringsrapport som dokumenterer prosjekterte og målte verdier. Rapporten gir et godt grunnlag for videre drift, vedlikehold og energioppfølging.",
        ],
      },
      {
        heading: "Riktig effekt på riktig sted",
        body: [
          "Innregulering sørger for at varme- og kjøleanlegget leverer riktig effekt der behovet er - uten å bruke mer energi enn nødvendig. Resultatet er bedre inneklima, mer stabil drift, lavere kostnader og et anlegg som fungerer slik det er dimensjonert.",
          "Har bygget ujevne temperaturer, støy eller unormalt høy energibruk, bør vannmengder og innregulering kontrolleres.",
        ],
      },
    ],
    bullets: [
      {
        heading: "Fordeler med riktig innregulering",
        items: [
          "Jevnere temperatur: Riktig fordeling av varme og kjøling gir bedre komfort og færre klager på varme eller kalde rom.",
          "Lavere energibruk: Pumper, kjeler, varmepumper og kjølemaskiner kan arbeide mer effektivt.",
          "Mindre støy: Korrekte vannmengder og trykk reduserer risikoen for sus og støy i ventiler og rør.",
          "Bedre regulering: Ventiler og romregulering reagerer mer stabilt og presist.",
          "Riktig temperaturdifferanse: Anlegget oppnår bedre samsvar med prosjektert forskjell mellom tur- og returtemperatur.",
          "Lengre levetid: Pumper, ventiler og produksjonsutstyr utsettes for mindre unødvendig belastning.",
          "Dokumentert funksjon: Målinger og innreguleringsprotokoll viser om anlegget leverer de prosjekterte vannmengdene.",
        ],
      },
      {
        heading: "Når bør anlegget innreguleres?",
        items: [
          "Etter oppføring av et nytt bygg.",
          "Etter ombygging eller utvidelse av anlegget.",
          "Etter utskifting av pumper, ventiler eller varme- og kjøleutstyr.",
          "Når bygget har vedvarende problemer med ujevne temperaturer.",
          "Når det oppstår støy i ventiler og rørsystemer.",
          "Når energibruken er høyere enn forventet.",
          "Når anlegget ikke oppnår ønsket tur- og returtemperatur.",
          "Når det mangler dokumentasjon på vannmengder og tidligere innregulering.",
        ],
      },
    ],
  },
  {
    slug: "uavhengig-kontroll-i-byggesak",
    name: "Uavhengig kontroll i byggesak",
    shortDescription:
      "Uavhengig kontroll for tiltaksklasse 1 sikrer at våtrom og lufttetthet oppfyller kravene i plan- og bygningsloven.",
    // No real photo exists yet for this service; heroImage is intentionally
    // omitted so the page falls back to the styled gradient placeholder.
    quickFacts: [
      "Gjelder: Tiltaksklasse 1",
      "Fokus: Våtrom og lufttetthet",
      "Resultat: Uavhengig sluttdokumentasjon",
    ],
    sections: [
      {
        heading: "Hvorfor uavhengig kontroll?",
        body: [
          "Dette reduserer fuktskader, radon- og inneklimaproblemer og gir trygg dokumentasjon ved overtakelse.",
        ],
      },
    ],
    bullets: [
      {
        heading: "Hva kontrolleres?",
        items: [
          "Våtrom: fuktsikring, membran, sluk- og avløpsdetaljer, tettsjikt og dokumentasjon av produkter/montasje.",
          "Lufttetthet: utførelse av oppspenning, gjennomføringer, tetting av overganger og testing (blowdoor/trykktest) der nødvendig.",
        ],
      },
      {
        heading: "Hvordan gjennomføres kontrollen?",
        style: "steps",
        items: [
          "Avtale om omfang og kontrollpunkter",
          "Dokumentgjennomgang av tegninger og produktdokumentasjon",
          "Stedlig inspeksjon og stikkprøver under og etter arbeid",
          "Rapport med avvik, krav til utbedring og sluttdokumentasjon",
        ],
      },
      {
        heading: "Fordeler",
        items: [
          "Mindre risiko for fuktskader og mugg",
          "Bedre inneklima og energieffektivitet",
          "Klare dokumenter ved salg eller garantioppfølging",
        ],
      },
    ],
  },
  {
    slug: "sprinklerkontroll",
    name: "Sprinklerkontroll",
    shortDescription:
      "FG-kontroll av sprinkleranlegg avdekker feil, mangler og endringer som kan redusere anleggets evne til å begrense eller slokke en brann.",
    heroImage: "/images/services/sprinkler/sprinkler-1.jpg",
    galleryImages: [
      "/images/services/sprinkler/sprinkler-2.jpg",
      "/images/services/sprinkler/sprinkler-3.jpg",
      "/images/services/sprinkler/sprinkler-4.jpg",
      "/images/services/sprinkler/sprinkler-5.png",
    ],
    stat: { value: "FG", label: "kontroll utført etter gjeldende FG-regler og prosjekteringsstandard" },
    quickFacts: [
      "Kontrollmetode: FG-kontroll",
      "Utføres av: Kvalifisert personell",
      "Dokumentasjon: Rapport med avvik, registrert i FG-kontroll",
    ],
    sections: [
      {
        heading: "FG-kontroll av sprinkleranlegg",
        body: [
          "Et sprinkleranlegg skal være klart til å fungere når det virkelig gjelder. Regelmessig kontroll bidrar til å avdekke feil, mangler og endringer som kan redusere anleggets evne til å begrense eller slokke en brann.",
          "Vi utfører kontroll av automatiske sprinkleranlegg i samsvar med gjeldende FG-regler og relevant prosjekteringsstandard. Kontrollen gjennomføres av kvalifisert personell og dokumenteres i FG-kontroll.",
        ],
      },
      {
        heading: "Hva er en FG-kontroll?",
        body: [
          "FG-kontroll er en uavhengig og systematisk vurdering av sprinkleranleggets tilstand, funksjon og dokumentasjon. Formålet er å kontrollere om anlegget er utført og vedlikeholdt i samsvar med kravene som gjelder for bygget.",
          "FG-kontroll er også en digital løsning for registrering av kontroller, dokumentasjon og oppfølging av avvik. Løsningen tilhører Finans Norge Forsikringsdrift og administreres av FG Skadeteknikk.",
          "Kontrollen utføres etter gjeldende FG-regler for faste automatiske vannbaserte slokkeanlegg.",
        ],
      },
      {
        heading: "Hvorfor er sprinklerkontroll viktig?",
        body: [
          "Sprinkleranlegg påvirkes over tid av bruk, vedlikehold og endringer i bygget. Ombygging, nye vegger, endret lagringshøyde eller tildekking av sprinklerhoder kan føre til at anlegget ikke lenger gir den beskyttelsen det opprinnelig ble dimensjonert for.",
          "En FG-kontroll kan blant annet bidra til:",
        ],
        items: [
          "Økt brannsikkerhet: Feil som kan svekke anleggets funksjon, blir avdekket.",
          "Tidlig oppdagelse av avvik: Mangler kan rettes før de får alvorlige konsekvenser.",
          "Bedre dokumentasjon: Eier får en oversiktlig rapport over anleggets tilstand.",
          "Oppfølging av myndighets- og forsikringskrav: Kontrollen bidrar til dokumentert sikkerhetsarbeid.",
          "Tryggere drift: Regelmessig kontroll reduserer risikoen for at skjulte feil blir stående over tid.",
          "Enklere vedlikehold: Rapporten gir et godt grunnlag for prioritering og utbedring.",
        ],
      },
      {
        heading: "Hva kontrolleres?",
        body: [
          "Kontrollens omfang tilpasses anleggstype, byggets bruk, aktuell standard og tilgjengelig dokumentasjon.",
          "Kontrollen er normalt en stikkprøvebasert tilstandsvurdering og må ikke forveksles med service eller full funksjonsprøving av alle komponenter.",
          "En kontroll kan blant annet omfatte:",
        ],
        items: [
          "Kontroll av sprinklerhoder, rørnett, ventiler og alarmsystemer.",
          "Visuell vurdering av korrosjon, skader, lekkasjer og tildekking.",
          "Kontroll av vannforsyning, trykk og tilgjengelig kapasitet.",
          "Funksjonsprøving av alarmventiler, vannstrømsalarmer og overvåkede ventiler.",
          "Kontroll av plassering, avstander og fri klaring rundt sprinklerhoder.",
          "Vurdering av om rominndeling, bruk eller lagring er endret.",
          "Gjennomgang av tegninger, beregninger, tidligere rapporter og annen dokumentasjon.",
          "Kontroll av merking, tilgjengelighet og rutiner for ettersyn og vedlikehold.",
        ],
      },
      {
        heading: "Hvilke avvik kan bli avdekket?",
        body: ["Vanlige avvik kan være:"],
        items: [
          "Tildekkede, skadde eller feilplasserte sprinklerhoder.",
          "For liten avstand mellom lagrede varer og sprinklerhoder.",
          "Stengte eller mangelfullt overvåkede ventiler.",
          "Manglende eller ufullstendig dokumentasjon.",
          "Endringer i bygget som ikke er vurdert mot sprinkleranlegget.",
          "Korrosjon, lekkasjer eller mekaniske skader.",
          "Manglende prøving, service eller vedlikehold.",
          "Utilstrekkelig vannforsyning eller ukjent kapasitet.",
          "Feil klassifisering i forhold til byggets faktiske bruk og risiko.",
        ],
      },
      {
        heading: "Rapportering og oppfølging",
        body: [
          "Etter gjennomført kontroll utarbeides en rapport som beskriver hva som er kontrollert, hvilke observasjoner som er gjort, og hvilke avvik som bør følges opp. Kontrollen og avvikene registreres i FG-kontroll, slik at bygningseier får dokumentasjon og oversikt over videre oppfølging.",
          "Avvik bør vurderes og utbedres av kompetent sprinklerforetak. Når utbedringene er gjennomført, må de dokumenteres og lukkes på riktig måte. FG-kontroll erstatter ikke bygningseierens ansvar for løpende ettersyn, service og vedlikehold.",
        ],
      },
      {
        heading: "Når bør kontrollen gjennomføres?",
        body: [
          "Behovet og intervallet bestemmes av gjeldende regelverk, aktuell standard, forsikringsvilkår og byggets forutsetninger. Kontroll er særlig aktuelt:",
        ],
        items: [
          "Ved ferdigstillelse av et nytt sprinkleranlegg.",
          "Etter større ombygginger eller endret bruk av bygget.",
          "Når lagringsmåte eller lagringshøyde endres.",
          "Når anlegget er utvidet eller vesentlig endret.",
          "Når dokumentasjonen er mangelfull eller uklar.",
          "Som periodisk kontroll i driftsfasen.",
          "Når forsikringsselskap eller myndighet krever dokumentert kontroll.",
        ],
      },
      {
        heading: "Forskjellen mellom kontroll og service",
        body: [
          "FG-kontroll er en uavhengig vurdering av om anlegget tilfredsstiller kravene som gjelder. Service og vedlikehold innebærer løpende prøving, justering, reparasjon og utskifting av komponenter.",
          "For å sikre nødvendig uavhengighet bør kontroll og utbedring holdes tydelig adskilt. Kontrolløren dokumenterer avvikene, mens et kvalifisert sprinklerforetak normalt utfører nødvendige reparasjoner og endringer.",
        ],
      },
      {
        heading: "Et tryggere bygg med dokumentert sprinklerkontroll",
        body: [
          "En FG-kontroll gir bygningseier et bedre grunnlag for å ivareta brannsikkerheten og dokumentere anleggets tilstand. Målet er ikke bare å oppfylle krav, men å sikre at sprinkleranlegget har best mulige forutsetninger for å fungere ved en brann.",
          "Trenger bygget kontroll av sprinkleranlegget? Ta kontakt for vurdering av anlegget, nødvendig dokumentasjon og kontrollens omfang.",
        ],
      },
    ],
  },
];
