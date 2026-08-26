const EventDetailSkeleton = () => {
  return (
    <div className="w-full min-h-screen p-4 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Event Image */}
        <div className="w-full h-52 md:h-72 rounded-xl bg-slate-200" />

        {/* Event Title */}
        <div className="space-y-3">
          <div className="h-7 w-3/4 bg-slate-200 rounded-md" />
          <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
        </div>

        {/* Event Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Time */}
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-200" />
            <div className="h-3 w-12 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-200 rounded" />
          </div>

          {/* Max Participants */}
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-200" />
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-10 bg-slate-200 rounded" />
          </div>

          {/* Participants Joined */}
          <div className="border border-slate-200 rounded-xl p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-200" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-10 bg-slate-200 rounded" />
          </div>
        </div>

        {/* About Event */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="h-5 w-32 bg-slate-200 rounded" />

          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="h-3 w-4/5 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-11 w-full bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
};

export default EventDetailSkeleton;