export default function Loading() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="loading-spinner w-8 h-8" />
      <span className="ml-3 text-gray-600">Carregando...</span>
    </div>
  );
}
