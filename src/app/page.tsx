import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { RegionLabels } from "./_components/region-labels";
import { ChatsCard } from "./_components/chats-card";
import { TimeFrameWrapper } from './_components/time-frame-wrapper';
import dynamic from 'next/dynamic';

// Import client components with noSSR and loading states
const PaymentsOverview = dynamic(
  () => import("@/components/Charts/payments-overview").then(mod => mod.PaymentsOverview),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  }
);

const WeeksProfit = dynamic(
  () => import("@/components/Charts/weeks-profit").then(mod => mod.WeeksProfit),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  }
);

const UsedDevices = dynamic(
  () => import("@/components/Charts/used-devices").then(mod => mod.UsedDevices),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  }
);

const TopChannels = dynamic(
  () => import("@/components/Tables/top-channels").then(mod => mod.TopChannels),
  { 
    ssr: false,
    loading: () => <TopChannelsSkeleton />
  }
);

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="space-y-4">
        <Suspense fallback={<OverviewCardsSkeleton />}>
          <OverviewCardsGroup />
        </Suspense>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-7">
            <TimeFrameWrapper sectionKey="payments_overview">
              <PaymentsOverview
                className="w-full"
                timeFrame="monthly"
              />
            </TimeFrameWrapper>
          </div>

          <div className="col-span-12 xl:col-span-5">
            <TimeFrameWrapper sectionKey="weeks_profit">
              <WeeksProfit
                timeFrame="monthly"
                className="w-full"
              />
            </TimeFrameWrapper>
          </div>

          <div className="col-span-12 xl:col-span-5">
            <TimeFrameWrapper sectionKey="used_devices">
              <UsedDevices
                className="w-full"
                timeFrame="monthly"
              />
            </TimeFrameWrapper>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RegionLabels />
          </div>

          <div className="col-span-12 xl:col-span-8">
            <Suspense fallback={<TopChannelsSkeleton />}>
              <TopChannels />
            </Suspense>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <Suspense fallback={null}>
              <ChatsCard />
            </Suspense>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 