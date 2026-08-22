import React from "react";

const AppSkeleton = () => {
  return (
    <div className="min-h-screen w-full animate-pulse bg-gray-50">
      
      {/* Navbar */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="h-7 w-32 rounded-md bg-gray-200" />

        <div className="h-9 w-9 rounded-full bg-gray-200" />
      </div>

      <div className="flex">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-60 border-r border-gray-200 bg-white p-4 md:block">
          
          <div className="mb-6 h-8 w-36 rounded-md bg-gray-200" />

          <div className="space-y-4">
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          
          {/* Heading */}
          <div className="mb-8">
            <div className="h-7 w-48 rounded-md bg-gray-200" />
            <div className="mt-3 h-4 w-80 max-w-full rounded-md bg-gray-200" />
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex gap-3">
            <div className="h-10 w-32 rounded-xl bg-gray-200" />
            <div className="h-10 w-40 rounded-xl bg-gray-200" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-xl bg-white shadow-sm"
              >
                <div className="p-4">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="mt-3 h-5 w-10 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="h-64 rounded-xl bg-white p-4 shadow-sm">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-6 h-44 w-full rounded-lg bg-gray-100" />
            </div>

            <div className="h-64 rounded-xl bg-white p-4 shadow-sm">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-6 h-44 w-full rounded-lg bg-gray-100" />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AppSkeleton;