"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import PlaceSearchInput from "@/components/forms/PlaceSearchInput";
import Button from "@/components/ui/Button";

type KundaliResult = {
  input: any;
  data: any;
};

function getOutput(data: any) {
  return data?.output || data?.data || data || {};
}

function getMoonPlanet(planets: any[]) {
  return planets.find((planet) => {
    const name = String(getPlanetName(planet)).toLowerCase();
    return name === "moon" || name.includes("chandra");
  });
}

function getPlanets(result: any) {
  const output = getOutput(result?.data);

  if (Array.isArray(output?.planets)) return output.planets;
  if (Array.isArray(output?.grahas)) return output.grahas;
  if (Array.isArray(output?.planetary_positions)) return output.planetary_positions;

  return [];
}

function getHouses(result: any) {
  const output = getOutput(result?.data);

  if (Array.isArray(output?.houses)) return output.houses;

  return [];
}

function getAscendant(result: any) {
  const output = getOutput(result?.data);

  return output?.ascendant || output?.lagna || {};
}

function getPlanetName(planet: any) {
  return planet?.name || planet?.planet || planet?.graha || "—";
}

function getPlanetSign(planet: any) {
  return (
    planet?.sign?.name ||
    planet?.sign ||
    planet?.rashi?.name ||
    planet?.rashi ||
    "—"
  );
}

function getPlanetHouse(planet: any) {
  return planet?.house || planet?.house_number || planet?.bhava || "—";
}

function getPlanetNakshatra(planet: any) {
  if (!planet) return "—";

  return (
    planet?.nakshatra?.name ||
    planet?.nakshatra_name ||
    planet?.nakshatra ||
    planet?.star?.name ||
    planet?.star ||
    "—"
  );
}

function getDegree(planet: any) {
  const degree =
    planet?.degree ||
    planet?.degrees ||
    planet?.sign_degree ||
    planet?.absolute_degree;

  if (!degree && degree !== 0) return "—";

  return typeof degree === "number" ? degree.toFixed(2) : String(degree);
}

function buildChartCells(planets: any[]) {
  const cells: Record<number, string[]> = {};

  for (let i = 1; i <= 12; i++) {
    cells[i] = [];
  }

  planets.forEach((planet) => {
    const house = Number(getPlanetHouse(planet));

    if (house >= 1 && house <= 12) {
      cells[house].push(getPlanetName(planet));
    }
  });

  return cells;
}

function KundaliHouseGrid({ cells }: { cells: Record<number, string[]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => {
        const house = index + 1;

        return (
          <div
            key={house}
            className="rounded-2xl border border-[#E6C89C]/40 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B784A7]">
              House {house}
            </p>

            <p className="mt-3 min-h-10 font-semibold text-[#5C3A57]">
              {cells[house]?.join(", ") || "—"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function KundaliBasicReportClient() {
  const reportRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KundaliResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      birthDate: formData.get("birth_date"),
      birthTime: formData.get("birth_time"),
      birthPlace: formData.get("birth_place"),
      latitude: formData.get("birth_latitude"),
      longitude: formData.get("birth_longitude"),
      timezone: formData.get("birth_timezone") || 5.5,
    };

    const response = await fetch("/api/kundali/basic-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!json.ok) {
      setError(json.error || "Unable to generate report.");
    } else {
      setResult(json);
    }

    setLoading(false);
  }

function downloadPdf() {
  if (!result) return;

  const pdf = new jsPDF("p", "mm", "a4");

  const planets = getPlanets(result);
  const ascendant = getAscendant(result);
  const moon = getMoonPlanet(planets);
  const cells = buildChartCells(planets);

  let y = 16;

  function addPageIfNeeded(space = 10) {
    if (y + space > 285) {
      pdf.addPage();
      y = 18;
    }
  }

  function line(text: string, size = 10, gap = 6) {
    addPageIfNeeded(gap);
    pdf.setFontSize(size);
    pdf.text(text, 18, y);
    y += gap;
  }

  pdf.setFontSize(20);
  pdf.text("Astrogyan Basic Kundali Report", 105, y, { align: "center" });

  y += 12;

  line(`Name: ${result.input.name}`, 11);
  line(`Birth Date: ${result.input.birthDate}`, 11);
  line(`Birth Time: ${result.input.birthTime}`, 11);
  line(`Birth Place: ${result.input.birthPlace}`, 11);
  line(`Latitude: ${result.input.latitude || "N/A"}`, 11);
  line(`Longitude: ${result.input.longitude || "N/A"}`, 11);
  line(`Timezone: ${result.input.timezone || "5.5"}`, 11);

  y += 5;

  line("Basic Kundali Details", 15, 8);

  line(
    `Ascendant: ${
      ascendant?.sign?.name ||
      ascendant?.sign ||
      ascendant?.rashi ||
      "N/A"
    }`,
    11
  );

  line(`Moon Sign: ${getPlanetSign(moon)}`, 11);
  line(`Nakshatra: ${getPlanetNakshatra(getMoonPlanet(planets))}`, 11);
  line(`Ayanamsha: ${getOutput(result.data)?.metadata?.ayanamsha || "Lahiri"}`, 11);

  y += 5;

  line("House-wise Placements", 15, 8);

  for (let house = 1; house <= 12; house++) {
    line(
      `House ${house}: ${cells[house]?.join(", ") || "—"}`,
      10
    );
  }

  y += 5;

  line("Planetary Positions", 15, 8);

  planets.forEach((planet: any) => {
    const text = `${getPlanetName(planet)} | Sign: ${getPlanetSign(
      planet
    )} | House: ${getPlanetHouse(planet)} | Degree: ${getDegree(
      planet
    )} | Nakshatra: ${getPlanetNakshatra(getMoonPlanet(planets))}`;

    const splitText = pdf.splitTextToSize(text, 175);

    addPageIfNeeded(splitText.length * 6);

    pdf.setFontSize(9);
    pdf.text(splitText, 18, y);
    y += splitText.length * 6;
  });

  y += 6;

  addPageIfNeeded(25);

  pdf.setFontSize(9);
  pdf.text(
    "Note: This is a basic automated Kundali report generated by Astrogyan. For personalized interpretation, book a consultation.",
    18,
    y,
    { maxWidth: 175 }
  );

  pdf.save(`${result.input.name || "kundali"}-basic-report.pdf`);
}

  const planets = result ? getPlanets(result) : [];
  const houses = result ? getHouses(result) : [];
  const ascendant = result ? getAscendant(result) : {};
  const chartCells = buildChartCells(planets);

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-sm backdrop-blur-md"
        >
          <h2 className="font-display text-3xl text-[#5C3A57]">
            Enter Birth Details
          </h2>

          <div className="mt-6 grid gap-5">
            <input
              name="name"
              className="field"
              placeholder="Full Name"
              required
            />

            <input
              name="birth_date"
              type="date"
              className="field"
              required
            />

            <input
              name="birth_time"
              type="time"
              className="field"
              required
            />

            <PlaceSearchInput />

            <Button>{loading ? "Generating..." : "Generate Kundali"}</Button>
          </div>

          {error && (
            <p className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </form>

        <div className="min-w-0 overflow-hidden rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-4 shadow-sm backdrop-blur-md sm:p-6">
          {!result ? (
            <div className="flex min-h-96 items-center justify-center text-center">
              <div>
                <p className="text-5xl">☉</p>
                <h2 className="mt-5 font-display text-3xl text-[#5C3A57]">
                  Your Kundali Report Will Appear Here
                </h2>
                <p className="mt-3 text-[#6F5B69]">
                  Generate a basic Vedic birth chart with Lagna, houses and
                  planetary positions.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
  <Link
    href="/book?service=kundli-reading"
    className="rounded-full border border-[#5C3A57]/20 px-6 py-3 text-center text-sm font-medium text-[#5C3A57] transition hover:bg-white/70"
  >
    Book Full Kundali Reading
  </Link>

  <button
    type="button"
    onClick={downloadPdf}
    className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B784A7]"
  >
    Download PDF
  </button>
</div>

              <div
                ref={reportRef}
                className="rounded-[2rem] bg-[#F6EEE8] p-6 text-[#5C3A57]"
              >
                <div className="border-b border-[#E6C89C]/50 pb-5 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#B784A7]">
                    Astrogyan Basic Kundali Report
                  </p>
                  <h1 className="mt-3 font-display text-4xl">
                    {result.input.name}
                  </h1>
                  <p className="mt-2 text-sm text-[#6F5B69]">
                    {result.input.birthDate} · {result.input.birthTime} ·{" "}
                    {result.input.birthPlace}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#B784A7]">
                      Ascendant
                    </p>
                    <p className="mt-2 font-display text-2xl">
                      {ascendant?.sign?.name ||
                        ascendant?.sign ||
                        ascendant?.rashi ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#B784A7]">
                      Nakshatra
                    </p>
                    <p className="mt-2 font-display text-2xl">
                      {getPlanetNakshatra(getMoonPlanet(planets))}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#B784A7]">
                      Ayanamsha
                    </p>
                    <p className="mt-2 font-display text-2xl">
                      {getOutput(result.data)?.metadata?.ayanamsha || "Lahiri"}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
  <h2 className="font-display text-3xl">Kundali Placements</h2>

  <p className="mt-2 text-sm text-[#6F5B69]">
    Planetary placements are shown house-wise for clarity.
  </p>

  <div className="mt-5">
    <KundaliHouseGrid cells={chartCells} />
  </div>
</div>

                <div className="mt-8">
                  <h2 className="font-display text-3xl">
                    Planetary Positions
                  </h2>

                  <div className="mt-4 overflow-x-auto rounded-[1.5rem] border border-[#E6C89C]/50">
                    <table className="min-w-[720px] w-full text-left text-sm">
                      <thead className="bg-[#5C3A57] text-white">
                        <tr>
                          <th className="p-3">Planet</th>
                          <th className="p-3">Sign</th>
                          <th className="p-3">House</th>
                          <th className="p-3">Degree</th>
                          <th className="p-3">Nakshatra</th>
                        </tr>
                      </thead>

                      <tbody>
                        {planets.map((planet: any, index: number) => (
                          <tr
                            key={`${getPlanetName(planet)}-${index}`}
                            className="border-b border-[#E6C89C]/30 bg-white/60"
                          >
                            <td className="p-3 font-semibold">
                              {getPlanetName(planet)}
                            </td>
                            <td className="p-3">{getPlanetSign(planet)}</td>
                            <td className="p-3">{getPlanetHouse(planet)}</td>
                            <td className="p-3">{getDegree(planet)}</td>
                            <td className="p-3">
                              {getPlanetNakshatra(getMoonPlanet(planets))}
                            </td>
                          </tr>
                        ))}

                        {planets.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-5 text-center">
                              No planetary data returned.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {houses.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-3xl">
                      Houses
                    </h2>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {houses.map((house: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-2xl bg-white/70 p-4"
                        >
                          <p className="text-sm font-bold">
                            House {house.house || house.number || index + 1}
                          </p>
                          <p className="mt-1 text-sm text-[#6F5B69]">
                            Sign:{" "}
                            {house.sign?.name || house.sign || house.rashi || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-8 text-center text-xs text-[#9A7B8F]">
                  This is a basic automated Kundali report generated by
                  Astrogyan. For personalized interpretation, book a
                  consultation.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}