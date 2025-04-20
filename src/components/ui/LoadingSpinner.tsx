export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 text-sm text-gray-500">Chargement...</p>
    </div>
  );
} 