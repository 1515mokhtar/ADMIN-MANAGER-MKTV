import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { RegionLabels } from "./_components/region-labels";
import { ChatsCard } from "./_components/chats-card";
import TimeFrameWrapper from "./_components/time-frame-wrapper";
import dynamic from 'next/dynamic';

// Import client components with noSSR
const PaymentsOverview = dynamic(
  () => import("@/components/Charts/payments-overview").then(mod => mod.PaymentsOverview),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const WeeksProfit = dynamic(
  () => import("@/components/Charts/weeks-profit").then(mod => mod.WeeksProfit),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const UsedDevices = dynamic(
  () => import("@/components/Charts/used-devices").then(mod => mod.UsedDevices),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const TopChannels = dynamic(
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
        <TimeFrameWrapper sectionKey="payments_overview">
          {(timeFrame) => (
            <PaymentsOverview
              className="col-span-12 xl:col-span-7"
              timeFrame={timeFrame}
            />
          )}
        </TimeFrameWrapper>

        <TimeFrameWrapper sectionKey="weeks_profit">
          {(timeFrame) => (
            <WeeksProfit
              timeFrame={timeFrame}
              className="col-span-12 xl:col-span-5"
            />
          )}
        </TimeFrameWrapper>

        <TimeFrameWrapper sectionKey="used_devices">
          {(timeFrame) => (
            <UsedDevices
              className="col-span-12 xl:col-span-5"
              timeFrame={timeFrame}
            />
          )}
        </TimeFrameWrapper>

        <RegionLabels />

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
} 