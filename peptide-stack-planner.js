/**
 * Peptide Stack Planner
 * Plan your research peptide stack based on goals
 * More: https://copenhagenchems.com/beginner-peptide-stack-guide-2026/
 */

const PEPTIDE_DATABASE = {
  'BPC-157': {
    goals: ['gut-healing', 'injury-recovery', 'inflammation', 'anti-aging'],
    dose: '250-500mcg daily',
    route: 'Subcutaneous injection',
    cycle: 'Continuous (low-dose maintenance) or 8-12 weeks acute',
    stacks_well_with: ['TB-500', 'Thymosin Alpha-1'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/bpc-157-gut-healing-protocol/',
  },
  'TB-500': {
    goals: ['injury-recovery', 'inflammation', 'performance'],
    dose: '5-10mg/week loading, 2.5mg biweekly maintenance',
    route: 'Subcutaneous injection',
    cycle: '4-6 weeks loading, then maintenance',
    stacks_well_with: ['BPC-157'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/wolverine-protocol-bpc-157-tb-500-stack/',
  },
  'MOTS-C': {
    goals: ['anti-aging', 'metabolic-health', 'energy', 'longevity'],
    dose: '5mg twice weekly',
    route: 'Subcutaneous injection',
    cycle: '8-12 weeks, can be continuous',
    stacks_well_with: ['GHK-Cu', 'Epithalon'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/mots-c-mitochondrial-peptide-anti-aging/',
  },
  'GHK-Cu': {
    goals: ['anti-aging', 'skin-health', 'hair-loss', 'wound-healing'],
    dose: '1-2mg daily',
    route: 'Subcutaneous injection',
    cycle: '8-12 weeks',
    stacks_well_with: ['MOTS-C'],
    avoid_combining: ['Mix with other peptides in same syringe — chemical degradation risk'],
    guide: 'https://copenhagenchems.com/ghk-cu-peptide-gene-control-protocol/',
  },
  'Thymosin Alpha-1': {
    goals: ['immune-health', 'anti-aging', 'longevity', 'anti-cancer'],
    dose: '1mg twice weekly',
    route: 'Subcutaneous injection',
    cycle: '6-12 weeks',
    stacks_well_with: ['BPC-157', 'Epithalon'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/thymosin-alpha-1-immune-peptide-protocol/',
  },
  'Epithalon': {
    goals: ['anti-aging', 'longevity', 'sleep', 'telomere-health'],
    dose: '10mg daily for 10 days',
    route: 'Subcutaneous injection',
    cycle: 'Annual 10-day course',
    stacks_well_with: ['MOTS-C', 'Thymosin Alpha-1'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/trevor-bachmeyer-4-essential-peptides/',
  },
  'Retatrutide': {
    goals: ['weight-loss', 'metabolic-health'],
    dose: '2-12mg weekly (titrate up)',
    route: 'Subcutaneous injection',
    cycle: '24-48 weeks',
    stacks_well_with: ['BPC-157 for muscle preservation'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/retatrutide-triple-agonist-weight-loss/',
  },
  'Semax': {
    goals: ['cognitive-enhancement', 'neuroprotection', 'mood'],
    dose: '300-600mcg daily',
    route: 'Intranasal',
    cycle: '2-4 weeks on, 2 weeks off',
    stacks_well_with: ['BPC-157'],
    avoid_combining: [],
    guide: 'https://copenhagenchems.com/semax-nootropic-peptide-cognitive-protocol/',
  },
};

function planStack(goals) {
  const matches = [];
  for (const [name, data] of Object.entries(PEPTIDE_DATABASE)) {
    const overlap = goals.filter(g => data.goals.includes(g));
    if (overlap.length > 0) {
      matches.push({ name, score: overlap.length, data, matchedGoals: overlap });
    }
  }
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 4);
}

// CLI demo
if (typeof require !== 'undefined' && require.main === module) {
  const exampleGoals = ['anti-aging', 'injury-recovery', 'longevity'];
  console.log('Peptide Stack Planner');
  console.log('Goals:', exampleGoals.join(', '));
  console.log('Recommended stack:\n');
  const stack = planStack(exampleGoals);
  stack.forEach((p, i) => {
    console.log(`${i+1}. ${p.name}`);
    console.log(`   Dose: ${p.data.dose}`);
    console.log(`   Route: ${p.data.route}`);
    console.log(`   Guide: ${p.data.guide}\n`);
  });
}

if (typeof module !== 'undefined') module.exports = { planStack, PEPTIDE_DATABASE };
