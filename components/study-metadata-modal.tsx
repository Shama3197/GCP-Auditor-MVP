"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";

interface StudyMetadataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_DATA = {
  studyTitle: "Multicenter Evaluation of Bioactive Implant Surfaces in Type-2 Diabetic Patients",
  protocolId: "MAHE-PROS-2025-004",
  phase: "Phase III Clinical Trial",
  therapeuticArea: "Prosthodontics / Implantology",
  irbStatus: "Approved - Institutional Review Board, MAHE",
};

export function StudyMetadataModal({
  open,
  onOpenChange,
}: StudyMetadataModalProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(INITIAL_DATA);

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      setIsEditing(false);
      setFormData(INITIAL_DATA);
    }
  }, [open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(INITIAL_DATA);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Study Metadata</DialogTitle>
          <DialogDescription>
            View and manage study administrative information for GCP compliance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="studyTitle">Study Title</Label>
            {isEditing ? (
              <Input
                id="studyTitle"
                value={formData.studyTitle}
                onChange={(e) =>
                  handleInputChange("studyTitle", e.target.value)
                }
                className="w-full"
              />
            ) : (
              <div className="min-h-[40px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm flex items-center">
                {formData.studyTitle}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="protocolId">Protocol ID</Label>
            {isEditing ? (
              <Input
                id="protocolId"
                value={formData.protocolId}
                onChange={(e) =>
                  handleInputChange("protocolId", e.target.value)
                }
                className="w-full"
              />
            ) : (
              <div className="min-h-[40px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm flex items-center">
                {formData.protocolId}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phase">Phase</Label>
            {isEditing ? (
              <Input
                id="phase"
                value={formData.phase}
                onChange={(e) => handleInputChange("phase", e.target.value)}
                className="w-full"
              />
            ) : (
              <div className="min-h-[40px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm flex items-center">
                {formData.phase}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="therapeuticArea">Therapeutic Area</Label>
            {isEditing ? (
              <Input
                id="therapeuticArea"
                value={formData.therapeuticArea}
                onChange={(e) =>
                  handleInputChange("therapeuticArea", e.target.value)
                }
                className="w-full"
              />
            ) : (
              <div className="min-h-[40px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm flex items-center">
                {formData.therapeuticArea}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="irbStatus">IRB Status</Label>
            {isEditing ? (
              <Input
                id="irbStatus"
                value={formData.irbStatus}
                onChange={(e) =>
                  handleInputChange("irbStatus", e.target.value)
                }
                className="w-full"
              />
            ) : (
              <div className="min-h-[40px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm flex items-center">
                {formData.irbStatus}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button
            onClick={() => {
              setIsEditing(false);
              // In a real app, you would save the data here
            }}
            disabled={!isEditing}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
