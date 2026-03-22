/**
 * Peptide Reconstitution Calculator
 * ------------------------------------
 * Calculates reconstitution volumes, dose units, and stability windows
 * for common research peptides.
 *
 * Usage (Node.js):  node peptide-calculator.js
 * Usage (Browser):  include in <script> tag, call calculate() or use the HTML UI
 *
 * More resources: https://copenhagenchems.com/how-to-reconstitute-store-peptides/
 */

/**
 * Core calculation function
 * @param {Object} params
 * @param {number} params.vialMg      - Vial content in milligrams (e.g. 5)
 * @param {number} params.waterMl     - Bacteriostatic water added in ml (e.g. 2)
 * @param {number} params.doseMcg     - Desired dose in micrograms (e.g. 250)
 * @returns {Object} Calculation results
 */
function calculate({ vialMg, waterMl, doseMcg }) {
  const vialMcg = vialMg * 1000; // convert mg → mcg
  const concentrationMcgPerMl = vialMcg / waterMl;
  const mlPerDose = doseMcg / concentrationMcgPerMl;
  // Insulin syringe: 1ml = 100 units
  const unitsPerDose = Math.round(mlPerDose * 100);
  const dosesPerVial = Math.floor(vialMcg / doseMcg);
  const daysSupplyDaily = dosesPerVial; // if 1 dose/day
  const daysSupplyBid = Math.floor(dosesPerVial / 2); // if 2 doses/day

  return {
    vialContent: `${vialMg}mg (${vialMcg}mcg)`,
    waterAdded: `${waterMl}ml bacteriostatic water`,
    concentration: `${concentrationMcgPerMl.toFixed(0)} mcg/ml`,
    mlPerDose: `${mlPerDose.toFixed(3)} ml`,
    unitsPerDose: `${unitsPerDose} units (on a 100-unit insulin syringe)`,
    dosesPerVial: dosesPerVial,
    daysSupplyDailyOnce: `${daysSupplyDaily} days`,
    daysSupplyDailyTwice: `${daysSupplyBid} days`,
    storageReconstituted: 'Refrigerate at 2–8°C, use within 28–30 days',
    storageUnreconstituted: 'Refrigerate or room temp (short-term), avoid light/heat',
  };
}

/**
 * Common peptide reference data
 * Typical doses and reconstitution suggestions for popular research peptides
 */
const PEPTIDE_REFERENCE = {
  'BPC-157': {
    typicalDoseMcg: 250,
    suggestedVialMg: 5,
    suggestedWaterMl: 2,
    frequency: 'Once daily (subcutaneous)',
    notes: 'Inject near injury site for localized effects. Can use oral for gut-specific applications.',
    guide: 'https://copenhagenchems.com/bpc-157-gut-healing-protocol/',
  },
  'TB-500': {
    typicalDoseMcg: 5000, // 5mg loading
    suggestedVialMg: 10,
    suggestedWaterMl: 2,
    frequency: 'Loading: 5–10mg/week × 4–6 weeks; Maintenance: 2.5mg biweekly',
    notes: 'Systemically distributed. Remote injection sites acceptable.',
    guide: 'https://copenhagenchems.com/wolverine-protocol-bpc-157-tb-500-stack/',
  },
  'Thymosin Alpha-1': {
    typicalDoseMcg: 1000, // 1mg
    suggestedVialMg: 5,
    suggestedWaterMl: 2.5,
    frequency: '1mg twice weekly (subcutaneous)',
    notes: 'Immune modulation. Very benign safety profile.',
    guide: 'https://copenhagenchems.com/trevor-bachmeyer-4-essential-peptides/',
  },
  'Epithalon': {
    typicalDoseMcg: 10000, // 10mg
    suggestedVialMg: 10,
    suggestedWaterMl: 1,
    frequency: '10mg daily × 10 days (annual course)',
    notes: 'Annual cycle preferred. Telomerase activation / circadian regulation.',
    guide: 'https://copenhagenchems.com/trevor-bachmeyer-4-essential-peptides/',
  },
  'MOTS-C': {
    typicalDoseMcg: 5000, // 5mg
    suggestedVialMg: 5,
    suggestedWaterMl: 1,
    frequency: '5mg twice weekly (subcutaneous)',
    notes: 'Mitochondria-derived peptide. Activates AMPK. Best taken before exercise.',
    guide: 'https://copenhagenchems.com/mots-c-mitochondrial-peptide-anti-aging/',
  },
  'GHK-Cu': {
    typicalDoseMcg: 1000, // 1mg
    suggestedVialMg: 5,
    suggestedWaterMl: 2.5,
    frequency: '1–2mg daily (subcutaneous)',
    notes: 'Copper peptide. Skin, hair, wound healing, gene regulation.',
    guide: 'https://copenhagenchems.com/ghk-cu-peptide-gene-control-protocol/',
  },
};

/**
 * Get full profile for a specific peptide
 * @param {string} peptideName - Name from PEPTIDE_REFERENCE keys
 * @returns {Object} Profile with calc results + reference data
 */
function getPeptideProfile(peptideName) {
  const ref = PEPTIDE_REFERENCE[peptideName];
  if (!ref) {
    return { error: `Unknown peptide: ${peptideName}. Available: ${Object.keys(PEPTIDE_REFERENCE).join(', ')}` };
  }
  const calcResult = calculate({
    vialMg: ref.suggestedVialMg,
    waterMl: ref.suggestedWaterMl,
    doseMcg: ref.typicalDoseMcg,
  });
  return {
    peptide: peptideName,
    frequency: ref.frequency,
    notes: ref.notes,
    guide: ref.guide,
    reconstitution: calcResult,
  };
}

// ── CLI / Demo ──────────────────────────────────────────────────────────────
if (typeof require !== 'undefined' && require.main === module) {
  console.log('═══════════════════════════════════════════════════════');
  console.log(' Peptide Reconstitution Calculator');
  console.log(' More: https://copenhagenchems.com/how-to-reconstitute-store-peptides/');
  console.log('═══════════════════════════════════════════════════════\n');

  // Example: custom calculation
  console.log('── Custom Calculation: 5mg vial, 2ml BW, 250mcg dose ──');
  const custom = calculate({ vialMg: 5, waterMl: 2, doseMcg: 250 });
  Object.entries(custom).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  // Example: peptide profiles
  console.log('\n── Peptide Profiles ──');
  Object.keys(PEPTIDE_REFERENCE).forEach(name => {
    const profile = getPeptideProfile(name);
    console.log(`\n${name}`);
    console.log(`  Frequency: ${profile.frequency}`);
    console.log(`  Concentration: ${profile.reconstitution.concentration}`);
    console.log(`  Units/dose: ${profile.reconstitution.unitsPerDose}`);
    console.log(`  Doses/vial: ${profile.reconstitution.dosesPerVial}`);
    console.log(`  Guide: ${profile.guide}`);
  });
}

// ── Browser / Module export ─────────────────────────────────────────────────
if (typeof module !== 'undefined') {
  module.exports = { calculate, getPeptideProfile, PEPTIDE_REFERENCE };
}
