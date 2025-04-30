'use client';

import { Suspense, lazy } from "react";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { RegionLabels } from "./region-labels";
import { ChatsCard } from "./chats-card";
import TimeFrameWrapper from "./time-frame-wrapper";

// Lazy load components
const PaymentsOverview = lazy(() => import("@/components/Charts/payments-overview").then(mod => ({ default: mod.PaymentsOverview })));
const WeeksProfit = lazy(() => import("@/components/Charts/weeks-profit").then(mod => ({ default: mod.WeeksProfit })));
const UsedDevices = lazy(() => import("@/components/Charts/used-devices").then(mod => ({ default: mod.UsedDevices })));
const TopChannels = lazy(() => import("@/components/Tables/top-channels").then(mod => ({ default: mod.TopChannels })));

export default function HomeContent() {
  return (
    <>
      <TimeFrameWrapper sectionKey="payments_overview">
        {(timeFrame) => (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentsOverview
              className="col-span-12 xl:col-span-7"
              timeFrame={timeFrame}
            />
          </Suspense>
        )}
      </TimeFrameWrapper>

      <TimeFrameWrapper sectionKey="weeks_profit">
        {(timeFrame) => (
          <Suspense fallback={<div>Loading...</div>}>
            <WeeksProfit
              timeFrame={timeFrame}
              className="col-span-12 xl:col-span-5"
            />
          </Suspense>
        )}
      </TimeFrameWrapper>

      <TimeFrameWrapper sectionKey="used_devices">
        {(timeFrame) => (
          <Suspense fallback={<div>Loading...</div>}>
            <UsedDevices
              className="col-span-12 xl:col-span-5"
              timeFrame={timeFrame}
            />
          </Suspense>
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