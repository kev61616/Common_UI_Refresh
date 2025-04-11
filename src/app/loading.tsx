export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8" data-oid="salm3-v">
      <div className="flex items-center justify-center" data-oid="ei4wht8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" data-oid="e24dkpg"></div>
        <span className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300" data-oid="w8knj-w">
          Loading...
        </span>
      </div>
    </div>);

}