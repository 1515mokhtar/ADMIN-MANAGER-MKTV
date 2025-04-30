'use client';

import { Suspense } from "react";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { RegionLabels } from "./region-labels";
import { ChatsCard } from "./chats-card";
import TimeFrameWrapper from "./time-frame-wrapper";
import dynamicImport from 'next/dynamic';

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

export default function HomeContent() {
  return (
    <>
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
    </>
  );
} 