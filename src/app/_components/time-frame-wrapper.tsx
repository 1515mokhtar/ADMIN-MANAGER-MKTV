'use client';

import { useSearchParams } from "next/navigation";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { ReactNode } from "react";

interface TimeFrameWrapperProps {
  children: (timeFrame: string) => ReactNode;
  sectionKey: string;
}

export default function TimeFrameWrapper({ children, sectionKey }: TimeFrameWrapperProps) {
  const searchParams = useSearchParams();
  const selected_time_frame = searchParams?.get('selected_time_frame');
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame || '');
  const timeFrame = extractTimeFrame(sectionKey)?.split(":")[1] || "monthly";
  
  return <>{children(timeFrame)}</>;
} 