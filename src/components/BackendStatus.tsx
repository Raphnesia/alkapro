// src/components/BackendStatus.tsx
// Komponen untuk menampilkan status koneksi backend

interface BackendStatusProps {
  isOnline: boolean;
  hasData?: boolean;
}

export function BackendStatus({ isOnline, hasData = false }: BackendStatusProps) {
  if (isOnline && hasData) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Backend Online</span>
          </div>
        </div>
      </div>
    );
  }

  if (isOnline && !hasData) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Backend Online (Menggunakan Data Fallback)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>Backend Offline</span>
        </div>
      </div>
    </div>
  );
} 