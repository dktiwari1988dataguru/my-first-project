// ══════════════════════════════════════
//  WORLD CLOCK
// ══════════════════════════════════════

// Country → Timezone + Flag mapping
const countryData = {
  'india': { tz: 'Asia/Kolkata',        flag: '🇮🇳', name: 'India' },
  'usa':   { tz: 'America/New_York',    flag: '🇺🇸', name: 'USA (NY)' },
  'uk':    { tz: 'Europe/London',       flag: '🇬🇧', name: 'UK' },
  'japan': { tz: 'Asia/Tokyo',          flag: '🇯🇵', name: 'Japan' },
  'dubai': { tz: 'Asia/Dubai',          flag: '🇦🇪', name: 'Dubai' },
  'australia': { tz: 'Australia/Sydney',flag: '🇦🇺', name: 'Australia' },
  'germany':   { tz: 'Europe/Berlin',   flag: '🇩🇪', name: 'Germany' },
  'canada':    { tz: 'America/Toronto', flag: '🇨🇦', name: 'Canada' },
  'france':    { tz: 'Europe/Paris',    flag: '🇫🇷', name: 'France' },
  'china':     { tz: 'Asia/Shanghai',   flag: '🇨🇳', name: 'China' },
  'russia':    { tz: 'Europe/Moscow',   flag: '🇷🇺', name: 'Russia' },
  'singapore': { tz: 'Asia/Singapore',  flag: '🇸🇬', name: 'Singapore' },
  'brazil':    { tz: 'America/Sao_Paulo',flag:'🇧🇷', name: 'Brazil' },
  'pakistan':  { tz: 'Asia/Karachi',    flag: '🇵🇰', name: 'Pakistan' },
  'nepal':     { tz: 'Asia/Kathmandu',  flag: '🇳🇵', name: 'Nepal' },
  'italy':     { tz: 'Europe/Rome',     flag: '🇮🇹', name: 'Italy' },
  'spain':     { tz: 'Europe/Madrid',   flag: '🇪🇸', name: 'Spain' },
  'mexico':    { tz: 'America/Mexico_City',flag:'🇲🇽',name:'Mexico' },
  'saudi arabia':{ tz:'Asia/Riyadh',    flag:'🇸🇦', name:'Saudi Arabia'},
  'south korea':{ tz:'Asia/Seoul',      flag:'🇰🇷', name:'South Korea'},
  'new zealand':{ tz:'Pacific/Auckland',flag:'🇳🇿', name:'New Zealand'},
  'south africa':{ tz:'Africa/Johannesburg',flag:'🇿🇦',name:'South Africa'},
  'turkey':    { tz: 'Europe/Istanbul', flag: '🇹🇷', name: 'Turkey' },
  'thailand':  { tz: 'Asia/Bangkok',    flag: '🇹🇭', name: 'Thailand' },
  'indonesia': { tz: 'Asia/Jakarta',    flag: '🇮🇩', name: 'Indonesia' },
  'malaysia':  { tz: 'Asia/Kuala_Lumpur',flag:'🇲🇾',name:'Malaysia'  },
  'bangladesh':{ tz: 'Asia/Dhaka',      flag: '🇧🇩', name: 'Bangladesh'},
  'sri lanka': { tz: 'Asia/Colombo',    flag: '🇱🇰', name: 'Sri Lanka' },
  'hong kong': { tz: 'Asia/Hong_Kong',  flag: '🇭🇰', name: 'Hong Kong' },
  'kenya':     { tz: 'Africa/Nairobi',  flag: '🇰🇪', name: 'Kenya'     },
  'nigeria':   { tz: 'Africa/Lagos',    flag: '🇳🇬', name: 'Nigeria'   },
  'egypt':     { tz: 'Africa/Cairo',    flag: '🇪🇬', name: 'Egypt'     },
  'argentina': { tz: 'America/Argentina/Buenos_Aires',flag:'🇦🇷',name:'Argentina'},
  'sweden':    { tz: 'Europe/Stockholm',flag: '🇸🇪', name: 'Sweden'    },
  'norway':    { tz: 'Europe/Oslo',     flag: '🇳🇴', name: 'Norway'    },
  'greece':    { tz: 'Europe/Athens',   flag: '🇬🇷', name: 'Greece'    },
  'portugal':  { tz: 'Europe/Lisbon',   flag: '🇵🇹', name: 'Portugal'  },
};

let activeClocks = [];

function addClock() {
  const input = document.getElementById('countryInput').value.trim().toLowerCase();
  if (!input) return;

  const data = countryData[input];
  if (!data) {
    alert(`❌ "${input}" nahi mila!\nTry karo: India, USA, UK, Japan, Dubai, Germany...`);
    return;
  }

  if (activeClocks.find(c => c.tz === data.tz)) {
    alert('Ye clock already add hai!');
    return;
  }

  quickAdd(data.name, data.tz, data.flag);
  document.getElementById('countryInput').value = '';
}

function quickAdd(name, tz, flag) {
  if (activeClocks.find(c => c.tz === tz)) return;

  const id = 'clock_' + Date.now();
  activeClocks.push({ id, name, tz, flag });

  const container = document.getElementById('clocks-container');
  const card = document.createElement('div');
  card.className = 'clock-card';
  card.id = id;
  card.innerHTML = `
    <button class="remove" onclick="removeClock('${id}')">✕</button>
    <div class="flag">${flag}</div>
    <div class="city">${name}</div>
    <div class="time" id="time_${id}">--:--:--</div>
    <div class="date" id="date_${id}">---</div>
  `;
  container.appendChild(card);
  updateClock({ id, tz });
}

function removeClock(id) {
  activeClocks = activeClocks.filter(c => c.id !== id);
  document.getElementById(id).remove();
}

function updateClock(clock) {
  const el = document.getElementById('time_' + clock.id);
  const dateEl = document.getElementById('date_' + clock.id);
  if (!el) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: clock.tz,
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  const dateStr = now.toLocaleDateString('en-IN', {
    timeZone: clock.tz,
    weekday: 'short', day: 'numeric', month: 'short'
  });

  el.textContent = timeStr;
  dateEl.textContent = dateStr;
}

// Update all clocks every second
setInterval(() => {
  activeClocks.forEach(updateClock);
}, 1000);

// Auto-add India on load
quickAdd('India', 'Asia/Kolkata', '🇮🇳');

// Enter key support
document.getElementById('countryInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addClock();
});


// ══════════════════════════════════════
//  CURRENCY CONVERTER (Live Rates)
// ══════════════════════════════════════

let ratesCache = {};
let lastFetch = 0;

async function getRates(base) {
  const now = Date.now();
  if (ratesCache[base] && (now - lastFetch) < 3600000) {
    return ratesCache[base];
  }
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
    const data = await res.json();
    ratesCache[base] = data.rates;
    ratesCache[base][base] = 1;
    lastFetch = now;
    return ratesCache[base];
  } catch {
    return null;
  }
}

async function convert() {
  const amount  = parseFloat(document.getElementById('amount').value) || 0;
  const from    = document.getElementById('fromCurr').value;
  const to      = document.getElementById('toCurr').value;
  const resultEl= document.getElementById('result-text');
  const rateEl  = document.getElementById('rate-info');

  if (from === to) {
    resultEl.textContent = `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`;
    rateEl.textContent   = 'Same currency!';
    return;
  }

  resultEl.innerHTML = '<span class="loading">⏳ Live rate fetch kar raha hoon...</span>';
  rateEl.textContent = '';

  const rates = await getRates(from);
  if (!rates || !rates[to]) {
    resultEl.innerHTML = '<span class="error">❌ Rate nahi mila. Internet check karo.</span>';
    return;
  }

  const rate     = rates[to];
  const converted= (amount * rate).toFixed(4);
  const cleanAmt = parseFloat(converted);

  resultEl.textContent = `${amount.toLocaleString()} ${from} = ${cleanAmt.toLocaleString()} ${to}`;
  rateEl.textContent   = `1 ${from} = ${rate.toFixed(4)} ${to}  •  Live rate`;
}

function swapCurrency() {
  const f = document.getElementById('fromCurr');
  const t = document.getElementById('toCurr');
  [f.value, t.value] = [t.value, f.value];
  convert();
}

function quickConvert(from, to) {
  document.getElementById('fromCurr').value = from;
  document.getElementById('toCurr').value   = to;
  convert();
}

// Convert on load
convert();
