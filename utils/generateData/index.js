var fs = require("fs");
// Sample data for randomization
var statuses = ["In Development", "Approved"];
var descriptions = [
    "A novel treatment for chronic pain.",
    "Designed for cognitive enhancement.",
    "Reduces inflammation and immune response.",
    "Targets cancer cells with precision.",
    "Prevents blood clots in high-risk patients.",
];
var mechanisms = [
    "Modulates NMDA receptors.",
    "Inhibits TNF-alpha.",
    "Blocks P2Y12 receptor.",
    "Acts on serotonin reuptake inhibitors.",
    "Targets B-cell pathways.",
];
var sideEffects = [
    ["Nausea", "Dizziness", "Headache"],
    ["Fatigue", "Increased risk of infections"],
    ["Abdominal pain", "Mild anxiety"],
    ["Sleep disturbances", "Injection site reactions"],
    ["Bleeding", "Mild sedation"],
];
var manufacturers = [
    "PharmaGenix Inc.",
    "HeartWell Pharma",
    "NeuroGen Labs",
    "ImmunoLife Corp.",
    "OncoTarget Therapeutics",
];
var trialPhases = ["Phase I", "Phase II", "Phase III"];
var formulations = ["Oral tablet", "Injection", "IV drip", "Topical cream"];
var indications = [
    ["Chronic pain", "Neuropathic pain"],
    ["Rheumatoid arthritis", "Crohn's disease"],
    ["Alzheimer’s disease", "Mild cognitive impairment"],
    ["Cancer", "Leukemia"],
    ["Stroke prevention", "Acute coronary syndrome"],
];
// Generate random data
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function generateDrugs(count) {
    var drugs = [];
    for (var i = 0; i < count; i++) {
        drugs.push({
            drug_id: "drug-id-".concat(i),
            name: "Drug".concat(String.fromCharCode(65 + (i % 26))).concat(Math.floor(i / 26)),
            status: getRandomElement(statuses),
            description: getRandomElement(descriptions),
            Mechanism_of_Action: getRandomElement(mechanisms),
            side_effects: getRandomElement(sideEffects),
            other_details: {
                manufacturer: getRandomElement(manufacturers),
                trial_Phase: getRandomElement(trialPhases),
                indications: getRandomElement(indications),
                formulation: getRandomElement(formulations),
            },
        });
    }
    return drugs;
}
// Generate 100 drug candidates and save to a file
var drugCandidates = generateDrugs(100);
fs.writeFileSync("drug_candidates.json", JSON.stringify(drugCandidates, null, 4), "utf8");
console.log("Generated 100 drug candidates and saved to drug_candidates.json");
