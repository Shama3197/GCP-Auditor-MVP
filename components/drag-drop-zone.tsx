"use client";

import * as React from "react";
import { Upload, FileText, X, FileCheck, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auditProtocol, type AuditResult } from "@/app/actions/audit";
import { AuditResults } from "@/components/audit-results";
import { MOCK_PROTOCOL_CONTENT } from "@/lib/mock-protocol";

interface DragDropZoneProps {
  onFileUpload?: (files: File[]) => void;
  className?: string;
}

export function DragDropZone({ onFileUpload, className }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isAuditing, setIsAuditing] = React.useState(false);
  const [auditResult, setAuditResult] = React.useState<AuditResult | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type === "application/pdf"
    );

    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
      onFileUpload?.(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type === "application/pdf"
    );

    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
      onFileUpload?.(files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setAuditResult(null);
  };

  const handleAudit = async (protocolText?: string) => {
    setIsAuditing(true);
    setAuditResult(null);

    try {
      // Use provided protocol text or extract from uploaded files
      let pdfText = protocolText || "Clinical Protocol Document - Mock text for audit";
      
      if (uploadedFiles.length > 0 && !protocolText) {
        // In production, extract text from PDF here
        pdfText = "Clinical Protocol Document - Mock text for audit";
      }
      
      const result = await auditProtocol(pdfText);
      setAuditResult(result);
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleLoadSampleProtocol = async () => {
    // Create a mock file object for the sample protocol
    const mockFile = new File(
      [MOCK_PROTOCOL_CONTENT],
      "Sample_Phase_III_Protocol_Diabetic_Implant_Study.pdf",
      { type: "application/pdf" }
    );

    // Add to uploaded files
    setUploadedFiles([mockFile]);
    setAuditResult(null);

    // Automatically trigger audit with sample protocol content
    await handleAudit(MOCK_PROTOCOL_CONTENT);
  };

  return (
    <div className={cn("w-full", className)}>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center p-12">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">
            Upload Protocol PDF
          </h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Drag and drop your protocol PDF here, or click to browse
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Select Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </Card>

      {/* Sample Protocol Button */}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleLoadSampleProtocol}
          variant="outline"
          className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
          disabled={isAuditing}
        >
          <Sparkles className="h-4 w-4" />
          Load Sample Phase III Protocol
        </Button>
      </div>

      {/* Audit Protocol Button - Centered below Sample Protocol Button */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => handleAudit()}
            disabled={isAuditing}
            className="gap-2"
          >
            {isAuditing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Auditing...
              </>
            ) : (
              <>
                <FileCheck className="h-4 w-4" />
                Audit Protocol
              </>
            )}
          </Button>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <Card key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </Card>
          ))}
        </div>
      )}

      {auditResult && (
        <div className="mt-8">
          <AuditResults result={auditResult} />
        </div>
      )}
    </div>
  );
}
