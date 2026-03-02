"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileText, Database, LayoutDashboard, Stethoscope, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StudyMetadataModal } from "@/components/study-metadata-modal";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeSection, setActiveSection] = React.useState<string>("audits");
  const [isMetadataModalOpen, setIsMetadataModalOpen] = React.useState(false);

  const menuItems = [
    {
      id: "audits",
      label: "Active Audits",
      icon: FileText,
    },
    {
      id: "metadata",
      label: "Study Metadata",
      icon: Database,
    },
  ];

  return (
    <div
      className={cn(
        "flex h-screen w-64 flex-col border-r bg-card",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <LayoutDashboard className="mr-2 h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Protocol Auditor</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (item.id === "metadata") {
                  setIsMetadataModalOpen(true);
                }
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      {/* Study Metadata Modal */}
      <StudyMetadataModal
        open={isMetadataModalOpen}
        onOpenChange={setIsMetadataModalOpen}
      />
      
      {/* SME Insight Section */}
      <div className="border-t p-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">SME Insight</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Audit logic enhanced by Dr. Shama Sreeram (MDS Prosthodontics) to include biomechanical stress distribution variables (FEA) often overlooked in standard medical device trials.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clinician&apos;s Note Section */}
      <div className="border-t p-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Clinician&apos;s Note</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              As an MDS Prosthodontics specialist, I designed this logic to specifically target common gaps in dental clinical trials, such as biomechanical stability reporting and longitudinal patient follow-up protocols.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
