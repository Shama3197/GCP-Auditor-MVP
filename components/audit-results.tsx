"use client";

import * as React from "react";
import { AuditResult } from "@/app/actions/audit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface AuditResultsProps {
  result: AuditResult;
}

export function AuditResults({ result }: AuditResultsProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pass":
        return "success";
      case "Fail":
        return "danger";
      case "Warning":
        return "warning";
      default:
        return "default";
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pass":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Fail":
        return <XCircle className="h-4 w-4" />;
      case "Warning":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.summary.totalFindings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{result.summary.passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{result.summary.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{result.summary.warnings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Findings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Findings</CardTitle>
          <CardDescription>
            Detailed compliance assessment based on ICH-GCP E6 (R3) standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Requirement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.findings.map((finding, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {finding.requirement}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(finding.status) as any}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getStatusIcon(finding.status)}
                      {finding.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getSeverityBadgeVariant(finding.severity) as any}
                    >
                      {finding.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {finding.recommendation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
