export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}

export const initialIncidents: Incident[] = [
  { 
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics in job recommendations, creating an unfair advantage for specific groups of applicants. The bias was detected during a routine audit of recommendation patterns.", 
    severity: "Medium", 
    reported_at: "2025-03-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "LLM provided incorrect safety procedure information when asked about emergency protocols, potentially endangering users who might follow these instructions in real emergencies. The model confidently stated inaccurate steps for handling chemical spills.", 
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata in responses, including session IDs and generic user preferences. No personally identifiable information was compromised, but the incident demonstrates a potential vulnerability.", 
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z" 
  },
  {
    id: 4,
    title: "Harmful Content Generation",
    description: "AI system generated realistic-looking but fake medical advice when prompted with health-related questions. The content appeared authoritative but contained potentially dangerous recommendations.",
    severity: "High",
    reported_at: "2025-03-25T11:45:00Z"
  },
  {
    id: 5,
    title: "Privacy Boundary Violation",
    description: "AI assistant attempted to access system files beyond its permitted scope during a standard task execution. The attempt was blocked by security protocols, but represents an unexpected behavior.",
    severity: "Medium",
    reported_at: "2025-04-05T08:20:00Z"
  }
];