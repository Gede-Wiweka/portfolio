/* =========================================================
   Gede Wiweka · Engineering Portfolio — script.js
   Content data + rendering + interactions (no libraries)
   ========================================================= */
'use strict';

/* ---------------------------------------------------------
   1. CONTENT DATA
   --------------------------------------------------------- */
const A = 'assets/';
const LOGO = {
  XL: 'sw-excel.png', GS: 'sw-gsheets.png', AS: 'sw-appsscript.png', IV: 'sw-inventor.png',
  SW: 'sw-solidworks.png', CA: 'sw-catia.png', AC: 'sw-autocad.png', AN: 'sw-ansys.png', AL: 'sw-altair.png'
};
const SVG = {
  CM: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
  NC: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>'
};
const icon = k => LOGO[k] ? `<img src="${A + LOGO[k]}" alt="" loading="lazy">` : (SVG[k] || '');
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

/* Plain-language glossary (shown in Work and inside each case) */
const TERMS = {
  'EVMU': 'Engine vibration monitoring unit: the on-board system that measures engine vibration and supports fan trim balancing.',
  'N1': 'Fan-rotor (low-pressure spool) speed, shown as a percentage of maximum. Vibration is read at set N1 bands.',
  'EDP / EMDP': 'Engine-driven pump and electric motor-driven pump: the two pump types that pressurise the hydraulic system.',
  'ΔP indicator': 'Differential-pressure pop-out on a filter. It trips when the filter clogs, for example with pump wear debris.',
  'N₂ accumulator': 'A nitrogen-charged vessel that stores hydraulic pressure; its pre-charge must stay within limits.',
  'DMI': 'Deferred maintenance item: a defect deferred within approved limits until it is fixed. Open DMIs make up the backlog.',
  'AFML': 'Aircraft flight & maintenance log: the technical logbook where crews and engineers record defects and actions.',
  'AOG': 'Aircraft on ground: critical downtime, when the aircraft cannot fly until the fault is cleared.',
  'WTG INST': '“Waiting installation”: a deferred defect whose part has arrived and is waiting to be fitted.',
  'INVESTIG': '“Under investigation”: a deferred defect still being troubleshot before a repair is chosen.',
  'BITE': 'Built-in test equipment: the system’s own self-test, used to confirm a repair.',
  'EGT': 'Exhaust-gas temperature, read by thermocouples in the engine exhaust.',
  'Megger': 'Insulation-resistance tester (up to 1,000 VDC) that finds leakage to ground in wiring and connectors.',
  'LCR meter': 'Measures inductance (L), capacitance (C) and resistance (R) to check sensors, coils and circuits.',
  'NDT': 'Non-destructive testing: inspecting a part without damaging it, for example by borescope.',
  'VCI': 'Volatile corrosion inhibitor: protects idle internal parts from moisture and pitting.',
  'CMMS (eMRO)': 'Computerised maintenance management system: where work orders and equipment history live.',
  'WO': 'Work order: the record that authorises and documents a maintenance job.',
  'MH': 'Man-hours: the labour time delivered or available.',
  'RCCP': 'Rough-cut capacity planning: checks a production plan against the hours actually available.',
  'ROP': 'Reorder point: the stock level that triggers a new order, including safety stock.',
  'ABC / FSN': 'ABC ranks parts by value; FSN ranks them by movement (fast, slow, non-moving).',
  'HIRADC': 'Hazard identification, risk assessment and determining controls.',
  'LOTO': 'Lock-out / tag-out: isolating energy before anyone works on a machine.',
  'HV': 'Vickers hardness number, from a micro-Vickers indentation test.'
};

const CATS = [
  { id: 'all', label: 'All Work' },
  { id: 'planning', label: 'O&M Planning & CMMS Governance' },
  { id: 'rotating', label: 'Rotating & Fluid Systems' },
  { id: 'electro', label: 'Electro-Mechanical Diagnostics' },
  { id: 'design', label: 'Design, Manufacturing & Testing' }
];

/* Case studies. Every figure comes from the CV, work records or project reports. */
const CASES = [
  {
    id: 'rotating', cats: ['rotating'], cat: 'Rotating machinery',
    tag: 'Remote technical support · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: 'Vibration recovery and preservation on high-speed rotors',
    ins: 'Look, then balance: confirm the blades are sound, then trim-balance instead of tearing the engine down.',
    img: 'plane.jpg', pos: 'center 60%', cap: 'On the apron · Boeing 737-900',
    k: [['3.8 → 0.6', 'Vibration units after trim balance with the on-board monitor (EVMU)'], ['5.3 units', 'Peak fan-rotor (N1) vibration recovered by trim balance'], ['99.79%', 'Delay-free first departures across 4,732 (Sep 2026)']],
    flow: [['Measure', 'Vibration survey'], ['Inspect', 'Borescope / NDT'], ['Balance', 'Fan trim'], ['Verify', 'Re-survey at N1'], ['Release', 'Back to service']],
    p: 'High-speed rotor vibration of 2.9–5.3 units grounded aircraft at remote stations, where balance tooling, spares and specialist skills were not on hand.',
    a: 'From the operations desk I lined up borescope and NDT inspection, trim balancing with the on-board vibration monitor (EVMU) and vibration surveys, and moved balance screws and tooling to site. I also planned preservation: propeller-hub oil draining (MIL-PRF-23699) with VCI corrosion inhibitor and on-wing engine preservation.',
    i: 'Vibration was verified within limits by survey before release (for example 3.8 → 0.6 units at 76–85% fan-rotor speed, N1). Recurring vibration cases fed the station-by-system risk heatmap behind 99.79% dispatch reliability.',
    insight: [['Look, then balance.', 'A borescope or NDT check confirms the blades are sound, so trim balancing with the on-board vibration monitor (EVMU) removes the imbalance without an engine teardown.'], ['Protect what sits idle.', 'Draining the hub oil and adding a corrosion inhibitor (VCI) keeps moisture from pitting internal parts while the assembly waits.']],
    parts: ['Balance screws & trim-balance tooling', 'Borescope / NDT inspection kit', 'MIL-PRF-23699 turbine oil', 'VCI corrosion inhibitor', 'On-wing engine preservation'],
    tools: ['Vibration survey', 'Trim balancing', 'Risk heatmap'],
    charts: [{ type: 'col', title: 'Fan-rotor vibration, example case', sub: 'Vibration units, read at 76–85% N1 before and after trim balance', cats: ['Before trim balance', 'After trim balance'], series: [{ name: 'Vibration', vals: [3.8, 0.6] }], colors: ['--chart-2', '--chart-1'], dec: 1, unit: ' units', max: 5 }],
    terms: ['EVMU', 'N1', 'NDT', 'VCI', 'AOG']
  },
  {
    id: 'fluid', cats: ['rotating'], cat: 'Fluid power & sealing',
    tag: 'Remote technical support · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: 'High-pressure hydraulics, ΔP filtration and seal integrity',
    ins: 'Filters first: ΔP indicators show whether a pump is shedding wear debris before anything is replaced.',
    thumb: 'fluid',
    k: [['18.4 h', 'Recovery of a zero-pressure hydraulic system (target <24 h)'], ['450 psi', 'Max. brake-accumulator drop in 30 min, checked after repair'], ['0 leaks', 'Fuel-panel and pressure-switch repairs closed on leak test']],
    flow: [['Measure', 'Pressure & ΔP'], ['Inspect', 'Filters & debris'], ['Repair', 'Module, seals, N₂'], ['Verify', 'Decay & leak test'], ['Release', 'Back to service']],
    p: 'Hydraulic system pressure dropped to zero at a remote station; other aircraft showed clogged-filter (ΔP) indicators, accumulator nitrogen loss and fuel leaks at access panels and pressure switches.',
    a: 'Supported field teams through isolation: pressure-module replacement, case-drain filter checks for debris from the engine- and motor-driven pumps (EDP/EMDP), ΔP return-filter inspections, N₂ accumulator replacement, and fuel gasket, seal, O-ring and pressure-switch changes. I sourced every part and tool to site.',
    i: 'Each repair closed on an operational or leak test before release. The zero-pressure case recovered within 18.4 h, inside the 24-hour target.',
    insight: [['Filters first.', 'Case-drain and return-filter ΔP indicators show whether a pump is shedding wear debris before anything is replaced.'], ['Zero pressure has a location.', 'With pumps and filters ruled out, a 0 psi reading points to the pressure-control module.'], ['Charge, then prove.', 'Keep accumulator nitrogen pre-charge in limits, then pass a pressure-decay and leak test before release.']],
    parts: ['Pressure module 276A2003-4/-6', 'Case-drain filter 7577741', 'Packing NAS1611-114A', 'Retainer MS28782-25', 'Accumulator SB209L1A1-1484', 'Fuel seal 112W8214-1', 'Gasket 112W8216-1', 'Skydrol LD-4 fluid'],
    tools: ['ΔP filter checks', 'N₂ servicing', 'Pressure-decay test', 'Leak test'],
    charts: [{ type: 'bar', title: 'Zero-pressure recovery time', sub: 'Hours from report to release, against the 24-hour target', cats: ['Hydraulic zero-pressure case'], series: [{ name: 'Recovery', vals: [18.4] }], colors: ['--chart-1'], dec: 1, unit: ' h', max: 28, ref: { v: 24, l: '24 h target' } }],
    terms: ['EDP / EMDP', 'ΔP indicator', 'N₂ accumulator', 'AOG']
  },
  {
    id: 'electro', cats: ['electro'], cat: 'Electro-mechanical & tooling',
    tag: 'Remote technical support · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: 'Fault isolation beyond component swapping',
    ins: 'Stop swapping, start measuring: if a fault returns after a part change, suspect the wiring.',
    thumb: 'electro',
    k: [['1,000 VDC', 'Insulation testers dispatched to remote sites'], ['10.0 MΩ', 'Insulation result after resistance read 16.8 Ω (in limit)'], ['245 / 307', 'Long breakdowns that waited on spares or tools (~80%)'], ['24 h', 'Digital document upload enabled by the station scanner project']],
    flow: [['Read', 'Fault codes & BITE'], ['Measure', 'Resistance & continuity'], ['Test', 'Insulation & LCR'], ['Repair', 'Replace with proof'], ['Verify', 'Operational test'], ['Release', 'Queue closed']],
    p: 'Intermittent sensor and wiring faults kept returning when parts were swapped without proof, and the test equipment needed to prove them sat at the main base.',
    a: 'Coordinated dispatch of Megger MIT420/2 insulation testers, 875B LCR meters and loop/impedance testers, and tracked resistance, insulation, continuity and short-to-ground checks step by step. Example: proximity-sensor resistance read 16.8 Ω (in limit), so the team ran an insulation test (10.0 MΩ) before replacing the sensor and passing the built-in self-test (BITE). I followed the WTG INST and INVESTIG deferred-defect queues to closure and coded the spare and tool constraints behind long breakdowns.',
    i: 'Repairs rested on measurements, not guesses. Coding showed ~80% of breakdowns over 24 hours (245 of 307, Mar–Nov 2026) involved spares or tools, separating logistics waits from troubleshooting time. Planned queue items included an exhaust-gas temperature (EGT) thermocouple, a lock-torsion spring (2D2022-3) and an APU filter cap, plus tooling for Project Transponder (InJourney).',
    insight: [['Stop swapping, start measuring.', 'If a fault returns after a part change, suspect the wiring.'], ['Measure in order.', 'Continuity, 1,000 VDC insulation (Megger) and LCR checks separate a ground leak in wiring or connectors from a failed sensor.'], ['Send the tester with the task.', 'The right meter at a remote site saves a second trip.']],
    seq: [['Read fault codes and self-test', 'Start with what the system reports (BITE) so the search begins in the right circuit.'], ['Resistance / continuity vs limits', 'An in-limit reading (16.8 Ω in the example) rules out an open circuit but not leakage to ground.'], ['Insulation test at the 1,000 VDC range', 'The Megger shows whether wiring or connectors leak to ground (10.0 MΩ in the example).'], ['LCR impedance / loop test', 'Separates a failed sensor or coil from the harness that feeds it.'], ['Replace, then operational test', 'Only the proven faulty part is changed, then a self-test or operational test closes the job.']],
    parts: ['Megger MIT420/2 insulation tester', '875B LCR meter', 'Loop / impedance tester', 'EGT thermocouple', 'Lock-torsion spring 2D2022-3', 'APU filter cap', 'Project Transponder tooling', 'Station document scanners'],
    tools: ['Continuity', 'Insulation resistance', 'LCR impedance', 'Short-to-ground', 'Constraint coding'],
    charts: [{ type: 'bar', title: 'What long breakdowns waited on', sub: '307 coded breakdowns over 24 h, Mar–Nov 2026', cats: ['Spares or tools involved', 'Other causes'], series: [{ name: 'Events', vals: [245, 62] }], colors: ['--chart-1', '--chart-2'], dec: 0, unit: ' events', max: 300 }],
    terms: ['BITE', 'Megger', 'LCR meter', 'EGT', 'WTG INST', 'INVESTIG']
  },
  {
    id: 'backlog', cats: ['planning'], cat: 'Backlog & downtime',
    tag: 'O&M planning · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: 'Backlog campaign, Pareto ranking and downtime-constraint coding',
    ins: 'Most long breakdowns waited on parts or tools, not on the repair itself.',
    thumb: 'backlog',
    k: [['108.0%', 'Backlog-closure achievement, up from 92.1%'], ['495', 'Defects Pareto-ranked by system across 4 fleet types'], ['78.13%', '96 critical events recovered in-house <24 h (target 75%)'], ['245 / 307', 'Long breakdowns involving spares or tools (~80%)']],
    flow: [['Measure', 'Backlog by station'], ['Rank', 'Pareto by system'], ['Code', 'Constraint causes'], ['Act', 'Closure campaign'], ['Review', 'Daily & bi-weekly']],
    p: 'Deferred defects were piling up across a multi-country network, and long breakdowns had no record of what they were actually waiting for.',
    a: 'Co-designed and ran a station-wide deferred-defect closure campaign. Benchmarked closure across 4 fleet types, Pareto-ranked 495 defects by system to focus root-cause work on items open beyond 3 days, and logged 96 critical events with timestamped action logs and spare, tool and troubleshooting codes.',
    i: 'Closure achievement rose from 92.1% to 108.0%, so more defects were closed than opened. In-house recovery within 24 hours reached 78.13% against a 75% target, and the constraint codes showed where downtime really went.',
    insight: [['Key insight.', 'Most long breakdowns waited on parts or tools rather than on the repair itself, so pre-positioning critical spares and test equipment shortens downtime more than adding labour.'], ['Rank before you fix.', 'A Pareto by system points root-cause effort at the few systems that hold most of the backlog.']],
    parts: [],
    tools: [['XL', 'Excel'], ['CM', 'CMMS (eMRO)'], 'Pareto analysis', 'Root cause analysis', 'Risk heatmap'],
    charts: [
      { type: 'col', title: 'Backlog-closure achievement', sub: 'Before and after the station-wide campaign (%)', cats: ['Before', 'After campaign'], series: [{ name: 'Closure', vals: [92.1, 108.0] }], colors: ['--chart-2', '--chart-1'], dec: 1, unit: '%', max: 120, ref: { v: 100, l: '100%' } },
      { type: 'bar', title: 'Breakdowns over 24 h by coded constraint', sub: '307 coded events, Mar–Nov 2026', cats: ['Waiting spare', 'Deep troubleshooting + spare', 'Deep troubleshooting', 'Waiting tools + spare', 'Waiting tools', 'Deep troubleshooting + tools', 'Structure repair', 'Waiting hangar slot', 'Other'], series: [{ name: 'Events', vals: [141, 59, 40, 17, 16, 12, 9, 7, 6] }], colors: ['--chart-1', '--chart-1', '--chart-4', '--chart-1', '--chart-1', '--chart-1', '--chart-2', '--chart-2', '--chart-2'], dec: 0, unit: ' events', max: 160, legend: [['--chart-1', 'Spares or tools involved'], ['--chart-4', 'Troubleshooting only'], ['--chart-2', 'Other']] }
    ],
    terms: ['DMI', 'AOG', 'AFML']
  },
  {
    id: 'cmms', cats: ['planning'], cat: 'CMMS governance',
    tag: 'CMMS data governance · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: '3-way CMMS validation and 24-hour data discipline',
    ins: 'One source is never enough: logs, job reports and work orders disagree, and checking all three exposes the gaps.',
    img: 'apps-script.jpg', contain: true, cap: 'Apps Script behind my maintenance dashboards',
    k: [['30,456', 'CMMS records checked in one month (Oct 2026)'], ['2.5 h → <30 min', 'Daily reconciliation time (~80% faster)'], ['100% / 98.83%', 'Logs / work orders entered within 24 h'], ['77 · 591', 'Missing logs · pending work orders flagged']],
    flow: [['Collect', 'Logs, job reports, WOs'], ['Match', 'Date + asset + station'], ['Flag', 'Missing, pending, late'], ['Correct', 'Station feedback'], ['Report', '7-KPI dashboard']],
    p: 'Late or missing records distorted KPIs and broke the equipment-history trail that maintenance decisions rely on.',
    a: 'Took ownership of a colleague-designed 7-KPI maintenance dashboard and added 3-way validation: flight logs, job reports and CMMS work orders matched on date, asset and station. Enforced 24-hour CMMS input and reconciled work-order status against daily job assignments for same-day closure.',
    i: 'Flagged 77 missing logbook entries and 591 pending work-order uploads for station correction. Input compliance reached 100% (logs, target ≥95%) and 98.83% (work orders, target ≥97.66%), and daily reconciliation fell from 2.5 hours to under 30 minutes.',
    insight: [['Trust the record last.', 'A KPI is only as good as its source. Matching three independent records on the same key shows exactly which entry is missing or late.'], ['Make the rule simple.', 'One 24-hour input rule, checked every morning, kept equipment history complete without extra reporting.']],
    parts: [],
    tools: [['CM', 'CMMS (eMRO)'], ['XL', 'Excel'], ['GS', 'Google Sheets'], ['AS', 'Apps Script'], 'Data validation'],
    charts: [
      { type: 'bar', title: 'Daily reconciliation time', sub: 'Minutes per day, before and after 3-way validation', cats: ['Before (2.5 h)', 'After (<30 min)'], series: [{ name: 'Time', vals: [150, 30] }], colors: ['--chart-2', '--chart-1'], dec: 0, unit: ' min', max: 160 },
      { type: 'col', title: '24-hour CMMS input compliance', sub: 'Actual against target (%)', cats: ['Logbook entries', 'Work orders'], series: [{ name: 'Actual', vals: [100, 98.83], color: '--chart-1' }, { name: 'Target', vals: [95, 97.66], color: '--chart-2' }], dec: 2, unit: '%', min: 90, max: 101 }
    ],
    terms: ['CMMS (eMRO)', 'WO', 'AFML']
  },
  {
    id: 'workforce', cats: ['planning'], cat: 'Workforce & capacity',
    tag: 'Workforce planning · PT Batam Aero Technic', logo: 'logo-bat.png',
    t: '18% workforce buffer and capacity model',
    ins: 'Totals hide risk: network headcount alone missed 17 stations that flip to shortage under an 18% buffer.',
    thumb: 'stations',
    k: [['17', 'Hidden-shortage stations exposed by the buffer'], ['9 → 26', 'Shortage stations out of 104'], ['1,171', 'Personnel analysed'], ['142.6%', 'Man-hours vs capacity, Sep 2026 (15,402 MH)']],
    flow: [['Collect', 'Headcount by station'], ['Model', '18% buffer'], ['Classify', 'Short, balanced, surplus'], ['Compare', 'Output vs capacity'], ['Report', 'Redeployment list']],
    p: 'Comparing headcount with required manpower, without any buffer, hid stations that would fall short when leave, training or peaks hit.',
    a: 'Built an 18% workforce buffer model for 1,171 personnel across 104 stations in classes A–E, with an executive summary and class-composition view. Monitored output against a 360 man-hour/day capacity baseline and analysed bi-weekly labour utilisation across 55 stations.',
    i: 'Exposed 17 stations that turn from surplus or balanced to shortage once the buffer applies (9 → 26 short). Sep 2026 output: 15,402 man-hours (142.6%) and 8,266 work orders closed (135.1%); bi-weekly 50,012 MH against 38,274 capacity (130.7%), peak 3,524 MH in one week.',
    insight: [['Totals hide risk.', 'A network that looks balanced on headcount can still leave single stations short once leave, training and peaks are allowed for.'], ['Plan to the buffer, not the average.', 'Running consistently above 130% of capacity is a signal to rebalance people, not a result to celebrate.']],
    parts: [],
    tools: [['XL', 'Excel'], ['GS', 'Google Sheets'], ['AS', 'Apps Script'], 'Capacity planning'],
    charts: [
      { type: 'col', title: '104 stations after the 18% buffer', sub: '1,171 personnel; number of stations in each status', cats: ['Short before buffer', 'Hidden shortage', 'Balanced', 'Surplus'], series: [{ name: 'Stations', vals: [9, 17, 45, 33] }], colors: ['--chart-1', '--chart-3', '--chart-4', '--chart-5'], dec: 0, unit: ' stations', max: 50 },
      { type: 'col', title: 'Output against the capacity baseline', sub: '100% = plan', cats: ['Man-hours, Sep 2026', 'Work orders, Sep 2026', 'Bi-weekly MH, 55 stations'], series: [{ name: 'Achievement', vals: [142.6, 135.1, 130.7] }], colors: ['--chart-1', '--chart-1', '--chart-1'], dec: 1, unit: '%', max: 160, ref: { v: 100, l: 'Plan' } }
    ],
    terms: ['MH', 'WO']
  },
  {
    id: 'ptdi', cats: ['design'], cat: 'Systems engineering',
    tag: 'Internship · PT Dirgantara Indonesia (Persero) · Dec 2023 – Feb 2024', logo: 'logo-ptdi.png',
    t: 'Fuel-tank concept design and evaluation',
    ins: 'Access is designed in: a screw-jointed end cap and sealed hatches let the welded tank be opened for service.',
    img: 'tank_exploded.jpg', contain: true, cap: 'Tank concept: welded Al 6061 shell, screw-jointed cap, service hatches',
    k: [['7 parts', 'Tank concept, all Al 6061'], ['600 × Ø296', 'Length and outer diameter, mm'], ['5 criteria', 'Material scoring: strength, manufacturability, weight, durability, cost']],
    flow: [['Define', 'Interfaces'], ['Select', 'Materials'], ['Model', 'CATIA / Inventor'], ['Analyse', 'CFD fuel flow'], ['Review', 'Design reviews']],
    p: 'A concept-phase propulsion fuel system needed material, joining and interface decisions before it could move toward build.',
    a: 'Designed a 7-part Al 6061 tank concept (600 mm long, Ø296 mm) with friction rotary welded shell joints, a screw-jointed end cap, refuelling and sealed cover hatches. Scored candidate materials, documented in CATIA, applied CFD to fuel flow and joined design reviews on manufacturing, propulsion and system performance, referencing ISO and ASME standards.',
    i: 'Delivered the internship report, flagged pre-manufacturing readiness issues and worked with an electrical engineering intern to integrate a real-time fuel-system monitoring sensor. Program details stay at concept level.',
    insight: [['Design access in.', 'A welded shell is strong and leak-tight, but a screw-jointed cap and sealed hatches are what make it serviceable.'], ['Score, don’t guess.', 'Weighting strength, manufacturability, weight, durability and cost made the material choice explainable in review.']],
    parts: ['Al 6061 shell sections', 'Screw-jointed end cap', 'Refuelling hatch', 'Sealed cover hatch', 'Fuel-monitoring sensor'],
    tools: [['CA', 'CATIA'], ['IV', 'Autodesk Inventor'], 'CFD', 'ISO / ASME', 'Material selection'],
    gallery: [['tank_assy.jpg', 'Assembly and parts list'], ['tank_exploded.jpg', 'Exploded view with joining methods'], ['tank_dims.jpg', 'Overall dimensions'], ['n219.jpg', 'PT Dirgantara Indonesia · N219 simulator'], ['ptdi-letter.jpg', 'Internship completion letter']],
    terms: []
  },
  {
    id: 'thesis', cats: ['design'], cat: 'Materials testing',
    tag: 'Undergraduate thesis · Universitas Brawijaya', logo: 'logo-ub.png',
    t: 'Rotary friction welding of aluminium 6061',
    ins: 'Geometry is a cheap lever: only the chamfer changed, at the same speed and pressures, yet hardness rose 11%.',
    img: 'thesis-rig.jpg', contain: true, cap: 'Hydraulically loaded lathe rig for rotary friction welding',
    k: [['+11%', 'Joint hardness, 90.5 vs 81.2 HV'], ['~27%', 'Finer grain, ASTM E112'], ['1,600 rpm', '50 / 550 bar friction / upset pressure'], ['3', 'Joint geometries: 45°, 70°, non-chamfered']],
    flow: [['Machine', 'CNC specimens'], ['Weld', '1,600 rpm'], ['Measure', 'Thermocouple + IR'], ['Test', 'Micro-Vickers, E112'], ['Compare', 'Against baseline']],
    p: 'Friction-welded aluminium joints lose hardness in the heat-affected zone, and the effect of the stationary-side joint geometry was unclear.',
    a: 'Developed and ran the full test procedure: CNC specimen machining, friction welding at 1,600 rpm with 50 bar friction and 550 bar upset pressure, post-weld preparation and testing of 45°, 70° and non-chamfered joints. Measured heat by thermocouple and infrared thermography, hardness by micro-Vickers and grain size by ASTM E112.',
    i: 'The chamfered joint ran cooler, with finer grain and 11% higher hardness (90.5 vs 81.2 HV) than the non-chamfered baseline.',
    insight: [['Geometry is a cheap lever.', 'Only the chamfer changed, at the same speed and pressures, yet hardness rose 11%.'], ['Measure heat two ways.', 'Thermocouples give exact point values; the infrared camera shows how heat spreads across the joint.']],
    parts: ['Al 6061 specimens', 'Hydraulically loaded lathe rig'],
    tools: ['Micro-Vickers', 'ASTM E112', 'Thermocouple', 'IR thermography', 'CNC machining'],
    charts: [{ type: 'col', title: 'Micro-Vickers hardness of the joint', sub: 'HV, non-chamfered baseline vs best chamfer', cats: ['Non-chamfered', 'Best chamfer'], series: [{ name: 'Hardness', vals: [81.2, 90.5] }], colors: ['--chart-2', '--chart-1'], dec: 1, unit: ' HV', max: 100 }],
    gallery: [['thesis-rig.jpg', 'Friction-welding rig'], ['thesis-temp.jpg', 'Measured weld temperature by joint geometry'], ['thesis-vickers.jpg', 'Micro-Vickers hardness tester'], ['thesis-macro.jpg', 'Macro sections of welded joints'], ['thesis-team.jpg', 'Comprehensive exam with research partners']],
    terms: ['HV']
  },
  {
    id: 'casting', cats: ['design'], cat: 'Casting simulation',
    tag: 'Project · Universitas Brawijaya · Jul – Nov 2023', logo: 'logo-ub.png',
    t: 'Universal-joint yoke sand-casting simulation',
    ins: 'Simulate before you pour: predicted defects matched the real casting, so mould changes can be tested virtually first.',
    img: 'cast-sim.jpg', contain: true, cap: 'Predicted defect location, Altair Inspire Cast',
    k: [['4', 'Defect types traced to cause'], ['3', 'Physics simulated: flow, heat, solidification']],
    flow: [['Model', 'Yoke & mould'], ['Simulate', 'Flow & heat'], ['Predict', 'Defect sites'], ['Compare', 'Real casting'], ['Adjust', 'Parameters']],
    p: 'Sand-cast power-transmission yokes showed internal defects that weaken the part.',
    a: 'Modelled the yoke and its sand mould, then simulated fluid flow, thermal behaviour and solidification in Altair Inspire Cast and compared predicted defects with the actual casting.',
    i: 'Identified the causes of microporosity, shrinkage, gas entrainment and sand inclusion, and the casting-parameter changes that reduce them.',
    insight: [['Simulate before you pour.', 'Predicted defects matched the real casting, so mould and parameter changes can be tried virtually before metal is poured.']],
    parts: ['Universal-joint yoke', 'Sand mould'],
    tools: [['AL', 'Altair Inspire Cast'], ['SW', 'SolidWorks'], 'Solidification analysis'],
    gallery: [['cast-mold.jpg', 'Mould design'], ['cast-sim.jpg', 'Simulation prediction'], ['cast-defect.jpg', 'Actual defect matched']],
    terms: []
  },
  {
    id: 'cnc', cats: ['design'], cat: 'CNC manufacturing',
    tag: 'Lab Otomasi Manufaktur · Universitas Brawijaya', logo: 'logo-ub.png',
    t: 'CNC turning: from drawing to G-code',
    ins: 'Separate rough from finish: a finishing offset keeps final dimensions independent of roughing accuracy.',
    img: 'cnc-3.jpg', contain: true, cap: 'Every roughing pass laid out before coding',
    k: [['95', 'NC blocks, hand-coded'], ['6 sheets', 'Drawing pack at 2:1'], ['G84 · G86', 'Turning and grooving cycles']],
    flow: [['Draw', '2:1 drawing pack'], ['Plan', 'Roughing passes'], ['Code', 'G84, G02/G03, G86'], ['Check', 'Block by block'], ['Submit', 'Lab assessment']],
    p: 'Turn a stepped shaft with radiused shoulders and a groove on a TU CNC-2A lathe from a hand-written program.',
    a: 'Drew the part, planned roughing passes, a finishing offset and grooving, then wrote the program with G84 turning cycles, G02/G03 arcs, G86 grooving and a tool change.',
    i: 'Submitted the program and drawing pack for lab assessment, with a plain-language description beside every block.',
    insight: [['Separate rough from finish.', 'A finishing offset keeps final dimensions independent of how accurate the roughing passes were.']],
    parts: ['Stepped shaft with radiused shoulders and groove'],
    tools: [['NC', 'TU CNC-2A'], 'G84 turning cycle', 'G02 / G03 arcs', 'G86 grooving', 'Technical drawing'],
    gallery: [['cnc-1.jpg', '3D view of the part'], ['cnc-2.jpg', '2D view with dimensions'], ['cnc-3.jpg', 'Roughing passes laid out before coding']],
    terms: []
  },
  {
    id: 'iot', cats: ['design'], cat: 'IoT innovation',
    tag: 'Project · Universitas Brawijaya · Aug – Dec 2023', logo: 'logo-ub.png',
    t: 'IoT automatic rice-grain dryer',
    ins: 'Close the loop: a sensor, controller and heater loop replaces judging dryness by eye.',
    img: 'dryer.jpg', pos: 'center 40%', cap: 'Team of 4 with the working prototype',
    k: [['2nd Best Paper', 'Innovation, 3rd IYCEI 2023 (international)'], ['Patent', 'Related IoT smart-agrotech patent approved'], ['SDG 2', 'Supports UN Sustainable Development Goal 2']],
    flow: [['Sense', 'Moisture & heat'], ['Control', 'Closed loop'], ['Heat', 'Airflow'], ['Measure', 'Moisture drop'], ['Evaluate', 'Efficiency']],
    p: 'Manual sun-drying gives uneven moisture and lower grain quality.',
    a: 'Designed and tested a closed-loop IoT thermal drying system in a team of four, applying heat-transfer and airflow principles.',
    i: 'Evaluated moisture content, heat-flow distribution and efficiency ratio; the paper won 2nd Best Paper of Innovation at the 3rd International Youth Conference on Engineering Innovation.',
    insight: [['Close the loop.', 'A sensor, controller and heater loop replaces judging dryness by eye and gives even moisture across the batch.']],
    parts: [],
    tools: ['IoT control', 'Heat transfer', 'Airflow design'],
    gallery: [['dryer.jpg', 'Team with the working prototype'], ['cert-iycei.jpg', 'IYCEI 2023 · 2nd Best Paper of Innovation']],
    terms: []
  },
  {
    id: 'casework', cats: ['planning', 'design'], cat: 'Applied casework',
    tag: 'Training casework · Ahli K3 Umum · RCM · PPIC · SCM', logo: 'logo-bnsp.png',
    t: 'Safety, reliability, planning and inventory casework',
    ins: 'Most gaps were systems, not people: untested drills, missing records and unenforced permits recurred across the cases.',
    img: 'k3-hiradc.jpg', contain: true, cap: 'HIRADC with LOTO and machine guarding',
    k: [['4', 'Ahli K3 Umum workplace cases'], ['180 h', 'Peak weekly load vs 80 h capacity (RCCP)'], ['10,800 kg', 'Reorder point, 12.5 days of cover'], ['43 → 79.9%', 'Parts holding 80% of spares value (ABC)']],
    flow: [['Identify', 'Hazards & demand'], ['Assess', 'Risk & capacity'], ['Plan', 'Controls & stock'], ['Control', 'Permits, ROP, racks'], ['Review', 'Investigate & adjust']],
    p: 'Assessment and course cases on hazard control, emergency readiness, a rotating-machine injury, capacity, stock policy and storage, using company data supplied by the trainers.',
    a: 'Built a HIRADC with LOTO and machine guarding, emergency procedures, a 7-step permit-to-work flow and an accident investigation (Ahli K3 Umum). Built MPS and RCCP checks, a reorder point with safety stock, ABC/FSN segmentation of 300 parts, rack sizing (16 racks, 300 bins) and a SCOR diagnosis (PPIC, SCM). Completed a 30-hour RCM workshop covering ISO 55001, AIMS, Weibull and FMEA.',
    i: 'Traced the rotating-machine caught-in injury to work without LOTO on an unguarded machine and set controls for each gap. Showed peak weeks need 160–180 h against 80 h available, and that a 25% demand rise empties 15,000 kg of stock by day 11.',
    insight: [['Most gaps were systems, not people.', 'Untested drills, missing records and unenforced permits recurred across the safety cases.'], ['Check capacity before releasing a plan.', 'Peak weeks needed up to 180 h against 80 h available, which a rough-cut check catches before the schedule goes out.'], ['Store by movement.', '207 fast movers go to rack levels 2–3, slow movers to level 1 and non-moving stock to level 4.']],
    parts: [],
    tools: ['HIRADC', 'LOTO', 'Permit to Work', 'SMK3 (PP 50/2012)', 'MPS · RCCP', 'ROP · safety stock', 'ABC · FSN', 'SCOR', 'ISO 55001 · FMEA · Weibull', ['XL', 'Excel']],
    charts: [
      { type: 'col', title: 'Rough-cut capacity check (RCCP)', sub: 'Weekly load in hours against 80 h available', cats: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], series: [{ name: 'Load', vals: [80, 160, 180, 100] }], colors: ['--chart-2', '--chart-1', '--chart-1', '--chart-1'], dec: 0, unit: ' h', max: 200, ref: { v: 80, l: '80 h capacity' } },
      { type: 'bar', title: 'ABC ranking of spare-parts value', sub: 'Share of total value (%) by class; 100 spares', cats: ['A · 43 items', 'B · 25 items', 'C · 32 items'], series: [{ name: 'Value share', vals: [79.9, 14.9, 5.2] }], colors: ['--chart-1', '--chart-3', '--chart-2'], dec: 1, unit: '%', max: 100 }
    ],
    gallery: [['k3-hiradc.jpg', 'HIRADC with LOTO and machine guarding'], ['k3-permit.jpg', 'Permit-to-work form'], ['k3-investigation.jpg', 'Accident investigation report'], ['ppic-rop.jpg', 'Days of cover and reorder point'], ['scm-scor.jpg', 'SCOR diagnosis with recommended fixes'], ['scm-racks.jpg', 'Bins and racks for 300 parts'], ['scm-pallets.jpg', 'Pallet layout'], ['cert-rcm-syllabus.jpg', 'RCM workshop syllabus, 30 h']],
    terms: ['HIRADC', 'LOTO', 'RCCP', 'ROP', 'ABC / FSN']
  }
];

const PROF = [['XL', 'Excel', 90], ['GS', 'Google Sheets', 85], ['CM', 'CMMS (eMRO)', 85], ['SW', 'SolidWorks', 80], ['IV', 'Autodesk Inventor', 80], ['AC', 'AutoCAD', 75], ['CA', 'CATIA', 70], ['AL', 'Altair Inspire Cast', 70], ['NC', 'CNC G-code', 70], ['AN', 'Ansys', 65]];

/* Skill groups, synced with the CV */
const SKILLS = [
  { t: 'Maintenance & Reliability', c: ['Maintenance planning & scheduling', 'Preventive maintenance compliance', 'Backlog management', 'Breakdown & downtime tracking', 'Root cause analysis (RCA)', 'Pareto analysis', 'Reliability Centered Maintenance (RCM)', 'Remote technical support & troubleshooting'] },
  { t: 'CMMS & Data Governance', c: ['Work-order life-cycle management', 'CMMS (eMRO) data governance', 'Equipment-history accuracy', 'Data validation & reconciliation', 'KPI dashboards', 'Executive reporting'] },
  { t: 'Planning & Leadership', c: ['Man-hour & workforce capacity planning', 'Capacity planning (MPS, RCCP)', 'Spare-parts inventory control (ROP, ABC/FSN)', 'Multi-site performance benchmarking', 'Plan-vs-actual control', 'Project & tooling readiness', 'Stakeholder management', 'SOP development & audit compliance'] },
  { t: 'Safety & Engineering', c: ['Occupational safety & health', 'Hazard control (HIRADC, LOTO, permit to work)', 'Safety management system', 'Rotating machinery & vibration diagnostics', 'High-pressure hydraulics & filtration', 'Pressurized piping & seal integrity', 'Electro-mechanical & sensor diagnostics', 'Corrosion prevention & preservation', 'Materials testing & welding'] },
  { t: 'Diagnostic Methods (remote technical support)', mono: true, span: true, c: ['Insulation-resistance testing (1,000 VDC Megger)', 'Continuity & LCR impedance diagnostics', 'Pneumatic loop & pressure/leak testing', 'Hydraulic ΔP filter & N₂ accumulator checks'] },
  { t: 'Laboratory & Testing', mono: true, c: ['Micro-Vickers hardness testing', 'Grain size analysis (ASTM E112)', 'Thermocouple & infrared thermography', 'CNC specimen machining', 'Rotary friction welding'] },
  { t: 'Software', c: [['CM', 'CMMS (eMRO)'], ['XL', 'Excel (advanced)'], ['GS', 'Google Sheets & Workspace'], ['AS', 'Apps Script'], ['SW', 'SolidWorks'], ['CA', 'CATIA'], ['IV', 'Autodesk Inventor'], ['AC', 'AutoCAD'], ['AN', 'ANSYS'], ['AL', 'Altair Inspire Cast'], ['NC', 'CNC G-code (TU CNC-2A)'], 'CFD (fundamentals)', 'FEA'] },
  { t: 'Languages', c: ['Indonesian (native)', 'English (professional working)'] }
];

const JOURNEY = [
  { h: 'Experience', items: [
    ['Mar 2026 – Present', 'Management Trainee – Operations Engineer', 'PT Batam Aero Technic (Lion Air Group), Tangerang', 'Maintenance performance planning, CMMS governance and remote technical support for a 400+ aircraft fleet across 64 stations in 3 countries.'],
    ['Dec 2023 – Feb 2024', 'Mechanical Engineering Intern – Systems Engineering', 'PT Dirgantara Indonesia (Persero), Bandung', 'Fuel-system concept evaluation: materials, interfaces, CFD and design reviews.']] },
  { h: 'Education', items: [
    ['Aug 2021 – Jan 2026', 'B.Eng., Mechanical Engineering', 'Universitas Brawijaya, Malang (Accreditation: Unggul)', 'Thesis: stationary-side chamfer angle and hardness in rotary friction-welded Al 6061.']] },
  { h: 'Certifications & Training', items: [
    ['Feb 2026', 'Ahli K3 Umum – General OSH Expert', 'BNSP · valid to Feb 2029', 'JSA, permit to work, inspection & audit, accident investigation, emergency response.'],
    ['May 2026', 'Safety Management System, Human Factors, RCM for Airworthiness, CMMS (eMRO)', 'Lion Group', 'Plus fire safety, dangerous-goods awareness, material handling and warehouse management.'],
    ['Apr – Jun 2026', 'PPIC (7.5 h) · Supply Chain Mgmt (10 h) · Excel Bootcamp', 'Skill Engineer · Engineering Academy · Karirnex', ''],
    ['Dec 2024', 'Maintenance Management System, 5 h', 'Starting Point Training & Consulting', ''],
    ['Jun 2024', 'Reliability Centered Maintenance Workshop, 30 h', 'Pertamina Hulu Energi × BKK FT UB', 'ISO 55001, asset integrity, Weibull, FMEA and RCM case studies.']] },
  { h: 'Organisation & Leadership', items: [
    ['Jan – Jun 2023', 'Chairman', 'UKM Perisai Diri, Universitas Brawijaya', 'Led a 105-member martial-arts organisation.'],
    ['Jul – Aug 2023', 'Village Team Leader', 'MMD 1000 Desa (KKN), Kab. Malang', 'Education, environment and tourism programs; bio-pore workshop.'],
    ['Jun 2024', 'Organizing Committee', 'RCM Workshop, Pertamina Hulu Energi × BKK FT UB', ''],
    ['Sep 2022 – Jun 2023', 'Moderator', 'Kreativitas Mesin Brawijaya 2022–2023 & HMM FT-UB', ''],
    ['2022 – 2023', 'Staff & Mentor', 'Society of Renewable Energy UB', '']] }
];

const CAD = [
  { t: 'Portable Saw', tool: 'IV', sw: 'Autodesk Inventor', meta: 'Engineering drawing · May 2022', d: '15-part assembly with exploded view, section A-A and a 5-sheet A3 drawing set.', img: 'cad-saw-exploded.jpg', g: [['cad-saw-exploded.jpg', 'Exploded assembly with balloons and parts list'], ['cad-saw-iso.jpg', 'Isometric views of the 3D model']] },
  { t: 'Refrigerator Valve', tool: 'SW', sw: 'SolidWorks', meta: 'SolidWorks training · Nov 2024', d: '5-part brass and stainless valve: body, spindle, seat, gland nut and cap, with section C-C.', img: 'cad-valve.jpg', g: [['cad-valve.jpg', 'Assembled valve, 3D model'], ['cad-valve-bom.jpg', 'Exploded view and bill of materials']] },
  { t: 'Pipe Vice', tool: 'SW', sw: 'SolidWorks', meta: 'SolidWorks training · Nov 2024', d: '12-item steel assembly with spindle screw, jaws and pins, plus an assembly animation.', img: 'cad-vice.jpg', g: [['cad-vice.mp4', 'Assembly animation'], ['cad-vice.jpg', 'Assembled pipe vice'], ['cad-vice-bom.jpg', 'Exploded view and bill of materials']] },
  { t: 'Propeller', tool: 'IV', sw: 'Autodesk Inventor', meta: 'Inventor practice · Apr 2023', d: 'Propeller part model with a 2D drawing and rendered views.', img: 'cad-propeller.jpg', g: [['cad-propeller.jpg', 'Rendered propeller model']] },
  { t: 'E-bike Triple Clamp', tool: 'IV', sw: 'Autodesk Inventor 2024', meta: 'Nov 2024', d: 'Steering triple clamp plate with lightening cut-outs, 200 × 97 × 15 mm, exported as STEP.', img: 'cad-clamp.jpg', g: [['cad-clamp.jpg', 'Triple clamp plate, rendered from the STEP file']] },
  { t: 'Fuel Tank Concept', tool: 'CA', sw: 'CATIA · Inventor', meta: 'Internship · 2024', d: '7-part Al 6061 tank, 600 mm long, welded shell with screw-jointed cap and service hatches.', img: 'tank_assy.jpg', g: [['tank_assy.jpg', 'Assembly and parts list'], ['tank_exploded.jpg', 'Exploded view with joining methods'], ['tank_dims.jpg', 'Overall dimensions']] },
  { t: 'CNC Turned Shaft', tool: 'NC', sw: 'TU CNC-2A', meta: 'Lab Otomasi Manufaktur', d: 'Stepped shaft with radiused shoulders and a groove, drawn at 2:1 and programmed in 95 NC blocks.', img: 'cnc-1.jpg', g: [['cnc-1.jpg', '3D view of the part'], ['cnc-2.jpg', '2D view with dimensions'], ['cnc-3.jpg', 'Roughing passes laid out before coding']] },
  { t: 'Yoke Sand Mould', tool: 'SW', sw: 'SolidWorks', meta: 'Casting project · 2023', d: 'Sand mould design for the universal-joint yoke used in the casting simulation.', img: 'cast-mold.jpg', g: [['cast-mold.jpg', 'Mould design'], ['cast-sim.jpg', 'Simulation prediction'], ['cast-defect.jpg', 'Actual defect matched']] }
];
const CAD_FILTERS = [['all', 'All models'], ['IV', 'Autodesk Inventor'], ['SW', 'SolidWorks'], ['CA', 'CATIA'], ['NC', 'CNC']];

const DOCS = [
  ['Certification', 'cert-bnsp.jpg', 'Ahli K3 Umum · BNSP · Feb 2026'],
  ['Certification', 'cert-exagama.jpg', 'Basic Safety training · Exagama Merapi Sertifikasi · Jan 2026'],
  ['Certification', 'cert-rcm.jpg', 'RCM Workshop participant · Jun 2024'],
  ['Certification', 'cert-rcm-syllabus.jpg', 'RCM Workshop syllabus · 30 h'],
  ['Certification', 'cert-mms.jpg', 'Maintenance Management System · Dec 2024'],
  ['Certification', 'cert-ppic.jpg', 'PPIC for Manufacturing · May 2026'],
  ['Certification', 'cert-scm.jpg', 'Supply Chain Management · Apr 2026'],
  ['Certification', 'cert-excel.jpg', 'Excel Bootcamp Intermediate · Jun 2026'],
  ['Certification', 'k3-investigation.jpg', 'K3 assessment · accident investigation report'],
  ['Certification', 'k3-permit.jpg', 'K3 assessment · permit-to-work form'],
  ['Certification', 'scm-racks.jpg', 'SCM casework · bins and racks for 300 parts'],
  ['Certification', 'ppic-rop.jpg', 'PPIC casework · days of cover and reorder point'],
  ['Experience', 'cockpit.jpg', 'Batam Aero Technic · on the flight deck'],
  ['Experience', 'plane.jpg', 'Batam Aero Technic · on the apron'],
  ['Experience', 'lion.jpg', 'Lion Group Management Trainee · 2026'],
  ['Experience', 'n219.jpg', 'PT Dirgantara Indonesia · N219 simulator'],
  ['Experience', 'ptdi-letter.jpg', 'PTDI internship completion letter'],
  ['Education', 'cnc-1.jpg', 'CNC turning · 3D view of the part'],
  ['Education', 'thesis-team.jpg', 'Comprehensive exam with research partners'],
  ['Education', 'thesis-vickers.jpg', 'Micro-Vickers hardness tester'],
  ['Education', 'thesis-macro.jpg', 'Macro sections of welded joints'],
  ['Education', 'cert-iycei.jpg', 'IYCEI 2023 · 2nd Best Paper of Innovation'],
  ['Organisation', 'cert-rcm-committee.jpg', 'RCM Workshop organizing committee'],
  ['Organisation', 'rcm-2.jpg', 'RCM Workshop 2024'],
  ['Organisation', 'mmd-group.jpg', 'MMD 1000 Desa 2023 · village team'],
  ['Organisation', 'mmd-speak.jpg', 'MMD 2023 · speaking at a village program session'],
  ['Organisation', 'sre.jpg', 'Society of Renewable Energy UB'],
  ['Organisation', 'moderator.jpg', 'Moderator · Kreativitas Mesin Brawijaya 2022–2023'],
  ['Organisation', 'rcm-1.jpg', 'RCM Workshop venue']
];
const PHOTO_DOCS = new Set(['cockpit.jpg', 'plane.jpg', 'lion.jpg', 'n219.jpg', 'thesis-team.jpg', 'rcm-2.jpg', 'mmd-group.jpg', 'mmd-speak.jpg', 'sre.jpg', 'moderator.jpg', 'rcm-1.jpg']);

/* ---------------------------------------------------------
   2. HELPERS
   --------------------------------------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const fmt = (n, d = 0) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const chip = x => Array.isArray(x) ? `<span class="chip">${icon(x[0])}${x[1]}</span>` : `<span class="chip">${x}</span>`;

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* Small schematic thumbnails for cases without a photo */
function thumb(key) {
  const ink = 'style="fill:var(--ink-2)"';
  const box = (x, y, w, h, label, fill = 'var(--card)') =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill};stroke:var(--line-2);stroke-width:1.5"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" ${ink}>${label}</text>`;
  const pipe = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" style="stroke:var(--brand);stroke-width:3;fill:none" marker-end="url(#ah)"/>`;
  const defs = '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--brand)"/></marker></defs>';
  let body = '';
  if (key === 'fluid') {
    body = box(16, 30, 74, 40, 'EDP/EMDP') + pipe(92, 50, 118, 50) + box(120, 30, 70, 40, 'ΔP filter') + pipe(192, 50, 218, 50) + box(218, 30, 94, 40, 'Pressure mod.') +
      pipe(265, 72, 265, 104) + box(218, 106, 94, 40, 'N₂ accum.') + pipe(216, 126, 150, 126) + box(60, 106, 88, 40, 'Leak test', 'var(--amber-soft)') +
      `<text x="16" y="178" style="fill:var(--muted)">Pump → filter → module → accumulator → test</text>`;
  } else if (key === 'electro') {
    body = box(16, 34, 70, 40, 'Sensor') + `<path d="M88 54 C120 20 150 90 182 54" style="stroke:var(--brand);stroke-width:3;fill:none;stroke-dasharray:6 5"/>` + box(184, 34, 70, 40, 'Connector') +
      `<circle cx="160" cy="132" r="34" style="fill:var(--card);stroke:var(--line-2);stroke-width:1.5"/><text x="160" y="128" text-anchor="middle" style="fill:var(--brand);font-weight:700">10.0 MΩ</text><text x="160" y="144" text-anchor="middle" ${ink}>1,000 VDC</text>` +
      `<path d="M126 132 L60 132 L60 76" style="stroke:var(--muted);stroke-width:1.5;fill:none"/><path d="M194 132 L250 132 L250 76" style="stroke:var(--muted);stroke-width:1.5;fill:none"/>` +
      `<text x="16" y="186" style="fill:var(--muted)">Measure the wiring before swapping parts</text>`;
  } else if (key === 'backlog') {
    const bars = [[92.1, 'Before'], [108.0, 'After']];
    body = bars.map(([v, l], i) => {
      const h = v * 1.1, x = 40 + i * 90;
      return `<rect x="${x}" y="${160 - h}" width="56" height="${h}" rx="6" style="fill:${i ? 'var(--brand)' : 'var(--chart-2)'}"/><text x="${x + 28}" y="${152 - h}" text-anchor="middle" style="fill:var(--ink);font-weight:700">${v.toFixed(1)}%</text><text x="${x + 28}" y="178" text-anchor="middle" ${ink}>${l}</text>`;
    }).join('') +
      [141, 59, 40, 17, 16].map((v, i) => `<rect x="222" y="${40 + i * 24}" width="${v * 0.6}" height="16" rx="4" style="fill:${i === 2 ? 'var(--chart-4)' : 'var(--brand)'};opacity:${1 - i * 0.12}"/>`).join('') +
      `<text x="222" y="30" style="fill:var(--muted)">Constraints</text>`;
  } else if (key === 'stations') {
    const v = [[9, 'Short', 'var(--chart-1)'], [17, 'Hidden', 'var(--chart-3)'], [45, 'Balanced', 'var(--chart-4)'], [33, 'Surplus', 'var(--chart-5)']];
    body = v.map(([n, l, c], i) => {
      const h = n * 2.4, x = 30 + i * 70;
      return `<rect x="${x}" y="${160 - h}" width="46" height="${h}" rx="6" style="fill:${c}"/><text x="${x + 23}" y="${152 - h}" text-anchor="middle" style="fill:var(--ink);font-weight:700">${n}</text><text x="${x + 23}" y="178" text-anchor="middle" ${ink}>${l}</text>`;
    }).join('') + `<text x="290" y="24" text-anchor="end" style="fill:var(--muted)">104 stations</text>`;
  }
  return `<svg class="thumb" viewBox="0 0 320 200" role="img" aria-hidden="true">${defs}<rect width="320" height="200" style="fill:var(--card-2)"/>${body}</svg>`;
}

/* Interactive SVG bar chart (vertical "col" or horizontal "bar") */
function chartSVG(c) {
  const series = c.series;
  const dec = c.dec || 0;
  const unit = c.unit || '';
  const min = c.min || 0;
  const max = c.max || Math.max(...series.flatMap(s => s.vals)) * 1.15;
  const colorOf = (si, i) => `var(${series[si].color || (c.colors && c.colors[i]) || '--chart-1'})`;
  let svg = '';
  if (c.type === 'bar') {
    const W = 600, padL = 196, padR = 70, rowH = 34, padT = 8;
    const H = padT + c.cats.length * rowH + 22;
    const pw = W - padL - padR;
    const x = v => padL + ((Math.max(v, min) - min) / (max - min)) * pw;
    for (let g = 0; g <= 4; g++) {
      const gv = min + (max - min) * g / 4, gx = x(gv);
      svg += `<line class="grid" x1="${gx}" y1="${padT}" x2="${gx}" y2="${H - 22}"/><text x="${gx}" y="${H - 6}" text-anchor="middle">${fmt(gv, 0)}</text>`;
    }
    c.cats.forEach((cat, i) => {
      const y = padT + i * rowH + 6, v = series[0].vals[i], w = Math.max(2, x(v) - padL);
      svg += `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" style="fill:var(--ink-2);font-weight:600">${cat}</text>`;
      svg += `<rect class="b" x="${padL}" y="${y}" width="${w}" height="22" rx="5" style="fill:${colorOf(0, i)};transition-delay:${i * 60}ms" tabindex="0" data-tip="${cat}|${fmt(v, dec)}${unit}" aria-label="${cat}: ${fmt(v, dec)}${unit}"/>`;
      svg += `<text class="val vl" x="${padL + w + 8}" y="${y + 15}">${fmt(v, dec)}</text>`;
    });
    if (c.ref) {
      const rx = x(c.ref.v);
      svg += `<line class="ref" x1="${rx}" y1="${padT - 2}" x2="${rx}" y2="${H - 22}"/><text class="ref-l" x="${rx + 6}" y="${padT + 10}">${c.ref.l}</text>`;
    }
    svg = `<svg class="row" viewBox="0 0 ${W} ${H}" role="group" aria-label="${c.title}">${svg}</svg>`;
  } else {
    const W = 600, H = 270, padL = 48, padR = 16, padT = 24, padB = 48;
    const pw = W - padL - padR, ph = H - padT - padB;
    const y = v => padT + ph - ((Math.max(v, min) - min) / (max - min)) * ph;
    for (let g = 0; g <= 4; g++) {
      const gv = min + (max - min) * g / 4, gy = y(gv);
      svg += `<line class="grid" x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}"/><text x="${padL - 8}" y="${gy + 4}" text-anchor="end">${fmt(gv, gv % 1 ? 1 : 0)}</text>`;
    }
    const n = c.cats.length, gw = pw / n, ns = series.length;
    const bw = Math.min(84, (gw * 0.62) / ns);
    c.cats.forEach((cat, i) => {
      const gx = padL + gw * i + (gw - bw * ns - (ns - 1) * 6) / 2;
      series.forEach((s, si) => {
        const v = s.vals[i], bx = gx + si * (bw + 6), by = y(v), bh = Math.max(2, padT + ph - by);
        const label = ns > 1 ? `${cat} · ${s.name}` : cat;
        svg += `<rect class="b" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" style="fill:${colorOf(si, i)};transition-delay:${(i * ns + si) * 70}ms" tabindex="0" data-tip="${label}|${fmt(v, dec)}${unit}" aria-label="${label}: ${fmt(v, dec)}${unit}"/>`;
        svg += `<text class="val vl" x="${bx + bw / 2}" y="${by - 7}" text-anchor="middle">${fmt(v, dec)}</text>`;
      });
      svg += `<text x="${padL + gw * i + gw / 2}" y="${H - padB + 20}" text-anchor="middle" style="fill:var(--ink-2);font-weight:600">${cat}</text>`;
    });
    if (c.ref) {
      const ry = y(c.ref.v);
      svg += `<line class="ref" x1="${padL}" y1="${ry}" x2="${W - padR}" y2="${ry}"/><text class="ref-l" x="${W - padR}" y="${ry - 6}" text-anchor="end">${c.ref.l}</text>`;
    }
    svg = `<svg class="col" viewBox="0 0 ${W} ${H}" role="group" aria-label="${c.title}">${svg}</svg>`;
  }
  let legend = '';
  if (series.length > 1) legend = series.map(s => `<span><i style="background:var(${s.color})"></i>${s.name}</span>`).join('');
  if (c.legend) legend = c.legend.map(([col, l]) => `<span><i style="background:var(${col})"></i>${l}</span>`).join('');
  return `<figure class="chart" style="margin:0"><h5>${c.title}</h5><p class="sub">${c.sub || ''}</p>${svg}${legend ? `<div class="legend">${legend}</div>` : ''}</figure>`;
}

/* ---------------------------------------------------------
   3. RENDER
   --------------------------------------------------------- */
function renderCases() {
  const grid = $('#caseGrid');
  grid.innerHTML = CASES.map((c, idx) => {
    const media = c.thumb
      ? `<div class="case-media">${thumb(c.thumb)}<span class="cat">${c.cat}</span></div>`
      : `<div class="case-media${c.contain ? ' contain' : ''}"><img src="${A + c.img}" alt="${c.cap || c.t}" loading="lazy" style="object-position:${c.pos || 'center'}"><span class="cat">${c.cat}</span></div>`;
    const kp = c.k.slice(0, 2).map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
    return `<button type="button" class="case" data-idx="${idx}" data-cats="${c.cats.join(' ')}" aria-label="Open case: ${c.t}">
      ${media}
      <div class="case-body">
        <p class="case-tag">${c.tag}</p>
        <h3>${c.t}</h3>
        <p class="ins">${c.ins}</p>
        <div class="case-kpis">${kp}</div>
        <span class="case-open">Engineering insight &amp; data ${ARROW}</span>
      </div>
    </button>`;
  }).join('');

  const counts = id => id === 'all' ? CASES.length : CASES.filter(c => c.cats.includes(id)).length;
  $('#caseFilters').innerHTML = CATS.map((f, i) =>
    `<button type="button" class="filter" data-f="${f.id}" aria-pressed="${i === 0}">${f.label}<span class="count">${counts(f.id)}</span></button>`).join('');
}

function renderGlossary() {
  $('#glossGrid').innerHTML = Object.entries(TERMS).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
}

function renderSkills() {
  $('#profList').innerHTML = PROF.map(([k, n, p]) =>
    `<div class="prof-row"><span class="ic">${icon(k)}</span><b>${n}</b><span class="pct">${p}%</span><div class="meter" role="img" aria-label="${n}: ${p}%"><i data-w="${p}"></i></div></div>`).join('');
  $('#skillGrid').innerHTML = SKILLS.map(g =>
    `<article class="sk reveal${g.span ? ' span2' : ''}${g.mono ? ' mono-chips' : ''}"><h3><i></i>${g.t}</h3><div class="chips">${g.c.map(chip).join('')}</div></article>`).join('');
}

function renderJourney() {
  $('#journeyGrid').innerHTML = JOURNEY.map(col =>
    `<div class="j-col reveal"><h3>${col.h}</h3><ol class="j-list">${col.items.map(([w, t, p, d]) =>
      `<li><span class="j-when">${w}</span><span class="j-what">${t}</span><span class="j-where">${p}</span>${d ? `<span class="j-desc">${d}</span>` : ''}</li>`).join('')}</ol></div>`).join('');
}

function renderCAD() {
  $('#cadFilters').innerHTML = CAD_FILTERS.map(([k, l], i) => {
    const n = k === 'all' ? CAD.length : CAD.filter(c => c.tool === k).length;
    return `<button type="button" class="filter" data-f="${k}" aria-pressed="${i === 0}">${l}<span class="count">${n}</span></button>`;
  }).join('');
  $('#cadGrid').innerHTML = CAD.map((c, i) =>
    `<button type="button" class="gal" data-i="${i}" data-tool="${c.tool}" aria-label="Open ${c.t} drawings">
      <span class="ph"><img src="${A + c.img}" alt="${c.t}" loading="lazy"><span class="sw">${icon(c.tool)}</span><span class="n">${c.g.length} ${c.g.length > 1 ? 'views' : 'view'}</span></span>
      <span class="tx"><b>${c.t}</b><span>${c.d}</span><span class="mono">${c.sw} · ${c.meta}</span></span>
    </button>`).join('');
}

function renderDocs() {
  const cats = ['All', ...new Set(DOCS.map(d => d[0]))];
  $('#docFilters').innerHTML = cats.map((c, i) => {
    const n = c === 'All' ? DOCS.length : DOCS.filter(d => d[0] === c).length;
    return `<button type="button" class="filter" data-f="${c}" aria-pressed="${i === 0}">${c}<span class="count">${n}</span></button>`;
  }).join('');
  $('#docGrid').innerHTML = DOCS.map(([cat, f, cap], i) =>
    `<button type="button" class="gal${PHOTO_DOCS.has(f) ? ' photo' : ''}" data-i="${i}" data-cat="${cat}" aria-label="View: ${cap}">
      <span class="ph"><img src="${A + f}" alt="${cap}" loading="lazy"></span>
      <span class="tx"><b>${cap}</b><span class="mono">${cat}</span></span>
    </button>`).join('');
}

/* ---------------------------------------------------------
   4. THEME, NAV, PROGRESS
   --------------------------------------------------------- */
function initTheme() {
  const btn = $('#themeToggle');
  const meta = $('meta[name="theme-color"]');
  const sync = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.setAttribute('content', dark ? '#15110E' : '#4A3B33');
  };
  sync();
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('gw-theme', next); } catch (e) { /* storage unavailable */ }
    sync();
  });
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = e => {
      let saved = null;
      try { saved = localStorage.getItem('gw-theme'); } catch (err) { /* ignore */ }
      if (!saved) { document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light'); sync(); }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
}

function initNav() {
  const nav = $('#nav'), bar = $('#progress'), toTop = $('#toTop');
  const menu = $('#menuBtn'), links = $('#navLinks');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 8);
    bar.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    toTop.classList.toggle('show', y > 900);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const setMenu = open => {
    links.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menu.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); menu.focus(); } });
  document.addEventListener('click', e => { if (links.classList.contains('open') && !e.target.closest('#navLinks, #menuBtn')) setMenu(false); });

  // Active section highlight
  const map = new Map($$('#navLinks a').map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        map.forEach(a => a.classList.remove('active'));
        const a = map.get(en.target.id);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ---------------------------------------------------------
   5. REVEAL, COUNT-UP, METERS
   --------------------------------------------------------- */
function countUp(el) {
  const to = parseFloat(el.dataset.count);
  const from = el.dataset.from ? parseFloat(el.dataset.from) : 0;
  const dec = parseInt(el.dataset.dec || '0', 10);
  if (reduceMotion) { el.textContent = fmt(to, dec); return; }
  const dur = 1600, t0 = performance.now();
  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * e, dec);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      $$('[data-count]', el).forEach(countUp);
      $$('[data-w]', el).forEach(i => { i.style.width = i.dataset.w + '%'; });
      $$('.spark .bar', el).forEach(b => { $('i', b).style.height = (parseFloat(b.dataset.h) / 120 * 100) + '%'; });
      obs.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
}

/* ---------------------------------------------------------
   6. FILTERS (cases, CAD, docs)
   --------------------------------------------------------- */
function bindFilter(groupSel, itemSel, match) {
  const group = $(groupSel);
  group.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    $$('.filter', group).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.f;
    $$(itemSel).forEach(it => {
      const show = match(it, f);
      it.classList.toggle('hide', !show);
      if (show && !reduceMotion) { it.classList.remove('enter'); void it.offsetWidth; it.classList.add('enter'); }
    });
  });
}

/* ---------------------------------------------------------
   7. INSIGHT DRAWER
   --------------------------------------------------------- */
const drawer = { el: null, idx: -1, list: [], lastFocus: null };

function caseHTML(c) {
  const kp = c.k.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
  const steps = c.flow.map(([s, d]) => `<li>${s}<small>${d}</small></li>`).join('');
  const insight = c.insight.map(([h, t]) => `<p><b>${h}</b> ${t}</p>`).join('');
  const charts = (c.charts || []).map(chartSVG).join('');
  const seq = c.seq ? `<h3 class="d-h">Isolation sequence · select a step</h3><ol class="seq">${c.seq.map(([t, d], i) =>
    `<li><button type="button" aria-expanded="${i === 0}"><span class="n">${i + 1}</span><b>${t}</b><p>${d}</p></button></li>`).join('')}</ol>` : '';
  const parts = c.parts && c.parts.length ? `<h3 class="d-h">Parts, equipment &amp; standards</h3><div class="chips">${c.parts.map(p => `<span class="chip mono">${p}</span>`).join('')}</div>` : '';
  const tools = c.tools && c.tools.length ? `<h3 class="d-h">Methods &amp; tools</h3><div class="chips">${c.tools.map(chip).join('')}</div>` : '';
  const gallery = c.gallery ? `<h3 class="d-h">Drawings &amp; photos · select to zoom</h3><div class="d-gallery">${c.gallery.map(([f, cap], i) =>
    `<button type="button" data-g="${i}" aria-label="Zoom: ${cap}"><img src="${A + f}" alt="${cap}" loading="lazy"><span>${cap}</span></button>`).join('')}</div>` : '';
  const terms = c.terms && c.terms.length ? `<h3 class="d-h">In plain words</h3><dl class="d-terms">${c.terms.map(t => `<div><dt>${t}</dt><dd>${TERMS[t]}</dd></div>`).join('')}</dl>` : '';
  const isOps = c.logo === 'logo-bat.png' && c.cats.some(x => x !== 'planning');
  return `
    <p class="d-tag">${c.tag}</p>
    <h2 id="dTitle">${c.t}</h2>
    <div class="d-kpis">${kp}</div>
    <h3 class="d-h">Process flow</h3>
    <ol class="steps">${steps}</ol>
    <h3 class="d-h">Problem → Action → Impact</h3>
    <div class="pai"><div><b>Problem</b><p>${c.p}</p></div><div><b>Action</b><p>${c.a}</p></div><div><b>Impact</b><p>${c.i}</p></div></div>
    <h3 class="d-h">Key engineering insight</h3>
    <div class="insight"><h4>Engineering insight</h4>${insight}</div>
    ${charts ? `<h3 class="d-h">Data · hover or focus a bar</h3><div class="charts">${charts}</div>` : ''}
    ${seq}${parts}${tools}${gallery}${terms}
    ${isOps ? '<p class="d-note">Repairs were carried out by licensed field technicians; my role was remote technical support, tooling and spares coordination, and data control. No aircraft registrations or work-order numbers are shown.</p>' : ''}`;
}

function openCase(idx, fromEl) {
  const visible = $$('#caseGrid .case:not(.hide)').map(b => +b.dataset.idx);
  drawer.list = visible.length ? visible : CASES.map((_, i) => i);
  drawer.idx = idx;
  if (fromEl) drawer.lastFocus = fromEl;
  const c = CASES[idx];
  const body = $('#dBody');
  body.innerHTML = caseHTML(c);
  $('#dCrumb').textContent = `${c.cat} · ${drawer.list.indexOf(idx) + 1} of ${drawer.list.length}`;
  const el = drawer.el;
  const wasOpen = el.classList.contains('open');
  el.classList.add('open');
  el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const panel = $('.drawer-panel', el);
  panel.scrollTop = 0;
  if (!wasOpen) setTimeout(() => panel.focus(), 60);
  try { history.replaceState(null, '', '#case-' + c.id); } catch (e) { /* ignore */ }

  // Animate the process flow, then the charts
  const steps = $$('.steps li', body);
  steps.forEach((s, i) => setTimeout(() => s.classList.add('on'), reduceMotion ? 0 : 200 + i * 140));
  const svgs = $$('.chart svg', body);
  const go = () => svgs.forEach(s => s.classList.add('go'));
  if (reduceMotion) go();
  else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents, o) => ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('go'); o.unobserve(en.target); } }), { root: panel, threshold: 0.3 });
    svgs.forEach(s => io.observe(s));
  } else go();

  // Isolation sequence (accordion)
  $$('.seq button', body).forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    $$('.seq button', body).forEach(x => x.setAttribute('aria-expanded', 'false'));
    b.setAttribute('aria-expanded', String(!open));
  }));
  // Gallery → lightbox
  $$('.d-gallery button', body).forEach(b => b.addEventListener('click', () => {
    lightbox.open(c.gallery.map(([f, cap]) => ({ src: A + f, cap, sub: c.t })), +b.dataset.g, b);
  }));
}

function closeCase() {
  const el = drawer.el;
  if (!el.classList.contains('open')) return;
  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  try { history.replaceState(null, '', '#work'); } catch (e) { /* ignore */ }
  if (drawer.lastFocus) drawer.lastFocus.focus({ preventScroll: true });
}

function stepCase(dir) {
  const pos = drawer.list.indexOf(drawer.idx);
  const next = drawer.list[(pos + dir + drawer.list.length) % drawer.list.length];
  openCase(next);
}

function trapFocus(container, e) {
  const f = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), video', container).filter(x => x.offsetParent !== null || x === document.activeElement);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function initDrawer() {
  drawer.el = $('#drawer');
  $('#caseGrid').addEventListener('click', e => {
    const b = e.target.closest('.case');
    if (b) openCase(+b.dataset.idx, b);
  });
  $$('[data-close]', drawer.el).forEach(b => b.addEventListener('click', closeCase));
  $('#dPrev').addEventListener('click', () => stepCase(-1));
  $('#dNext').addEventListener('click', () => stepCase(1));
  document.addEventListener('keydown', e => {
    if (!drawer.el.classList.contains('open') || lightbox.isOpen()) return;
    if (e.key === 'Escape') closeCase();
    else if (e.key === 'Tab') trapFocus($('.drawer-panel', drawer.el), e);
    else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.closest('input, textarea')) stepCase(e.key === 'ArrowRight' ? 1 : -1);
  });
  // Deep link: #case-<id>
  const m = location.hash.match(/^#case-([\w-]+)/);
  if (m) {
    const i = CASES.findIndex(c => c.id === m[1]);
    if (i > -1) setTimeout(() => openCase(i, $(`.case[data-idx="${i}"]`)), 300);
  }
}

/* Chart tooltips (event delegation) */
function initTips() {
  const tip = $('#tip');
  const show = (r, x, y) => {
    const [label, val] = r.dataset.tip.split('|');
    tip.innerHTML = `${label} · <span class="mono">${val}</span>`;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
    tip.classList.add('show');
  };
  const hide = () => tip.classList.remove('show');
  document.addEventListener('pointermove', e => {
    const r = e.target.closest && e.target.closest('rect.b');
    if (r) show(r, e.clientX, e.clientY); else hide();
  });
  document.addEventListener('focusin', e => {
    const r = e.target.closest && e.target.closest('rect.b');
    if (r) { const b = r.getBoundingClientRect(); show(r, b.left + b.width / 2, b.top); } else hide();
  });
  document.addEventListener('scroll', hide, true);
}

/* ---------------------------------------------------------
   8. LIGHTBOX (zoom, pan, keyboard, swipe)
   --------------------------------------------------------- */
const lightbox = (() => {
  const lb = $('#lb'), stage = $('#lbStage'), media = $('#lbMedia'), cap = $('#lbCap');
  const count = $('#lbCount'), zoomLbl = $('#lbZoom');
  let items = [], i = 0, s = 1, tx = 0, ty = 0, el = null, lastFocus = null;
  const pointers = new Map();
  let pinchStart = 0, pinchScale = 1, dragStart = null, swipeX = null;

  const apply = () => {
    if (!el) return;
    el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${s})`;
    zoomLbl.textContent = Math.round(s * 100) + '%';
  };
  const clampPan = () => {
    if (!el || s <= 1) { tx = 0; ty = 0; return; }
    const r = stage.getBoundingClientRect();
    const w = el.offsetWidth * s, h = el.offsetHeight * s;
    const mx = Math.max(0, (w - r.width) / 2 + 40), my = Math.max(0, (h - r.height) / 2 + 40);
    tx = Math.max(-mx, Math.min(mx, tx));
    ty = Math.max(-my, Math.min(my, ty));
  };
  const zoomTo = (ns, cx, cy) => {
    ns = Math.max(1, Math.min(5, ns));
    if (cx !== undefined) {
      const r = stage.getBoundingClientRect();
      const ox = cx - (r.left + r.width / 2) - tx, oy = cy - (r.top + r.height / 2) - ty;
      tx -= ox * (ns / s - 1);
      ty -= oy * (ns / s - 1);
    }
    s = ns;
    clampPan();
    apply();
  };
  const show = () => {
    const it = items[i];
    s = 1; tx = 0; ty = 0;
    const isVid = /\.mp4$/i.test(it.src);
    media.innerHTML = isVid
      ? `<video src="${it.src}" controls autoplay muted loop playsinline aria-label="${it.cap}"></video>`
      : `<img src="${it.src}" alt="${it.cap}" draggable="false">`;
    el = media.firstElementChild;
    cap.innerHTML = `${it.cap}${it.sub ? `<small>${it.sub}</small>` : ''}`;
    count.textContent = `${i + 1} / ${items.length}`;
    const multi = items.length > 1;
    $('#lbPrev').hidden = !multi;
    $('#lbNext').hidden = !multi;
    ['lbIn', 'lbOut', 'lbReset'].forEach(id => { $('#' + id).disabled = isVid; });
    apply();
    // Preload neighbours
    [i + 1, i - 1].forEach(n => { const nb = items[(n + items.length) % items.length]; if (nb && !/\.mp4$/i.test(nb.src)) { const im = new Image(); im.src = nb.src; } });
  };
  const go = d => { if (items.length > 1) { i = (i + d + items.length) % items.length; show(); } };
  const open = (list, start, from) => {
    items = list; i = start || 0; lastFocus = from || document.activeElement;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    show();
    setTimeout(() => $('#lbClose').focus(), 50);
  };
  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    media.innerHTML = '';
    el = null;
    if (!drawer.el.classList.contains('open')) document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', e => { e.stopPropagation(); go(-1); });
  $('#lbNext').addEventListener('click', e => { e.stopPropagation(); go(1); });
  $('#lbIn').addEventListener('click', () => zoomTo(s * 1.4));
  $('#lbOut').addEventListener('click', () => zoomTo(s / 1.4));
  $('#lbReset').addEventListener('click', () => { s = 1; tx = 0; ty = 0; apply(); });

  stage.addEventListener('wheel', e => {
    if (!el || el.tagName === 'VIDEO') return;
    e.preventDefault();
    zoomTo(s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
  }, { passive: false });
  stage.addEventListener('dblclick', e => {
    if (!el || el.tagName === 'VIDEO' || e.target.closest('button')) return;
    if (s > 1) { s = 1; tx = 0; ty = 0; apply(); } else zoomTo(2.5, e.clientX, e.clientY);
  });
  stage.addEventListener('pointerdown', e => {
    if (!el || el.tagName === 'VIDEO' || e.target.closest('button')) return;
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
      pinchScale = s;
    } else {
      dragStart = { x: e.clientX - tx, y: e.clientY - ty };
      swipeX = e.clientX;
      stage.classList.add('dragging');
    }
  });
  stage.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart) zoomTo(pinchScale * d / pinchStart, (a.x + b.x) / 2, (a.y + b.y) / 2);
    } else if (dragStart && s > 1) {
      tx = e.clientX - dragStart.x;
      ty = e.clientY - dragStart.y;
      clampPan();
      apply();
    }
  });
  const end = e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = 0;
    if (pointers.size === 0) {
      stage.classList.remove('dragging');
      if (s === 1 && swipeX !== null && Math.abs(e.clientX - swipeX) > 60) go(e.clientX < swipeX ? 1 : -1);
      dragStart = null; swipeX = null;
    }
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  stage.addEventListener('click', e => { if (e.target === stage && s === 1) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === '+' || e.key === '=') zoomTo(s * 1.4);
    else if (e.key === '-' || e.key === '_') zoomTo(s / 1.4);
    else if (e.key === '0') { s = 1; tx = 0; ty = 0; apply(); }
    else if (e.key === 'Tab') trapFocus(lb, e);
  }, true);
  window.addEventListener('resize', () => { clampPan(); apply(); });

  return { open, close, isOpen: () => lb.classList.contains('open') };
})();

function initGalleries() {
  $('#cadGrid').addEventListener('click', e => {
    const b = e.target.closest('.gal');
    if (!b) return;
    const c = CAD[+b.dataset.i];
    lightbox.open(c.g.map(([f, cap]) => ({ src: A + f, cap, sub: `${c.t} · ${c.sw}` })), 0, b);
  });
  $('#docGrid').addEventListener('click', e => {
    const b = e.target.closest('.gal');
    if (!b) return;
    const visible = $$('#docGrid .gal:not(.hide)');
    const list = visible.map(v => { const d = DOCS[+v.dataset.i]; return { src: A + d[1], cap: d[2], sub: d[0] }; });
    lightbox.open(list, visible.indexOf(b), b);
  });
}

/* ---------------------------------------------------------
   9. CONTACT: copy + CV download feedback
   --------------------------------------------------------- */
function initContact() {
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy).textContent.trim();
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
    }
    toast(ok ? `Copied: ${text}` : 'Copy failed. Please select the text instead.');
  }));
  $$('[data-cv]').forEach(a => a.addEventListener('click', () => toast('Downloading CV (PDF)…')));
}

/* Workflow loop: light each step in turn while visible */
function initLoop() {
  const items = $$('#loopList li');
  if (!items.length || reduceMotion || !('IntersectionObserver' in window)) return;
  let k = 0, timer = null;
  const tick = () => { items.forEach((li, j) => li.classList.toggle('lit', j === k)); k = (k + 1) % items.length; };
  new IntersectionObserver(([en]) => {
    if (en.isIntersecting && !timer) { tick(); timer = setInterval(tick, 1400); }
    else if (!en.isIntersecting && timer) { clearInterval(timer); timer = null; items.forEach(li => li.classList.remove('lit')); }
  }, { threshold: 0.4 }).observe($('#loopList'));
}

/* ---------------------------------------------------------
   10. BOOT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCases();
  renderGlossary();
  renderSkills();
  renderJourney();
  renderCAD();
  renderDocs();

  initTheme();
  initNav();
  initReveal();
  initTips();
  initDrawer();
  initGalleries();
  initContact();
  initLoop();

  bindFilter('#caseFilters', '#caseGrid .case', (it, f) => f === 'all' || it.dataset.cats.split(' ').includes(f));
  bindFilter('#cadFilters', '#cadGrid .gal', (it, f) => f === 'all' || it.dataset.tool === f);
  bindFilter('#docFilters', '#docGrid .gal', (it, f) => f === 'All' || it.dataset.cat === f);
});
