// Original, brand-styled explanatory diagrams for articles. These are
// schematics (not photos) — legitimate editorial illustrations that support
// the text. Add a new `case` here and reference it via ArticleSection.diagram.

const SLATE = "#4b5766";
const ORANGE = "#ef7c2f";
const CONNECTOR = "#cbd3db";

function Radiator({
  cx,
  fill,
  valve = false,
}: {
  cx: number;
  fill: string;
  valve?: boolean;
}) {
  const width = 46;
  const height = 76;
  const x = cx - width / 2;
  const top = 172;
  const bottom = top + height;
  return (
    <g>
      {/* supply/return connectors */}
      <line x1={cx} y1={150} x2={cx} y2={top} stroke={CONNECTOR} strokeWidth={4} />
      <line x1={cx} y1={bottom} x2={cx} y2={270} stroke={CONNECTOR} strokeWidth={4} />
      {/* radiator body */}
      <rect x={x} y={top} width={width} height={height} rx={5} fill={fill} />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x + 10 + i * 9}
          y1={top + 7}
          x2={x + 10 + i * 9}
          y2={bottom - 7}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={2}
        />
      ))}
      {/* balancing valve symbol (bowtie) on the return, only when balanced */}
      {valve && (
        <g>
          <path
            d={`M ${cx - 8} 254 L ${cx} 260 L ${cx - 8} 266 Z`}
            fill={SLATE}
          />
          <path
            d={`M ${cx + 8} 254 L ${cx} 260 L ${cx + 8} 266 Z`}
            fill={SLATE}
          />
        </g>
      )}
    </g>
  );
}

function Panel({
  x,
  title,
  temps,
  valves,
}: {
  x: number;
  title: string;
  temps: string[];
  valves: boolean;
}) {
  const centers = [140, 205, 270, 335];
  return (
    <g transform={`translate(${x} 0)`}>
      <rect
        x={10}
        y={20}
        width={360}
        height={300}
        rx={12}
        fill="#ffffff"
        stroke="rgba(75,87,102,0.15)"
      />
      <text
        x={190}
        y={54}
        textAnchor="middle"
        fontSize={17}
        fontWeight={600}
        fill={SLATE}
      >
        {title}
      </text>

      {/* supply (warm) + return (cool) mains */}
      <line x1={75} y1={150} x2={350} y2={150} stroke="#e98a2f" strokeWidth={5} strokeLinecap="round" />
      <line x1={75} y1={270} x2={350} y2={270} stroke="#8fa8bb" strokeWidth={5} strokeLinecap="round" />
      {/* pump riser + pump */}
      <line x1={75} y1={150} x2={75} y2={270} stroke={CONNECTOR} strokeWidth={4} />
      <circle cx={75} cy={210} r={16} fill={SLATE} />
      <path d="M 69 210 L 81 210 M 75 204 L 75 216" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" />

      {centers.map((cx, i) => (
        <Radiator key={cx} cx={cx} fill={temps[i]} valve={valves} />
      ))}
    </g>
  );
}

function BalanceringDiagram() {
  return (
    <svg
      viewBox="0 0 800 392"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      role="img"
      aria-label="Skjematisk sammenligning av et ubalansert og et innregulert varmeanlegg. I det ubalanserte anlegget er radiatorene nærmest pumpen varme mens de fjerneste er kalde. I det innregulerte anlegget har alle radiatorene jevn temperatur, og hver kurs har en strupeventil."
      className="h-auto w-full"
    >
      <Panel
        x={0}
        title="Uten innregulering"
        temps={[ORANGE, "#f0a062", "#a9bccb", "#7098b7"]}
        valves={false}
      />
      <Panel
        x={400}
        title="Etter innregulering"
        temps={[ORANGE, ORANGE, ORANGE, ORANGE]}
        valves
      />

      {/* legend */}
      <g transform="translate(0 356)">
        <rect x={250} y={0} width={16} height={16} rx={3} fill={ORANGE} />
        <text x={274} y={13} fontSize={14} fill={SLATE}>
          Riktig temperatur
        </text>
        <rect x={430} y={0} width={16} height={16} rx={3} fill="#7098b7" />
        <text x={454} y={13} fontSize={14} fill={SLATE}>
          For lav temperatur
        </text>
      </g>
    </svg>
  );
}

export function ArticleDiagram({ name }: { name: string }) {
  let diagram: React.ReactNode = null;
  let caption = "";

  switch (name) {
    case "innregulering-balansering":
      diagram = <BalanceringDiagram />;
      caption =
        "Uten innregulering får kursene nærmest pumpen for mye vann og blir varme, mens de fjerneste blir kalde. Etter innregulering fordeles vannmengdene riktig, og hele bygget får jevn temperatur.";
      break;
    default:
      return null;
  }

  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-sm bg-brand-bg p-4 md:p-6">
        <div className="mx-auto min-w-[520px] max-w-3xl">{diagram}</div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-brand-gray">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
