// One list of work, shared by the Home folders and the Projects page.
// Add a project by adding a line to `projects`; the folders and counts update themselves.
const ASSET = '';
// images starting with ./ live in this site; everything else is on Ericha's own site
const imgSrc = img => img.startsWith('./') ? img : ASSET + img;

const fields = [
  { id: 'uiux', name: 'UI/UX', blurb: 'Apps, platforms and landing pages.' },
  { id: 'social', name: 'Social Media Design', blurb: 'Feed systems people stop scrolling for.' },
  { id: 'brand', name: 'Brand Design', blurb: 'Identities and brand content.' },
  { id: 'video', name: 'Video Editing', blurb: 'AI commercials and short-form cuts.' },
];

const projects = [
  { field: 'uiux', title: 'GoFleet', org: 'Paragon · technical challenge', year: '2026', img: './assets/thumbs/gofleet.jpg',
    desc: 'An internal vehicle booking product where employees state what they need, clear-cut requests are confirmed instantly and the coordinator only decides the contested ones.',
    tags: ['Web app', 'Live prototype'], href: 'https://gofleet-ericha.vercel.app/?lang=en', case: 'gofleet' },
  { field: 'uiux', title: 'Videfly', org: 'Videfly', year: '2024 – 2026', status: 'Shipped', img: './assets/thumbs/videfly.jpg',
    desc: 'Five core product experiences and every landing page for an AI platform that creates, produces and optimises marketing videos.',
    tags: ['Product design', 'Landing pages'], href: 'work/videfly-product-design.html', case: 'videfly' },
  { field: 'uiux', title: 'UTVIP', org: 'PT United Tractors Tbk', year: '2024', img: './assets/thumbs/utvip.jpg',
    desc: 'An internal innovation platform where employees develop ideas and turn insights into actionable solutions.',
    tags: ['Internal platform', 'Web app'], href: 'work/united-tractors.html', case: 'utvip' },
  { field: 'uiux', title: 'Fexplore', org: 'Fexplore', year: '2023 – 2024', img: './assets/thumbs/fexplore.jpg',
    desc: 'A food discovery app that connects diners with exclusive vouchers while helping local food businesses reach new customers.',
    tags: ['Mobile app', 'Vouchers'], href: 'work/fexplore.html', case: 'fexplore' },
  { field: 'social', title: 'Feed Up', org: 'SaaS feedback platform', year: '', img: './assets/thumbs/feedup.jpg',
    desc: 'Social content for a feedback platform, turning product value and everyday pain points into human-centred visuals.',
    tags: ['Instagram', 'Content system'], href: 'work/feedup.html', case: 'feedup' },
  { field: 'social', title: 'NextStep', org: 'Career platform concept', year: '', img: './assets/thumbs/nextstep.jpg',
    desc: 'A cohesive social system for a career development platform: educational posts, campaign visuals and storytelling.',
    tags: ['Content system', 'Campaign'], href: 'work/nextstep.html', case: 'nextstep' },
  { field: 'video', title: 'Videfly AI Creative', org: 'Videfly', year: '2026', img: './assets/thumbs/videfly-ai.jpg',
    desc: 'AI-powered commercials for perfume, resort, cat food and fashion brands, from storyboard and generation to the final edit.',
    tags: ['AI video', 'Short form', 'Editing'], href: 'work/videfly-ai-creative.html', case: 'videfly-ai' },
];

/* repeat a ribbon phrase until it covers the screen, twice for a seamless loop */
document.querySelectorAll('[data-ribbon]').forEach(t => {
  const half = Array(8).fill(t.dataset.ribbon).join('');
  t.innerHTML = `<span>${half}</span><span>${half}</span>`;
});
