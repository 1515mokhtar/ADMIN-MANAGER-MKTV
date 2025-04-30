import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import dynamic from 'next/dynamic';

// Import the client component dynamically
const HomeContent = dynamic(() => import('./_components/home-content'), {
  ssr: false,
  loading: () => <OverviewCardsSkeleton />
});

export default function Home() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <HomeContent />
      </Suspense>
    </ProtectedRoute>
  );
}
