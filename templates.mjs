// Al HTML til sitet. Tekster rettes her; tal, heste og resultater kommer fra data/travinfo.json.

export const SITE = {
  // ← Bekræft domænet før lancering (kan også sættes med miljøvariablen SITE_URL).
  url: (process.env.SITE_URL || 'https://www.staldmagnusmnielsen.dk').replace(/\/$/, ''),
  navn: 'Stald Magnus M. Nielsen',
  licens: 517710,
  telefon: '+45 51 89 80 33',
  email: 'teammagnus@outlook.dk',
  gade: 'Flyvej 16',
  postnr: '7800',
  by: 'Skive',
  facebook: 'https://www.facebook.com/StaldMagnusMNielsen/',
  instagram: 'https://www.instagram.com/stald_magnusmnielsen',
  travinfo: 'https://travinfo.dk/licenseholder-tabs/517710',
  krafft: 'https://www.kraffthestefoder.dk/',
  skiveTrav: 'https://www.skive-trav.dk/',
  kort: 'https://www.google.com/maps/search/?api=1&query=Flyvej+16%2C+7800+Skive',
};

// Billeder af enkelte heste (hest-id fra Travinfo → filnavn i assets/img).
// Forlader hesten træningslisten, forsvinder kortet af sig selv.
const HESTEFOTO = {
  651228: 'hest-karat-c-n',
  658484: 'hest-cala-karamell',
  645166: 'hest-glad-nock',
  646886: 'hest-hernando',
  657848: 'hest-giovanni',
  657408: 'hest-manta-ray-cash',
  659474: 'hest-giulia-di-masi',
};

// navn: [forhold bredde/højde, ...bredder]
const BILLEDER = {
  'hero': [1.763, 1000, 1600, 2400],
  'hero-mobil': [0.751, 800, 1200],
  'magnus': [0.8, 480, 680],
  'magnus-giovanni': [1.764, 800, 1280, 2000, 2800],
  'stald-gang': [0.751, 600, 900, 1400],
  'stald-vask': [0.751, 500, 800, 1200],
  'stald-fold': [0.75, 500, 800, 1200],
  'stald-hest': [0.8, 600, 1000, 1400],
  'stald-detalje': [1, 500, 900],
  'aften': [0.751, 800, 1200],
  'aften-bred': [1.5, 1000, 1600, 2400],
  'hest-karat-c-n': [0.8, 560, 900],
  'hest-cala-karamell': [0.8, 560, 900],
  'hest-glad-nock': [0.8, 560, 900],
  'hest-hernando': [0.8, 560, 900],
  'hest-giovanni': [0.8, 560, 900],
  'hest-manta-ray-cash': [0.8, 560, 900],
  'hest-giulia-di-masi': [0.8, 560, 900],
  'magnus-sulky': [0.75, 640, 1000],
  'side-resultater': [0.75, 600, 900, 1400],
  'i-loeb': [1.778, 800, 1280, 2000],
  'stald-sele': [0.8, 500, 800, 1200],
  'stald-lys': [0.75, 500, 800, 1200],
  'stald-moerk': [0.75, 500, 800, 1200],
  'stald-ro': [0.75, 500, 800, 1200],
  'stald-bandager': [0.75, 640, 1000],
  'stald-blik': [0.75, 640, 1000],
  'flise-1': [1, 320, 600],
  'flise-2': [1, 320, 600],
  'flise-3': [1, 320, 600],
  'side-resultater-bred': [1.5, 1200, 1800, 2400],
  'hoved-stalden': [0.75, 600, 900, 1400],
  'hoved-stalden-bred': [1.5, 1200, 1800, 2400],
  'hoved-heste': [0.75, 600, 900, 1400],
  'hoved-heste-bred': [1.5, 1200, 1800, 2400],
  'hoved-kontakt': [0.75, 600, 900, 1400],
  'hoved-kontakt-bred': [1.5, 1200, 1800, 2400],
};

const BANER = { Sk: 'Skive', 'Ål': 'Aalborg', 'År': 'Aarhus', Od: 'Odense', Ch: 'Charlottenlund', Bi: 'Billund', Bh: 'Bornholm', Ny: 'Nykøbing F.', Bs: 'Skovbo', Kl: 'Klampenborg' };
// Banernes omtrentlige placering [længdegrad, breddegrad] til det skematiske Danmarkskort (Bornholm ligger uden for kortet).
const BANE_POS = { Sk: [9.06, 56.56], 'Ål': [9.87, 57.05], 'År': [10.2, 56.14], Od: [10.36, 55.4], Ch: [12.58, 55.75], Bi: [9.12, 55.73], Ny: [11.87, 54.77], Bs: [12.03, 55.46], Kl: [12.59, 55.77] };
const NAV = [['om-magnus/', 'Om Magnus'], ['stalden/', 'Stalden'], ['heste/', 'Heste'], ['resultater/', 'Resultater']];

// ---------- små hjælpere ----------

let R = ''; // sti tilbage til roden fra den side, der bygges
let V = ''; // versionsmærke til css/js
let KORT;   // Danmarks omrids og projektionstal fra data/danmark.json

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (n) => Number(n).toLocaleString('da-DK');
const kr = (n) => `${nf(n)}&nbsp;kr.`;
const d = (iso) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
const langDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d(iso));
const kortDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d(iso));
const ugedag = (iso) => new Intl.DateTimeFormat('da-DK', { weekday: 'long', timeZone: 'UTC' }).format(d(iso));
const dkListe = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} og ${a.at(-1)}`);
const bane = (kode) => BANER[kode] ?? kode;
const tlfLink = SITE.telefon.replace(/\s/g, '');

/** "16,0a" → "1.16,0a". Tomt, hvis der ikke er en tid (fx galop uden tid). */
export const tid = (t) => (/^\d\d,\d/.test(t ?? '') ? `1.${t}` : '');

/** Hurtigste tid i en rekordstreng som "18,7k 14,3m *12,2am" → "1.12,2am". */
export const bedsteRekord = (mark) => {
  const tider = String(mark ?? '').replace(/\*/g, '').split(/\s+/).filter((x) => /^\d\d,\d/.test(x));
  tider.sort((a, b) => parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')));
  return tider.length ? `1.${tider[0]}` : '';
};

/** Placering som den vises: 1, 2, 3 … "–" for uplaceret, "disk." for diskvalificeret. */
export const plac = (p) => (/^[1-9]\d*$/.test(p) ? p : p === 'd' ? 'disk.' : '–');

const pil = '<svg class="pil" viewBox="0 0 22 10" width="22" height="10" aria-hidden="true"><path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
const ud = '<svg class="ud" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
const nyFane = '<span class="sr"> (åbner i ny fane)</span>';
const ekstern = (href, tekst, cls = 'laes') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${tekst} ${ud}${nyFane}</a>`;
const knap = (href, tekst, cls = '') => `<a class="knap ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;
const laes = (href, tekst) => `<a class="laes" href="${R}${href}">${tekst} ${pil}</a>`;

const img = (navn, alt, { sizes = '100vw', lazy = true } = {}) => {
  const [forhold, ...bredder] = BILLEDER[navn];
  const max = bredder.at(-1);
  const src = (w) => `${R}assets/img/${navn}-${w}.webp`;
  return `<img src="${src(bredder[Math.min(1, bredder.length - 1)])}" srcset="${bredder.map((w) => `${src(w)} ${w}w`).join(', ')}" sizes="${sizes}" width="${max}" height="${Math.round(max / forhold)}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
};
const figur = (navn, alt, tekst, opt) => `<figure class="figur"><div class="billede" data-vis="billede">${img(navn, alt, opt)}</div>${tekst ? `<figcaption>${tekst}</figcaption>` : ''}</figure>`;

// ---------- afledte tal ----------

function afled(data, idag) {
  const heste = [...data.heste].sort((a, b) => b.praemier - a.praemier || a.navn.localeCompare(b.navn, 'da'));
  const navne = new Map(heste.map((h) => [h.id, h.navn]));
  const medNavn = (r) => ({ ...r, hest: navne.get(r.hestId) ?? r.hest });
  const saeson = data.traenerStatistik.find((s) => s.sejre > 0) ?? data.traenerStatistik.find((s) => s.starter > 0) ?? data.traenerStatistik[0];
  const kusk = data.kuskStatistik.find((s) => s.aar === saeson.aar) ?? data.kuskStatistik[0];
  const iAar = data.resultater.filter((r) => r.dato.startsWith(String(saeson.aar)));
  const antalPrBane = {};
  for (const r of iAar) antalPrBane[r.bane] = (antalPrBane[r.bane] ?? 0) + 1;
  return {
    heste,
    saeson,
    kusk,
    opdateret: langDato(data.opdateret),
    seneste: data.resultater.slice(0, 10).map(medNavn),
    kommende: data.kommende.filter((k) => k.dato >= idag).map(medNavn),
    banerIAar: Object.entries(antalPrBane).sort((a, b) => b[1] - a[1]).map(([kode]) => bane(kode)),
    banetal: Object.entries(antalPrBane).sort((a, b) => b[1] - a[1]).map(([kode, antal]) => ({ kode, navn: bane(kode), antal })),
    hjemmestarter: antalPrBane.Sk ?? 0,
    ungheste: heste.filter((h) => h.alder <= 2),
    aldre: [Math.min(...heste.map((h) => h.alder)), Math.max(...heste.map((h) => h.alder))],
    fotoheste: heste.filter((h) => HESTEFOTO[h.id]),
  };
}

// ---------- fælles dele ----------

const logo = (cls = '', alt = '') => `<img class="${cls}" src="${R}assets/img/logo-hvid.png" width="535" height="428" alt="${alt}">`;

const top = (sti) => `
<header class="top">
  <div class="top__inner wrap">
    <nav class="top__nav" aria-label="Primær navigation">
      ${NAV.map(([href, navn]) => `<a href="${R}${href}"${sti.startsWith(href) ? ' aria-current="page"' : ''}>${navn}</a>`).join('\n      ')}
    </nav>
    <a class="top__logo" href="${R || './'}" aria-label="${SITE.navn} – til forsiden">${logo()}</a>
    <div class="top__cta">
      <a class="top__tlf" href="tel:${tlfLink}">${SITE.telefon}</a>
      <a class="knap knap--lys knap--lille" href="${R}kontakt/"${sti.startsWith('kontakt/') ? ' aria-current="page"' : ''}>Kontakt Magnus</a>
    </div>
    <button class="burger" type="button" aria-haspopup="dialog" aria-controls="menu" commandfor="menu" command="show-modal"><span>Menu</span><i aria-hidden="true"></i></button>
  </div>
</header>
<dialog class="menu" id="menu" aria-label="Menu">
  <div class="menu__top wrap">
    <a class="top__logo" href="${R || './'}" aria-label="${SITE.navn} – til forsiden">${logo()}</a>
    <button class="burger burger--luk" type="button" data-luk commandfor="menu" command="close"><span>Luk</span><i aria-hidden="true"></i></button>
  </div>
  <nav class="menu__nav wrap" aria-label="Menu">
    <ul>
      ${[['', 'Forside'], ...NAV, ['kontakt/', 'Kontakt']].map(([href, navn], i) => `<li style="--i:${i}"><a href="${R}${href || (R ? '' : './')}"${(href ? sti.startsWith(href) : sti === '') ? ' aria-current="page"' : ''}><small>0${i + 1}</small>${navn}</a></li>`).join('\n      ')}
    </ul>
  </nav>
  <div class="menu__bund wrap">
    <a href="tel:${tlfLink}">${SITE.telefon}</a>
    <a href="mailto:${SITE.email}">${SITE.email}</a>
    <p><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a> · <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></p>
  </div>
</dialog>`;

const kontaktbaand = () => `
<section class="slut">
  <div class="wrap slut__inner">
    <p class="oje" data-vis>Kontakt</p>
    <h2 data-vis style="--i:1">Skal din hest <em>i træning?</em></h2>
    <p class="slut__tekst" data-vis style="--i:2">Ring eller skriv til Magnus – så tager I en snak om hesten og mulighederne.</p>
    <div class="slut__valg" data-vis style="--i:3">
      ${knap('kontakt/', 'Kontakt Magnus', 'knap--lys')}
      <a class="slut__tlf" href="tel:${tlfLink}">${SITE.telefon}</a>
    </div>
  </div>
</section>`;

const bund = (o) => `
<footer class="bund">
  <div class="wrap bund__gitter">
    <div class="bund__brand">
      ${logo('bund__logo', SITE.navn)}
      <p>Professionel travtræning i Skive. Tilkøring af ungheste og træning af løbsheste.</p>
      <a class="bund__partner" href="${SITE.krafft}" target="_blank" rel="noopener">
        <span>Samarbejdspartner</span>
        <img src="${R}assets/img/krafft.png" width="814" height="619" alt="KRAFFT" loading="lazy">${nyFane}
      </a>
    </div>
    <nav aria-label="Sider">
      <h2>Sider</h2>
      <ul>
        ${[...NAV, ['kontakt/', 'Kontakt']].map(([href, navn]) => `<li><a href="${R}${href}">${navn}</a></li>`).join('')}
      </ul>
    </nav>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="tel:${tlfLink}">${SITE.telefon}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><address>${SITE.gade}<br>${SITE.postnr} ${SITE.by}</address></li>
      </ul>
    </div>
    <div>
      <h2>Følg stalden</h2>
      <ul>
        <li>${ekstern(SITE.facebook, 'Facebook', '')}</li>
        <li>${ekstern(SITE.instagram, 'Instagram', '')}</li>
        <li>${ekstern(SITE.travinfo, 'Travinfo', '')}</li>
      </ul>
    </div>
  </div>
  <div class="wrap bund__linje">
    <p>Hjemmebane: ${ekstern(SITE.skiveTrav, 'Skive Trav', '')}</p>
    <p>Resultater og statistik: Dansk Hestevæddeløb · opdateret ${o.opdateret}</p>
    <p>© ${new Date().getFullYear()} ${SITE.navn}</p>
  </div>
</footer>`;

const organisation = () => ({
  '@type': ['LocalBusiness', 'SportsOrganization'],
  '@id': `${SITE.url}/#stald`,
  name: SITE.navn,
  description: 'Professionel travtræning i Skive: tilkøring af ungheste og træning af løbsheste.',
  url: `${SITE.url}/`,
  telephone: tlfLink,
  email: SITE.email,
  image: `${SITE.url}/assets/img/og.jpg`,
  logo: `${SITE.url}/assets/img/logo-navy.png`,
  sport: 'Travsport',
  address: { '@type': 'PostalAddress', streetAddress: SITE.gade, postalCode: SITE.postnr, addressLocality: SITE.by, addressCountry: 'DK' },
  founder: { '@id': `${SITE.url}/#magnus` },
  sameAs: [SITE.facebook, SITE.instagram, SITE.travinfo],
});
const person = () => ({
  '@type': 'Person',
  '@id': `${SITE.url}/#magnus`,
  name: 'Magnus M. Nielsen',
  jobTitle: 'Professionel travtræner og kusk',
  url: `${SITE.url}/om-magnus/`,
  worksFor: { '@id': `${SITE.url}/#stald` },
  sameAs: [SITE.travinfo],
});

function layout({ sti, titel, beskrivelse, indhold, o, klasse = '', noindex = false, ekstraLd = [] }) {
  const kanonisk = `${SITE.url}/${sti}`;
  const sideNavn = [...NAV, ['kontakt/', 'Kontakt']].find(([href]) => href === sti)?.[1];
  const graf = [
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.navn, inLanguage: 'da-DK' },
    organisation(),
    person(),
    ...(sideNavn ? [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Forside', item: `${SITE.url}/` }, { '@type': 'ListItem', position: 2, name: sideNavn, item: kanonisk }] }] : []),
    ...ekstraLd,
  ];
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beskrivelse)}">
${noindex ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="' + kanonisk + '">'}
<meta name="theme-color" content="#0a1428">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${SITE.navn}">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beskrivelse)}">
<meta property="og:url" content="${kanonisk}">
<meta property="og:image" content="${SITE.url}/assets/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Magnus M. Nielsen i sulkyen bag en travhest i fuld fart">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="48x48" href="${R}assets/img/ikon-48.png">
<link rel="apple-touch-icon" href="${R}assets/img/ikon-180.png">
<link rel="preload" href="${R}assets/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${R}assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__klar||document.documentElement.classList.remove('js')},2500)</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graf }).replace(/</g, '\\u003c')}</script>
</head>
<body class="${klasse}">
<a class="skip" href="#indhold">Spring til indhold</a>
${top(sti)}
<main id="indhold">
${indhold}
</main>
${bund(o)}
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

// Sidehoved. Normalt vises hele det høje billede (`billede`) til højre uden noget ovenpå, med teksten ved siden af.
// Har siden også et bredt billede (`bred`), fylder det hele feltet på liggende skærme med teksten ovenpå.
// På smalle og stående skærme ligger det høje billede altid bag teksten.
const sidehoved = ({ oje, h1, tekst, billede, bred, alt, pos = '50% 30%', posBred = '50% 30%' }) => `
<section class="sidehoved${bred ? ' sidehoved--fuld' : ''}">
  <picture class="sidehoved__billede" style="--pos:${pos};--pos-bred:${posBred}">${bred ? `
    <source media="(max-aspect-ratio: 1/1)" srcset="${BILLEDER[billede].slice(1).map((w) => `${R}assets/img/${billede}-${w}.webp ${w}w`).join(', ')}" sizes="100vw">` : ''}
    ${img(bred ?? billede, alt, { sizes: bred ? '100vw' : '(min-width: 961px) 50vw, 100vw', lazy: false })}
  </picture>
  <div class="wrap">
    <div class="sidehoved__tekst">
      <nav class="sti" aria-label="Brødkrumme"><a href="${R}">Forside</a><span aria-hidden="true">/</span><span aria-current="page">${oje}</span></nav>
      <h1>${h1}</h1>
      <p class="indled">${tekst}</p>
    </div>
  </div>
</section>`;

/** Søjlediagram over sejre pr. sæson (ældste til venstre). */
const soejler = (titel, raekker) => {
  const aar = raekker.filter((s) => s.starter > 0).reverse();
  const max = Math.max(1, ...aar.map((s) => s.sejre));
  return `
      <figure class="soejler">
        <figcaption>${titel}</figcaption>
        <ol>${aar.map((s, i) => `
          <li${s.sejre === max ? ' class="hoejest"' : ''} style="--h:${Math.round((s.sejre / max) * 100)}%;--n:${i}"><b>${s.sejre}</b><span class="sr"> sejre i </span><span class="soejler__aar">${s.aar}</span></li>`).join('')}
        </ol>
      </figure>`;
};

/**
 * Skematisk Danmarkskort. `punkter` er [{ kode, navn, antal? }]: med antal tegnes en boble med tallet i,
 * uden antal en lille prik. Skive (hjemmebanen) får en ring, og der tegnes linjer derfra til de andre baner.
 */
function danmarkskort(punkter, beskrivelse) {
  const { bredde, hoejde, lon0, lat1, kx, ky, sti } = KORT;
  const max = Math.max(1, ...punkter.map((p) => p.antal ?? 0));
  const vist = punkter.filter((p) => BANE_POS[p.kode]).map((p) => {
    const [lon, lat] = BANE_POS[p.kode];
    const r = p.antal ? +(8 + 6 * Math.sqrt(p.antal / max)).toFixed(1) : 7;
    return { ...p, x: +((lon - lon0) * kx).toFixed(1), y: +((lat1 - lat) * ky).toFixed(1), r, ydre: p.kode === 'Sk' ? r + (p.antal ? 4 : 6) : r };
  });
  const hjem = vist.find((p) => p.kode === 'Sk');
  const ruter = hjem ? vist.filter((p) => p !== hjem) : [];

  // Navnet sættes dér, hvor det bedst holder sig inden for kortet og fri af ruter og andre baner.
  const navn = (p) => {
    const w = p.navn.length * 6.4, m = p.ydre + 6;
    const steder = [['start', p.x + m, p.y + 3.7], ['middle', p.x, p.y + m + 9], ['end', p.x - m, p.y + 3.7], ['end', Math.min(p.x + p.ydre, bredde - 4), p.y + m + 9], ['middle', p.x, p.y - m - 2]];
    const straf = ([anker, x, y]) => { // 100 for at stikke ud over kortet, 10 for at ramme en rute eller en anden bane
      const x0 = (anker === 'start' ? x : anker === 'end' ? x - w : x - w / 2) - 3, x1 = x0 + w + 6, y0 = y - 12, y1 = y + 4;
      const inde = (px, py, luft = 0) => px > x0 - luft && px < x1 + luft && py > y0 - luft && py < y1 + luft;
      const udenfor = x0 < 0 || x1 > bredde || y0 < 0 || y1 > hoejde;
      const rammer = vist.some((q) => q !== p && inde(q.x, q.y, q.ydre))
        || ruter.some((q) => { for (let t = 0; t <= 1; t += 0.02) if (inde(hjem.x + (q.x - hjem.x) * t, hjem.y + (q.y - hjem.y) * t)) return true; return false; });
      return (udenfor ? 100 : 0) + (rammer ? 10 : 0);
    };
    // Hjemmebanen helst til venstre, uden for viften af ruter. Ved lige straf vinder det første sted på listen.
    const [anker, x, y] = (p === hjem ? [steder[2], ...steder] : steder).map((sted, i) => [straf(sted) + i / 100, sted]).sort((a, b) => a[0] - b[0])[0][1];
    return `<text class="kort__navn" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anker}">${esc(p.navn)}</text>`;
  };

  return `<svg class="kort__svg" viewBox="0 0 ${bredde} ${hoejde}" role="img" aria-label="${esc(beskrivelse)}">
        <path class="kort__land" d="${sti}"/>${ruter.map((p, i) => `
        <path class="kort__rute" pathLength="1" d="M${hjem.x},${hjem.y}L${p.x},${p.y}" style="--n:${i}"/>`).join('')}${vist.map((p, i) => `
        <g class="kort__bane" style="--n:${i}">${p === hjem ? `<circle class="kort__ring" cx="${p.x}" cy="${p.y}" r="${p.ydre}"/>` : ''}<circle class="kort__prik" cx="${p.x}" cy="${p.y}" r="${p.r}"/>${p.antal ? `<text class="kort__tal" x="${p.x}" y="${+(p.y + 3.3).toFixed(1)}" text-anchor="middle">${p.antal}</text>` : ''}${navn(p)}</g>`).join('')}
      </svg>`;
}

const placMaerke = (r) => `<li class="res__pl${r.placering === '1' ? ' res__pl--1' : /^[23]$/.test(r.placering) ? ' res__pl--23' : r.placering === 'd' ? ' res__pl--tekst' : ''}"><span class="sr">${esc(r.hest)}: </span>${plac(r.placering)}</li>`;

// ---------- genbrugte blokke ----------

const resultatRaekke = (r) => `
      <li class="res__r">
        <time datetime="${r.dato}">${kortDato(r.dato)}</time>
        <span class="res__pl${r.placering === '1' ? ' res__pl--1' : /^[23]$/.test(r.placering) ? ' res__pl--23' : r.placering === 'd' ? ' res__pl--tekst' : ''}"><span class="sr">Placering: </span>${plac(r.placering)}</span>
        <span class="res__hest">${esc(r.hest)}</span>
        <span class="res__bane">${esc(bane(r.bane))} · ${nf(r.distance)}&nbsp;m</span>
        <span class="res__tid">${tid(r.tid) || '<span aria-hidden="true">–</span><span class="sr">ingen tid</span>'}</span>
        <span class="res__kr">${r.praemie ? kr(r.praemie) : '<span aria-hidden="true">–</span><span class="sr">ingen præmie</span>'}</span>
      </li>`;
const resultatliste = (liste) => `<ol class="res">${liste.map(resultatRaekke).join('')}
    </ol>`;

const kommendeListe = (liste) => `<ul class="kom">${liste.map((k) => `
      <li>
        <time datetime="${k.dato}"><b>${kortDato(k.dato)}</b> ${ugedag(k.dato)}</time>
        <span class="kom__hest">${esc(k.hest)}</span>
        <span class="kom__bane">${esc(bane(k.bane))} · ${k.loeb}. løb${k.kusk ? ` · ${esc(k.kusk)}` : ''}</span>
      </li>`).join('')}
    </ul>`;

const omHest = (h) => `${h.alder}-årig ${esc(h.koen.toLowerCase())}`;
const afstamning = (h) => (h.far ? `e. ${esc(h.far)} – ${esc(h.mor)}` : '');
const sejre = (h) => Number(h.placeringer.split('-')[0]) || 0;

const hestekort = (h, href, eksternt) => `
      <a class="kort" href="${href}"${eksternt ? ' target="_blank" rel="noopener"' : ''}>
        <div class="billede" data-vis="billede">${img(HESTEFOTO[h.id], `Travhesten ${h.navn}`, { sizes: '(min-width: 1000px) 22vw, (min-width: 640px) 45vw, 72vw' })}</div>
        <h3>${esc(h.navn)}</h3>
        <p>${omHest(h)} · ${afstamning(h)}</p>
        <p class="kort__tal">${!h.starter ? 'Ustartet' : `${kr(h.praemier)} · ${sejre(h) ? `${sejre(h)} ${sejre(h) === 1 ? 'sejr' : 'sejre'}` : `${h.starter} ${h.starter === 1 ? 'start' : 'starter'}`}`}${eksternt ? nyFane : ''}</p>
      </a>`;

const ydelser = (o) => `
    <ol class="ydelser">
      <li data-vis>
        <span class="ydelser__nr">01</span>
        <h3>Træning af løbsheste</h3>
        <p>Stalden træner og starter løbsheste på baner over hele landet. I ${o.saeson.aar} har staldens heste været til start i ${dkListe(o.banerIAar)}.</p>
      </li>
      <li data-vis style="--i:1">
        <span class="ydelser__nr">02</span>
        <h3>Tilkøring af ungheste</h3>
        <p>Ungheste køres til og bygges op til deres første starter.${o.ungheste.length > 1 ? ` Lige nu står ${o.ungheste.length} åringer og 2-årige på træningslisten.` : ''}</p>
      </li>
      <li data-vis style="--i:2">
        <span class="ydelser__nr">03</span>
        <h3>Sparring ved hestekøb</h3>
        <p>Går du med tanker om en ny hest, hjælper Magnus med at vurdere mulighederne og finde den hest, der passer til dine ambitioner og dit budget – også på selve auktionsdagen.</p>
      </li>
    </ol>`;

const ejerbaand = () => `
<section class="baand">
  <picture class="baand__billede">
    <source media="(max-width: 700px)" srcset="${R}assets/img/aften-800.webp 800w, ${R}assets/img/aften-1200.webp 1200w" sizes="100vw">
    ${img('aften-bred', 'Ung travhest på folden i aftenlys')}
  </picture>
  <div class="wrap baand__tekst">
    <p class="oje" data-vis>For hesteejere</p>
    <h2 data-vis style="--i:1">Vi forfølger derbydrømmen <em>– sammen med dig.</em></h2>
    <p data-vis style="--i:2">Har du en hest, der skal i træning, en unghest, der skal køres til, eller overvejer du at købe hest? Ring eller skriv – så tager Magnus gerne en snak om mulighederne.</p>
    <p data-vis style="--i:3">${knap('kontakt/', 'Kontakt Magnus', 'knap--lys')}</p>
  </div>
</section>`;

const partnerKrafft = (i = 0) => `<a class="partner" href="${SITE.krafft}" target="_blank" rel="noopener" data-vis style="--i:${i}">
        <span class="partner__logo partner__logo--krafft"><img src="${R}assets/img/krafft.png" width="814" height="619" alt="KRAFFT" loading="lazy"></span>
        <span class="partner__rolle">Sponsor og samarbejdspartner ${ud}${nyFane}</span>
      </a>`;
const partnerSkive = (rolle, i = 0) => `<a class="partner" href="${SITE.skiveTrav}" target="_blank" rel="noopener" data-vis style="--i:${i}">
        <span class="partner__logo partner__logo--tekst">Skive Trav</span>
        <span class="partner__rolle">${rolle} ${ud}${nyFane}</span>
      </a>`;

const statTabel = (titel, raekker) => `
      <div class="tabelboks" role="region" aria-label="${titel}" tabindex="0">
        <table class="tabel">
          <caption>${titel}</caption>
          <thead><tr><th scope="col">År</th><th scope="col">Starter</th><th scope="col">1.–2.–3.</th><th scope="col">Sejrs&shy;procent</th><th scope="col">Præmiesum</th></tr></thead>
          <tbody>${raekker.filter((s) => s.starter > 0).map((s) => `
            <tr><th scope="row">${s.aar}</th><td>${s.starter}</td><td>${s.sejre}–${s.toer}–${s.treer}</td><td>${s.procent}&nbsp;%</td><td>${kr(s.praemier)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;

// ---------- sider ----------

const forside = (o) => `
<section class="hero">
  <picture class="hero__billede">
    <source media="(max-aspect-ratio: 1/1)" srcset="${R}assets/img/hero-mobil-800.webp 800w, ${R}assets/img/hero-mobil-1200.webp 1200w" sizes="100vw">
    ${img('hero', 'Magnus M. Nielsen i sulkyen bag en travhest i fuld fart', { lazy: false })}
  </picture>
  <div class="wrap hero__tekst">
    <p class="oje" style="--i:0">${SITE.navn} · Skive</p>
    <h1><span class="hero__navn" style="--i:1">Magnus M. <em>Nielsen</em></span> <span class="hero__titel" style="--i:2">Professionel travtræner i Skive</span></h1>
    <p class="hero__indled" style="--i:3">Fra første tilkøring til målstregen: Stalden på Flyvej træner ${o.heste.length} heste${o.ungheste.length ? ' – fra ungheste til rutinerede løbsheste' : ''}.</p>
    <p class="hero__valg" style="--i:4">${knap('kontakt/', 'Kontakt Magnus', 'knap--lys')} ${laes('stalden/', 'Se stalden')}</p>
  </div>
  <div class="hero__tal">
    <dl class="wrap">
      <div><dt>Heste i træning</dt><dd>${o.heste.length}</dd></div>
      <div><dt>Sejre som træner i ${o.saeson.aar}</dt><dd>${o.saeson.sejre}</dd></div>
      <div><dt>Sejrsprocent i ${o.saeson.aar}</dt><dd>${o.saeson.procent}<small>&nbsp;%</small></dd></div>
      <div><dt>Indkørt af stalden i ${o.saeson.aar}</dt><dd>${nf(o.saeson.praemier)}<small>&nbsp;kr.</small></dd></div>
    </dl>
    <p class="wrap hero__kilde">Tal fra Dansk Hestevæddeløb · opdateret ${o.opdateret}</p>
  </div>
</section>

<section class="sek">
  <div class="wrap duo">
    <div class="duo__billede">
      ${figur('magnus', 'Magnus M. Nielsen i sulkyen med vinderbuket', 'Magnus M. Nielsen i staldens farver: blå, grå og hvid.', { sizes: '(min-width: 900px) 38vw, 92vw' })}
    </div>
    <div class="duo__tekst">
      <p class="oje" data-vis>Om Magnus</p>
      <h2 data-vis style="--i:1">Fra dansk jockeymester <em>til egen stald.</em></h2>
      <p class="indled" data-vis style="--i:2">Magnus M. Nielsen er født i 2001 og hører til blandt landets yngste professionelle trænere.</p>
      <p data-vis style="--i:3">Han vandt DM for jockeyer i 2021, sejrede to år i træk i Summer Meeting Talents på Åby og blev nomineret til Årets Komet ved Hestesportens Galla 2024. I dag har han A1-licens som både træner og kusk – og ${o.heste.length} heste i træning på Flyvej i Skive.</p>
      <p class="valg" data-vis style="--i:4">${laes('om-magnus/', 'Læs mere om Magnus')}</p>
    </div>
  </div>
</section>

<section class="sek sek--tone">
  <div class="wrap">
    <div class="duo duo--omvendt">
      <div class="duo__tekst">
        <p class="oje" data-vis>Stalden</p>
        <h2 data-vis style="--i:1">Træning hele vejen – <em>fra unghest til løbshest.</em></h2>
        <p class="indled" data-vis style="--i:2">${SITE.navn} holder til på Flyvej i Skive, på samme vej som hjemmebanen Skive Trav.</p>
        <p class="valg" data-vis style="--i:3">${laes('stalden/', 'Se stalden')}</p>
      </div>
      <div class="duo__billede kollage">
        ${figur('stald-gang', 'Mørk travhest med blåt dækken i staldgangen', '', { sizes: '(min-width: 900px) 40vw, 92vw' })}
        <div class="kollage__lille billede" data-vis="billede">${img('stald-vask', 'Travhest med blå bandager på vaskepladsen', { sizes: '(min-width: 900px) 18vw, 40vw' })}</div>
      </div>
    </div>
    ${ydelser(o)}
    <p class="note" data-vis>Kontakt Magnus for pris.</p>
  </div>
</section>

<section class="film" aria-label="Billeder fra stalden og banen">
  <ul class="film__spor">${[
    ['stald-sele', 'Travhest med løbstøj i staldgangen'],
    ['i-loeb', 'Magnus M. Nielsen i sulkyen bag en travhest i fuld fart'],
    ['stald-lys', 'Brun travhest i den lyse staldgang'],
    ['stald-fold', 'Travhest med hue og dækken foran foldene'],
    ['stald-moerk', 'Mørk travhest set tæt på i stalden'],
    ['hest-glad-nock', 'Travhest i fuld fart på banen'],
    ['stald-bandager', 'Travhest med blå bandager i staldgangen'],
    ['stald-blik', 'Travhest kigger frem fra staldgangen'],
  ].map(([navn, alt]) => `
    <li style="--r:${BILLEDER[navn][0]}">${img(navn, alt, { sizes: `(min-width: 1445px) ${Math.round(520 * BILLEDER[navn][0])}px, ${Math.round(36 * BILLEDER[navn][0])}vw` })}</li>`).join('')}
  </ul>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Heste i træning</p>
        <h2 data-vis style="--i:1">Holdet <em>på Flyvej.</em></h2>
      </div>
      <p data-vis style="--i:2">${o.heste.length} heste står på træningslisten lige nu${o.ungheste.length > 1 ? ` – ${o.ungheste.length} ungheste på vej og ${o.heste.length - o.ungheste.length} i løbsalderen` : ''}.</p>
    </div>
    ${o.fotoheste.length ? `<div class="kortraekke">${o.fotoheste.slice(0, 4).map((h) => hestekort(h, `${R}heste/#hest-${h.id}`)).join('')}
    </div>` : ''}
    <p class="midt" data-vis>${knap('heste/', `Se alle ${o.heste.length} heste`, 'knap--kant')}</p>
  </div>
</section>

<section class="sek--mork resbane">
  <div class="resbane__billede">${img('magnus-giovanni', 'Magnus M. Nielsen i sulkyen bag travhesten Giovanni')}</div>
  <div class="wrap duo duo--top">
    <div class="duo__tekst">
      <p class="oje" data-vis>Resultater</p>
      <h2 data-vis style="--i:1">Seneste <em>fra banen.</em></h2>
      <p class="indled" data-vis style="--i:2">Staldens seneste starter og kommende løb – hentet fra Dansk Hestevæddeløb og opdateret ${o.opdateret}.</p>
      <p class="valg" data-vis style="--i:3">${knap('resultater/', 'Alle resultater', 'knap--lys')} ${ekstern(SITE.travinfo, 'Se Travinfo')}</p>
    </div>
    <div class="duo__lister" data-vis style="--i:2">
      <h3 class="mini">Seneste starter</h3>
      ${resultatliste(o.seneste.slice(0, 5))}
      ${o.kommende.length ? `<h3 class="mini">Kommende starter</h3>
      ${kommendeListe(o.kommende.slice(0, 4))}` : ''}
    </div>
  </div>
</section>

${ejerbaand()}

<section class="sek sek--smal">
  <div class="wrap partnere">
    <h2 class="oje" data-vis>Samarbejdspartnere</h2>
    <div class="partnere__gitter">
      ${partnerKrafft()}
      ${partnerSkive('Hjemmebane', 1)}
    </div>
  </div>
</section>

<section class="sek sek--tone sek--smal">
  <div class="wrap sekhoved sekhoved--foelg">
    <div>
      <p class="oje" data-vis>Følg stalden</p>
      <h2 data-vis style="--i:1">Hverdagen, <em>dag for dag.</em></h2>
      <p data-vis style="--i:2">Dagens starter, resultater og nyt om hestene deles løbende på Facebook og Instagram.</p>
    </div>
    <div>
      <div class="fliser">
        <div class="billede" data-vis="billede">${img('flise-1', 'Travhest med blis i staldgangen', { sizes: '(min-width: 961px) 13vw, 30vw' })}</div>
        <div class="billede" data-vis="billede" style="--i:1">${img('flise-2', 'Travhest i staldgangen', { sizes: '(min-width: 961px) 13vw, 30vw' })}</div>
        <div class="billede" data-vis="billede" style="--i:2">${img('flise-3', 'Travhest står i staldgangen', { sizes: '(min-width: 961px) 13vw, 30vw' })}</div>
      </div>
      <ul class="some" data-vis style="--i:2">
        <li><a href="${SITE.facebook}" target="_blank" rel="noopener"><span>Facebook</span><b>${SITE.navn}</b>${ud}${nyFane}</a></li>
        <li><a href="${SITE.instagram}" target="_blank" rel="noopener"><span>Instagram</span><b>@stald_magnusmnielsen</b>${ud}${nyFane}</a></li>
      </ul>
      <div class="fb" data-fb="${SITE.facebook}">
        <button class="knap knap--kant" type="button">Vis de seneste opslag ${pil}</button>
        <p class="fb__note">Opslagene hentes fra Facebook og sætter cookies derfra.</p>
      </div>
    </div>
  </div>
</section>
${kontaktbaand()}`;

const omMagnus = (o, data) => `
${sidehoved({
  oje: 'Om Magnus',
  h1: 'Om <em>Magnus</em>',
  tekst: `Professionel travtræner og kusk med A1-licens. Født i ${data.traener.foedt} – og med ${esc(data.traener.hjemmebane)} som hjemmebane.`,
  billede: 'magnus-sulky',
  bred: 'magnus-giovanni',
  alt: 'Magnus M. Nielsen i sulkyen bag travhesten Giovanni',
  pos: '50% 22%',
  posBred: '50% 28%',
})}

<section class="sek">
  <div class="wrap artikel">
    <aside class="fakta">
      <div class="fakta__foto billede" data-vis="billede">${img('magnus', 'Magnus M. Nielsen i sulkyen med vinderbuket', { sizes: '(min-width: 961px) 30vw, 92vw' })}</div>
      <h2 class="oje">Kort fortalt</h2>
      <dl>
        <div><dt>Født</dt><dd>${data.traener.foedt}</dd></div>
        <div><dt>Licens</dt><dd>${esc(data.traener.licens)} – professionel træner og kusk</dd></div>
        <div><dt>Hjemmebane</dt><dd>${esc(data.traener.hjemmebane)}</dd></div>
        <div><dt>Farver</dt><dd>Blå, grå og hvid</dd></div>
        <div><dt>Stald</dt><dd>${SITE.gade}, ${SITE.postnr} ${SITE.by}</dd></div>
        <div><dt>Heste i træning</dt><dd>${o.heste.length}</dd></div>
      </dl>
    </aside>
    <div class="prosa">
      <h2 data-vis>Kusken</h2>
      <p class="indled" data-vis>Magnus M. Nielsen kommer fra en travfamilie, hvor også Mads Hviid og Casper M. Nielsen er aktive kuske. Selv slog han igennem som jockey.</p>
      <p data-vis>I 2021 vandt han DM for jockeyer i Aalborg, og på Åby i Sverige vandt han talentløbet Summer Meeting Talents to år i træk. I 2024 fulgte en andenplads ved DM for jockeyer og 11 sejre på en sæson, og i januar 2025 blev han nomineret til Årets Komet ved Hestesportens Galla.</p>
      <p data-vis>Blandt sejrene fra jockeyårene er en afdeling af Sigter mod stjernerne i Aarhus med Major Love og en sejr i Jockeyserien ved Derbymeetinget på Charlottenlund med New York Lobell. Til daglig arbejdede han dengang hos Skive-træneren Morten Friis.</p>

      <h2 data-vis>Træneren</h2>
      <p data-vis>Den første sejr som træner kom 29. december 2024, da hoppen Hit Me vandt i Aalborg. I 2025 var hun stadig den eneste hest, Magnus startede som træner. I løbet af 2026 voksede stalden fra én hest til over tyve.</p>
      <p data-vis>Lige nu står ${o.heste.length} heste på træningslisten. I ${o.saeson.aar} har stalden vundet ${o.saeson.sejre} løb på ${o.saeson.starter} starter, og som kusk har Magnus vundet ${o.kusk.sejre} løb i samme sæson.</p>
      <p data-vis>Blandt højdepunkterne i 2026 er tre vindere på samme løbsdag på hjemmebanen 10. juni, Kriteriumsvinderen Karat C N, der vandt i Aalborg to uger efter debuten for stalden, og en tredjeplads til Hit Me i DM for hopper på Fyn.</p>
    </div>
  </div>
</section>

<section class="sek sek--flad">
  <div class="wrap">
    ${figur('i-loeb', 'Magnus M. Nielsen i sulkyen bag en travhest i fuld fart', 'Magnus M. Nielsen i fuld fart.', { sizes: '(min-width: 1500px) 1400px, 92vw' })}
  </div>
</section>

<section class="sek sek--mork">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Milepæle</p>
        <h2 data-vis style="--i:1">Karrieren <em>kort.</em></h2>
      </div>
    </div>
    <ol class="tidslinje">
      <li data-vis><span class="tidslinje__aar">2021</span><h3>Danmarksmester for jockeyer</h3><p>Vinder DM for jockeyer i Aalborg.</p></li>
      <li data-vis style="--i:1"><span class="tidslinje__aar">2022–23</span><h3>Summer Meeting Talents</h3><p>Vinder talentløbet på Åby i Sverige to år i træk.</p></li>
      <li data-vis style="--i:2"><span class="tidslinje__aar">2024</span><h3>Årets Komet-nominering</h3><p>Nr. 2 ved DM for jockeyer, 11 sejre på en sæson og første sejr som træner. Nomineres til Årets Komet ved Hestesportens Galla.</p></li>
      <li data-vis style="--i:3"><span class="tidslinje__aar">2026</span><h3>Egen stald i vækst</h3><p>Stalden vokser fra én hest til over tyve – med tre vindere på én løbsdag i Skive 10. juni.</p></li>
    </ol>
  </div>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Statistik</p>
        <h2 data-vis style="--i:1">Sæson <em>for sæson.</em></h2>
      </div>
      <p data-vis style="--i:2">Officielle tal fra Dansk Hestevæddeløb, opdateret ${o.opdateret}.<br>${ekstern(SITE.travinfo, 'Se alle tal på Travinfo')}</p>
    </div>
    <div class="tabeller tabeller--diagram" data-vis>
      ${soejler('Sejre som træner', data.traenerStatistik)}
      ${soejler('Sejre som kusk', data.kuskStatistik)}
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${ejerbaand()}
${kontaktbaand()}`;

const stalden = (o) => `
${sidehoved({
  oje: 'Stalden',
  h1: 'Stalden <em>i Skive</em>',
  tekst: `På Flyvej i Skive – samme vej som hjemmebanen Skive Trav – har ${SITE.navn} ${o.heste.length} heste i træning.`,
  billede: 'hoved-stalden',
  bred: 'hoved-stalden-bred',
  alt: 'Brun travhest i staldgangen under ovenlysvinduerne',
  pos: '62% 20%',
  posBred: '50% 3%',
})}

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Miljøet</p>
        <h2 data-vis style="--i:1">Et kig <em>ind i stalden.</em></h2>
      </div>
      <p data-vis style="--i:2">Lyse staldgange, vaskeplads og folde – og staldens navn på både grimer og hovklokker.</p>
    </div>
    <div class="galleri">${[
      ['stald-hest', 'Mørk travhest med hue i staldgangen – med staldens navneskilt på grimen', 'Staldens navn på grimen.'],
      ['stald-sele', 'Travhest med løbstøj i staldgangen', 'Selet op i staldgangen.'],
      ['stald-detalje', 'Hovklokke med staldens logo', 'Logoet helt ned på hovklokkerne.'],
      ['stald-lys', 'Brun travhest i den lyse staldgang', ''],
      ['stald-fold', 'Travhest med hue og dækken foran foldene', 'Ude ved foldene.'],
      ['stald-moerk', 'Mørk travhest set tæt på i stalden', ''],
      ['stald-vask', 'Travhest med blå bandager på vaskepladsen', 'På vaskepladsen.'],
      ['stald-ro', 'Travhest står i staldgangen', ''],
      ['stald-blik', 'Travhest kigger frem fra staldgangen', ''],
    ].map(([navn, alt, tekst]) => `
      ${figur(navn, alt, tekst, { sizes: '(min-width: 901px) 30vw, 46vw' })}`).join('')}
    </div>
  </div>
</section>

<section class="sek sek--tone">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Det tilbyder stalden</p>
        <h2 data-vis style="--i:1">Fra første tilkøring <em>til målstregen.</em></h2>
      </div>
      <p data-vis style="--i:2">Stalden har lige nu heste fra ${o.aldre[0]} til ${o.aldre[1]} år i træning.</p>
    </div>
    ${ydelser(o)}
    <p class="note" data-vis>Kontakt Magnus for pris. ${laes('kontakt/', 'Kontakt Magnus')}</p>
  </div>
</section>

<section class="sek">
  <div class="wrap duo">
    <div class="duo__tekst">
      <p class="oje" data-vis>Hjemmebanen</p>
      <h2 data-vis style="--i:1">Skive <em>Trav.</em></h2>
      <p class="indled" data-vis style="--i:2">Skive Trav er staldens hjemmebane${o.hjemmestarter ? ` – i ${o.saeson.aar} har stalden haft ${o.hjemmestarter} starter her` : ''}.</p>
      <p data-vis style="--i:3">Banen åbnede i 1948 som Nordvestjysk Væddeløbsbane og har ligget på Flyvej siden 1966. Et nyt lysanlæg fra 2019–20 gør det muligt at køre løb hele vinteren.</p>
      <p class="valg" data-vis style="--i:4">${ekstern(SITE.skiveTrav, 'skive-trav.dk')} ${ekstern(SITE.kort, 'Find vej til stalden')}</p>
      <dl class="adresser" data-vis style="--i:5">
        <div><dt>Stalden</dt><dd>${SITE.navn}<br>${SITE.gade}, ${SITE.postnr} ${SITE.by}</dd></div>
        <div><dt>Hjemmebane</dt><dd>Skive Trav<br>Flyvej 2, 7800 Skive</dd></div>
      </dl>
    </div>
    <figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.banetal.some((b) => b.kode === 'Sk') ? o.banetal : [{ kode: 'Sk', navn: 'Skive' }, ...o.banetal], `Danmarkskort med staldens starter pr. bane i ${o.saeson.aar}: ${o.banetal.map((b) => `${b.navn} ${b.antal}`).join(', ')}.`)}
      <figcaption>Staldens starter pr. bane i ${o.saeson.aar}. Ringen markerer hjemmebanen.</figcaption>
    </figure>
  </div>
</section>
${ejerbaand()}
${kontaktbaand()}`;

const hesteraekke = (h, i) => `
      <li class="hest" id="hest-${h.id}" data-vis style="--i:${i % 6}">
        <span class="hest__foto" aria-hidden="true">${HESTEFOTO[h.id] ? `<img src="${R}assets/img/${HESTEFOTO[h.id]}-560.webp" width="560" height="700" alt="" loading="lazy" decoding="async">` : esc(h.navn[0])}</span>
        <div class="hest__navn">
          <h3>${esc(h.navn)}</h3>
          <p>${afstamning(h)}</p>
        </div>
        <p class="hest__om">${omHest(h)}</p>
        ${h.starter ? `<dl class="hest__tal">
          <div><dt>Starter</dt><dd>${h.starter} <span>${esc(h.placeringer)}</span></dd></div>
          <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>` : '<p class="hest__tal hest__tal--tom">Ustartet</p>'}
        <a class="hest__link" href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener" aria-label="${esc(h.navn)} på Travinfo (åbner i ny fane)">${ud}</a>
      </li>`;
const hestegruppe = (titel, heste) => (heste.length ? `
    <div class="gruppe">
      <h2 class="gruppe__titel" data-vis>${titel} <span>${heste.length}</span></h2>
      <ul class="hesteliste">${heste.map(hesteraekke).join('')}
      </ul>
    </div>` : '');

const heste = (o) => `
${sidehoved({
  oje: 'Heste',
  h1: 'Heste <em>i<br>træning</em>',
  tekst: `${o.heste.length} heste står lige nu på træningslisten hos Magnus M. Nielsen. Listen kommer direkte fra Dansk Hestevæddeløb og følger automatisk med, når heste kommer til eller rejser videre.`,
  billede: 'hoved-heste',
  bred: 'hoved-heste-bred',
  alt: 'To heste på folden ved stalden',
  pos: '62% 45%',
  posBred: '50% 45%',
})}
${o.fotoheste.length ? `
<section class="sek sek--tone">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>I fokus</p>
        <h2 data-vis style="--i:1">Ansigter <em>fra stalden.</em></h2>
      </div>
    </div>
    <div class="kortraekke kortraekke--tre">${o.fotoheste.slice(0, o.fotoheste.length > 3 ? o.fotoheste.length - (o.fotoheste.length % 3) : 3).map((h) => hestekort(h, `https://travinfo.dk/horse_tabs/${h.id}`, true)).join('')}
    </div>
  </div>
</section>` : ''}

<section class="sek">
  <div class="wrap">
    ${hestegruppe('Løbsheste', o.heste.filter((h) => h.alder >= 3))}
    ${hestegruppe('2-årige', o.heste.filter((h) => h.alder === 2))}
    ${hestegruppe('Åringer', o.heste.filter((h) => h.alder <= 1))}
    <p class="note" data-vis>Starter, placeringer (1.–2.–3.), præmiesum og rekord er livstal. Rekorden er hestens hurtigste kilometertid; a = autostart, k/m/l = kort, mellem og lang distance. Kilde: Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
  </div>
</section>
${ejerbaand()}
${kontaktbaand()}`;

const resultater = (o, data) => `
${sidehoved({
  oje: 'Resultater',
  h1: 'Staldens <em>resultater</em>',
  tekst: `Staldens seneste starter, kommende løb og sæsonens tal. Data kommer fra Dansk Hestevæddeløb og er senest opdateret ${o.opdateret}.`,
  billede: 'side-resultater',
  bred: 'side-resultater-bred',
  alt: 'Travhest i fuld fart på banen',
  pos: '60% 35%',
  posBred: '50% 12%',
})}

<section class="sek sek--tone sek--smal sek--taet-bund">
  <div class="wrap">
    <h2 class="oje" data-vis>Stalden i ${o.saeson.aar}</h2>
    <dl class="noegletal" data-vis style="--i:1">
      <div><dt>Starter</dt><dd>${o.saeson.starter}</dd></div>
      <div><dt>Sejre</dt><dd>${o.saeson.sejre}</dd></div>
      <div><dt>2.-pladser</dt><dd>${o.saeson.toer}</dd></div>
      <div><dt>3.-pladser</dt><dd>${o.saeson.treer}</dd></div>
      <div><dt>Sejrsprocent</dt><dd>${o.saeson.procent}<small>&nbsp;%</small></dd></div>
      <div><dt>Indkørt</dt><dd>${nf(o.saeson.praemier)}<small>&nbsp;kr.</small></dd></div>
    </dl>
    <div class="form" data-vis style="--i:2">
      <h3 class="mini">Formkurve – de seneste ${o.seneste.length} starter</h3>
      <ol>${o.seneste.map(placMaerke).join('')}</ol>
    </div>
  </div>
</section>

<section class="sek sek--taet-top">
  <div class="wrap resgitter">
    <div>
      <div class="sekhoved sekhoved--lille">
        <div>
          <p class="oje" data-vis>Seneste</p>
          <h2 data-vis style="--i:1">De seneste <em>${o.seneste.length} starter.</em></h2>
        </div>
      </div>
      <div data-vis>${resultatliste(o.seneste)}</div>
      <p class="note" data-vis>Tider er kilometertider. a = autostart, g = galop undervejs. – = uplaceret, disk. = diskvalificeret.</p>
    </div>
    <aside>
      <h2 class="oje" data-vis>Kommende starter</h2>
      ${o.kommende.length ? `<div data-vis style="--i:1">${kommendeListe(o.kommende)}</div>` : `<p data-vis style="--i:1">Ingen af staldens heste er startmeldt lige nu.</p>`}
      <p class="valg" data-vis style="--i:2">${ekstern(SITE.travinfo, 'Startlister på Travinfo')}</p>
    </aside>
  </div>
</section>

<section class="sek sek--mork">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        <p class="oje" data-vis>Statistik</p>
        <h2 data-vis style="--i:1">Sæson <em>for sæson.</em></h2>
      </div>
      <p data-vis style="--i:2">Alle resultater, startlister og detaljer findes hos Dansk Hestevæddeløb.<br>${ekstern(SITE.travinfo, 'Åbn Travinfo', 'knap knap--lys')}</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${kontaktbaand()}`;

const kontakt = () => `
${sidehoved({
  oje: 'Kontakt',
  h1: 'Kontakt <em>Magnus</em>',
  tekst: 'Har du en hest, der skal i træning, eller et spørgsmål til stalden? Ring, send en sms eller skriv en mail.',
  billede: 'hoved-kontakt',
  bred: 'hoved-kontakt-bred',
  alt: 'Mørkebrun travhest i staldgangen',
  pos: '58% 8%',
  posBred: '50% 3%',
})}

<section class="sek">
  <div class="wrap kontakt">
    <div class="kontakt__felt" data-vis>
      <h2 class="oje">Telefon</h2>
      <p class="kontakt__stor"><a href="tel:${tlfLink}">${SITE.telefon}</a></p>
      <p class="valg"><a class="knap" href="tel:${tlfLink}">Ring op ${pil}</a> <a class="laes" href="sms:${tlfLink}">Send en sms ${pil}</a></p>
    </div>
    <div class="kontakt__felt" data-vis style="--i:1">
      <h2 class="oje">E-mail</h2>
      <p class="kontakt__stor kontakt__stor--mail"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="valg"><a class="knap knap--kant" href="mailto:${SITE.email}?subject=${encodeURIComponent('Henvendelse fra hjemmesiden')}">Skriv en mail ${pil}</a></p>
    </div>
    <div class="kontakt__felt kontakt__felt--kort" data-vis style="--i:2">
      <div>
        <h2 class="oje">Stalden</h2>
        <address>${SITE.navn}<br>${SITE.gade}<br>${SITE.postnr} ${SITE.by}</address>
        <p class="valg">${ekstern(SITE.kort, 'Find vej')}</p>
      </div>
      <div class="kort kort--mini">${danmarkskort([{ kode: 'Sk', navn: 'Skive' }], 'Danmarkskort, hvor Skive er markeret')}</div>
    </div>
    <div class="kontakt__felt" data-vis style="--i:3">
      <h2 class="oje">Følg stalden</h2>
      <ul class="kontakt__links">
        <li>${ekstern(SITE.facebook, 'Facebook')}</li>
        <li>${ekstern(SITE.instagram, 'Instagram')}</li>
        <li>${ekstern(SITE.travinfo, 'Travinfo')}</li>
      </ul>
    </div>
  </div>
</section>

<section class="sek sek--tone sek--smal">
  <div class="wrap partnere">
    <h2 class="oje" data-vis>Hjemmebane og samarbejdspartner</h2>
    <div class="partnere__gitter">
      ${partnerSkive('Flyvej 2, 7800 Skive')}
      ${partnerKrafft(1)}
    </div>
  </div>
</section>`;

const ikkeFundet = () => `
<section class="sidehoved sidehoved--enkel">
  <div class="wrap">
    <div class="sidehoved__tekst">
      <p class="oje">Fejl 404</p>
      <h1>Siden <em>findes ikke</em></h1>
      <p class="indled">Adressen er forkert, eller siden er flyttet.</p>
      <p>${knap('', 'Til forsiden', 'knap--lys')}</p>
    </div>
  </div>
</section>`;

/** Alle sider som [{ sti, html }]. `idag` er YYYY-MM-DD, `v` et versionsmærke til css/js. */
export function sider(data, { v, idag, kort }) {
  V = v;
  KORT = kort;
  const o = afled(data, idag);
  const side = (sti, def) => {
    R = sti === '404.html' ? new URL(SITE.url + '/').pathname : sti ? '../' : '';
    return { sti: sti.endsWith('.html') ? sti : `${sti}index.html`, url: sti, html: layout({ sti, o, ...def() }) };
  };
  return [
    side('', () => ({
      titel: `${SITE.navn} – professionel travtræner i Skive`,
      beskrivelse: `Magnus M. Nielsen er professionel travtræner og kusk med Skive Trav som hjemmebane. Tilkøring af ungheste og træning af løbsheste – ${o.heste.length} heste i træning.`,
      klasse: 'forside',
      indhold: forside(o),
    })),
    side('om-magnus/', () => ({
      titel: `Om Magnus M. Nielsen – travtræner og kusk | ${SITE.navn}`,
      beskrivelse: 'Mød Magnus M. Nielsen: født 2001, dansk mester for jockeyer i 2021, nomineret til Årets Komet – og i dag professionel travtræner med egen stald i Skive.',
      indhold: omMagnus(o, data),
    })),
    side('stalden/', () => ({
      titel: `Stalden – travtræning og tilkøring i Skive | ${SITE.navn}`,
      beskrivelse: `${SITE.navn} holder til på Flyvej i Skive med Skive Trav som hjemmebane. Træning af løbsheste, tilkøring af ungheste og sparring ved hestekøb.`,
      indhold: stalden(o),
    })),
    side('heste/', () => ({
      titel: `Heste i træning | ${SITE.navn}`,
      beskrivelse: `Se de ${o.heste.length} travheste, der lige nu er i træning hos Magnus M. Nielsen i Skive – med afstamning, starter, præmiesum og rekord.`,
      indhold: heste(o),
    })),
    side('resultater/', () => ({
      titel: `Resultater og statistik | ${SITE.navn}`,
      beskrivelse: `Seneste resultater, kommende starter og sæsonstatistik for travtræner Magnus M. Nielsen: ${o.saeson.sejre} sejre på ${o.saeson.starter} starter i ${o.saeson.aar}.`,
      indhold: resultater(o, data),
    })),
    side('kontakt/', () => ({
      titel: 'Kontakt Magnus M. Nielsen – travtræner i Skive',
      beskrivelse: `Kontakt ${SITE.navn}: telefon ${SITE.telefon}, ${SITE.email}. Stalden ligger på ${SITE.gade}, ${SITE.postnr} ${SITE.by}.`,
      indhold: kontakt(),
    })),
    side('404.html', () => ({
      titel: `Siden findes ikke | ${SITE.navn}`,
      beskrivelse: 'Siden findes ikke.',
      noindex: true,
      indhold: ikkeFundet(),
    })),
  ];
}
