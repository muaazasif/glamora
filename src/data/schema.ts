export const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Muhammad Muaaz",
  "description": "Data Analyst & Finance Expert offering Excel Dashboards, SQL, and Power BI services.",
  "review": [{
    "@type": "Review",
    "author": {"@type": "Person", "name": "Client Name"},
    "reviewRating": {"@type": "Rating", "ratingValue": "5"},
    "reviewBody": "Excellent data work, highly professional."
  }]
} as const;
