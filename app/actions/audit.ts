"use server";

import { SAMPLE_PROTOCOL_TITLE } from "@/lib/mock-protocol";

export interface AuditFinding {
  requirement: string;
  status: "Pass" | "Fail" | "Warning";
  severity: "High" | "Medium" | "Low";
  recommendation: string;
}

export interface AuditResult {
  findings: AuditFinding[];
  summary: {
    totalFindings: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

/**
 * Mock audit function that simulates ICH-GCP E6 (R3) compliance checking
 * In production, this would call OpenAI API with the PDF text
 */
export async function auditProtocol(pdfText: string): Promise<AuditResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Check if this is the sample protocol
  const isSampleProtocol = pdfText.includes(SAMPLE_PROTOCOL_TITLE) || 
                           pdfText.includes("Bioactive Implant Surfaces") ||
                           pdfText.includes("Diabetic Patients");

  // Return specific findings for sample protocol
  if (isSampleProtocol) {
    const sampleFindings: AuditFinding[] = [
      {
        requirement: "Informed Consent Process",
        status: "Pass",
        severity: "Low",
        recommendation:
          "Informed consent documentation includes digital signature protocols compliant with ICH-GCP E6 R3 Section 4.8.1. Digital signature workflow is properly documented with audit trail capabilities.",
      },
      {
        requirement: "Adverse Event Reporting Timeline",
        status: "Warning",
        severity: "Medium",
        recommendation:
          "Adverse event reporting timeline is vague on 'Day 0' definitions. Clarify whether Day 0 refers to implant placement date, randomization date, or first study procedure. Specify exact time windows (e.g., 'within 24 hours of Day 0 event') per ICH-GCP E6 R3 Section 5.16.1.",
      },
      {
        requirement: "Electronic Source Data Validation",
        status: "Fail",
        severity: "High",
        recommendation:
          "Missing specific 'Electronic Source Data' validation for the CBCT diagnostic software. Protocol must include: (1) Software validation documentation (21 CFR Part 11 compliance), (2) CBCT image acquisition parameters standardization, (3) Data integrity checks for electronic radiographic measurements, (4) Audit trail requirements for image modifications. Add detailed ESD validation section per ICH-GCP E6 R3 Section 5.5.3.",
      },
    ];

    const summary = {
      totalFindings: sampleFindings.length,
      passed: sampleFindings.filter((f) => f.status === "Pass").length,
      failed: sampleFindings.filter((f) => f.status === "Fail").length,
      warnings: sampleFindings.filter((f) => f.status === "Warning").length,
    };

    return {
      findings: sampleFindings,
      summary,
    };
  }

  // Default mock findings for other protocols
  const mockFindings: AuditFinding[] = [
    {
      requirement: "Informed Consent Process",
      status: "Pass",
      severity: "Low",
      recommendation:
        "Informed consent documentation is compliant. Ensure all consent forms are signed before any protocol-specific procedures (2025 ICH-GCP E6 R3 Section 4.8.1).",
    },
    {
      requirement: "Biomechanical Stability Reporting",
      status: "Fail",
      severity: "High",
      recommendation:
        "Protocol lacks detailed biomechanical stability assessment criteria. Add specific measurement parameters, timepoints (baseline, 3, 6, 12 months), and success criteria for implant stability quotient (ISQ) values per 2025 dental trial guidelines.",
    },
    {
      requirement: "Longitudinal Patient Follow-up Protocols",
      status: "Warning",
      severity: "Medium",
      recommendation:
        "Follow-up schedule is defined but missing detailed retention strategies. Specify patient contact methods, reminder protocols, and procedures for handling missed visits to ensure ≥90% retention rate (ICH-GCP E6 R3 Section 5.18.3).",
    },
    {
      requirement: "Adverse Event Reporting",
      status: "Pass",
      severity: "Low",
      recommendation:
        "AE reporting structure is adequate. Ensure site staff are trained on dental-specific AEs (e.g., peri-implantitis, occlusal complications) and reporting timelines per 2025 guidelines.",
    },
    {
      requirement: "Data Integrity and Source Documentation",
      status: "Warning",
      severity: "Medium",
      recommendation:
        "Source data verification plan needs enhancement. Specify which dental records (radiographs, clinical notes, periodontal charts) require 100% verification vs. sampling approach per ICH-GCP E6 R3 Section 5.5.3.",
    },
    {
      requirement: "Statistical Analysis Plan",
      status: "Fail",
      severity: "High",
      recommendation:
        "SAP lacks power calculation justification for primary endpoint. Add sample size determination with alpha=0.05, power=0.80, expected effect size, and accounting for 15% dropout rate. Include interim analysis plan if applicable (ICH-GCP E6 R3 Section 5.5.2).",
    },
    {
      requirement: "Investigator Qualifications",
      status: "Pass",
      severity: "Low",
      recommendation:
        "Investigator qualifications section is complete. Ensure all site investigators have current dental licenses and GCP certification valid through study completion.",
    },
    {
      requirement: "Protocol Amendments and Version Control",
      status: "Pass",
      severity: "Low",
      recommendation:
        "Version control procedures are documented. Maintain audit trail for all protocol amendments with clear rationale and regulatory approval documentation.",
    },
    {
      requirement: "Multi-regional Considerations",
      status: "Warning",
      severity: "Medium",
      recommendation:
        "Regional variations in dental practice standards are not fully addressed. Document how protocol accommodates differences in implant systems, materials, or surgical techniques across regions while maintaining protocol consistency (ICH-GCP E6 R3 Section 1.2).",
    },
    {
      requirement: "Quality Management System",
      status: "Pass",
      severity: "Low",
      recommendation:
        "QMS framework is established. Ensure risk-based monitoring plan includes dental-specific quality indicators (e.g., radiographic quality, impression accuracy, laboratory processing standards).",
    },
  ];

  const summary = {
    totalFindings: mockFindings.length,
    passed: mockFindings.filter((f) => f.status === "Pass").length,
    failed: mockFindings.filter((f) => f.status === "Fail").length,
    warnings: mockFindings.filter((f) => f.status === "Warning").length,
  };

  return {
    findings: mockFindings,
    summary,
  };
}

/**
 * Production function (commented out) - would call OpenAI API
 * 
 * export async function auditProtocol(pdfText: string): Promise<AuditResult> {
 *   const response = await fetch("https://api.openai.com/v1/chat/completions", {
 *     method: "POST",
 *     headers: {
 *       "Content-Type": "application/json",
 *       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
 *     },
 *     body: JSON.stringify({
 *       model: "gpt-4o",
 *       messages: [
 *         {
 *           role: "system",
 *           content: `You are an ICH-GCP E6 (R3) Compliance Officer specializing in clinical trial protocols. 
 *                     Analyze the provided protocol text and return a JSON object with a list of 'Findings'.
 *                     Each Finding must include: requirement (e.g., Informed Consent), status (Pass/Fail/Warning), 
 *                     severity (High/Medium/Low), and recommendation (how to fix it based on 2025 ICH-GCP E6 R3 guidelines).
 *                     Focus on common gaps in dental clinical trials, such as biomechanical stability reporting 
 *                     and longitudinal patient follow-up protocols.`,
 *         },
 *         {
 *           role: "user",
 *           content: `Please audit this clinical protocol for ICH-GCP E6 (R3) compliance:\n\n${pdfText}`,
 *         },
 *       ],
 *       response_format: { type: "json_object" },
 *     }),
 *   });
 * 
 *   const data = await response.json();
 *   return JSON.parse(data.choices[0].message.content);
 * }
 */
