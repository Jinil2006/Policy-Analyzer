// Day 4
const insuranceData = {
  summary: "Your health insurance policy provides moderate coverage with standard inclusions for hospitalization, emergency services, and day care procedures. However, there are notable exclusions around dental and cosmetic treatments, and several conditions including waiting periods and co-payments that you should be aware of before filing any claims.",
  covered: [
    "Hospitalization expenses",
    "Emergency ambulance services",
    "Pre and post hospitalization (30/60 days)",
    "Day care procedures",
    "Organ donor expenses"
  ],
  notCovered: [
    "Dental treatments",
    "Cosmetic surgery",
    "Self-inflicted injuries",
    "Non-allopathic treatments",
    "Experimental procedures"
  ],
  conditions: [
    "Waiting period of 30 days for general illness",
    "2 year waiting period for pre-existing diseases",
    "Co-payment of 10% for each claim",
    "Annual health checkup after 4 claim-free years",
    "Room rent capped at 1% of sum insured per day"
  ],
  risks: [
    "Coverage capped at ₹5 lakhs per year",
    "Sub-limits on specific surgeries",
    "No coverage outside India",
    "Claim must be filed within 30 days of discharge",
    "Network hospital restriction for cashless claims"
  ]
};

export default insuranceData;
