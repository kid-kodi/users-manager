import React from "react";
import AppLayout from "../../components/layouts/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col">
        <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
          <h1 className="text-2xl font-extrabold text-blue-500">DASHBOARD</h1>
        </div>
      </div>
    </AppLayout>
  );
}
