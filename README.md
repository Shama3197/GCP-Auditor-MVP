# Clinical Protocol Auditor

A Next.js 15 application designed to help Clinical Research Associates (CRAs) and Medical Writers ensure clinical trial protocols meet ICH-GCP E6 (R3) compliance standards through automated auditing and intelligent analysis.

## Overview

The Clinical Protocol Auditor is an enterprise-grade web application that streamlines the protocol review process for multi-regional clinical trials (MRCTs). Built with modern web technologies, it provides a clean, medical-grade interface for uploading, analyzing, and auditing clinical protocol documents against international regulatory standards.

## Key Features

- **Drag & Drop Protocol Upload**: Intuitive interface for uploading PDF protocol documents
- **Automated Compliance Auditing**: AI-powered analysis against ICH-GCP E6 (R3) guidelines
- **Study Metadata Management**: Centralized repository for study administrative information
- **Color-Coded Findings**: Visual indicators for Pass/Warning/Fail status with severity levels
- **Professional Dashboard**: Medical-grade UI optimized for extended use by clinical research professionals

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives for accessible, enterprise-grade components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

```bash
npm run build
npm start
```

## Why This Exists

As a Gold Medalist in Applied Basic Sciences, I identified a critical gap in how clinical trials handle complex biomechanical data. Traditional protocol auditing processes often overlook specialized requirements in dental and prosthodontic trials, particularly:

- **Biomechanical Stability Reporting**: Standard medical device trial frameworks lack detailed assessment criteria for implant stability quotient (ISQ) values and biomechanical stress distribution variables (FEA - Finite Element Analysis)
- **Longitudinal Patient Follow-up Protocols**: Missing detailed retention strategies and patient contact methods specific to dental clinical trials
- **Electronic Source Data Validation**: Inadequate validation requirements for diagnostic software (e.g., CBCT imaging) used in dental trials

This application addresses these gaps by incorporating domain-specific expertise from MDS Prosthodontics specialists, ensuring that clinical protocols meet not only general ICH-GCP standards but also the specialized requirements of complex biomechanical studies.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions (audit logic)
│   ├── globals.css        # Global styles
│   └── page.tsx           # Main dashboard page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── audit-results.tsx  # Audit findings display
│   ├── drag-drop-zone.tsx # File upload component
│   └── study-metadata-modal.tsx # Study metadata modal
├── lib/                   # Utility functions
└── PRD.md                 # Product Requirements Document
```

## Contributing

This is a demonstration project showcasing expertise in:
- Clinical research compliance (ICH-GCP E6 R3)
- Modern web development (Next.js, TypeScript)
- Medical software UI/UX design
- Domain-specific clinical trial requirements

## License

This project is a portfolio demonstration piece.

---

**Built with expertise in Applied Basic Sciences and Clinical Research Compliance**
