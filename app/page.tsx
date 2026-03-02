import { Sidebar } from "@/components/ui/sidebar";
import { DragDropZone } from "@/components/drag-drop-zone";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto bg-background">
        <div className="container mx-auto max-w-4xl p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              Clinical Protocol Auditor
            </h1>
            <p className="text-muted-foreground">
              Ensure trial documents meet ICH-GCP E6 (R3) standards
            </p>
          </div>
          <DragDropZone />
        </div>
      </main>
    </div>
  );
}
