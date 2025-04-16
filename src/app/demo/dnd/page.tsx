import React from "react";
import DndDemo from "./DndDemo";

export const metadata = {
  title: "Drag and Drop Demo",
  description: "Demo of drag and drop functionality using dnd-kit",
};

export default function DndDemoPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Drag and Drop Demo</h1>
      <DndDemo />
    </div>
  );
}
