export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white font-semibold tracking-widest">
            JOKING
          </span>
        </div>
      </div>
    </div>
  )
}