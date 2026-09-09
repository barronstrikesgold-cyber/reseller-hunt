export default function Loading() {
  return (
    <div className="px-4" style={{ paddingTop: "calc(env(safe-area-inset-top) + 52px)" }}>
      <div className="h-10 w-40 rounded bg-[#E5E5EA]" />
      <div className="mt-3 h-4 w-56 rounded bg-[#E5E5EA]" />
      <div className="mt-6 h-36 rounded-[10px] bg-white" />
      <div className="mt-4 h-48 rounded-[10px] bg-white" />
    </div>
  );
}
