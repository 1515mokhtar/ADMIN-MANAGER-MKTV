'use client';

import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { RegionLabels } from "./_components/region-labels";
import { ChatsCard } from "./_components/chats-card";
import TimeFrameWrapper from "./_components/time-frame-wrapper";
import HomeContent from "./_components/home-content";

// Import client components with noSSR
import dynamicImport from 'next/dynamic';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Client components
const PaymentsOverview = dynamicImport(
  () => import("@/components/Charts/payments-overview").then(mod => mod.PaymentsOverview),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const WeeksProfit = dynamicImport(
  () => import("@/components/Charts/weeks-profit").then(mod => mod.WeeksProfit),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const UsedDevices = dynamicImport(
  () => import("@/components/Charts/used-devices").then(mod => mod.UsedDevices),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const TopChannels = dynamicImport(
  () => import("@/components/Tables/top-channels").then(mod => mod.TopChannels),
  { ssr: false, loading: () => <TopChannelsSkeleton /> }
);

export default function Home() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <HomeContent />
      </div>
    </ProtectedRoute>
  );
}
