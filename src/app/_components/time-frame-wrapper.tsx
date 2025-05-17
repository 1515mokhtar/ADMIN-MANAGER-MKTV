'use client';

import React from 'react';
import { useSearchParams } from "next/navigation";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeFrameWrapperProps {
  children: React.ReactNode;
  onTimeFrameChange?: (value: string) => void;
}

export function TimeFrameWrapper({ children, onTimeFrameChange }: TimeFrameWrapperProps) {
  const searchParams = useSearchParams();
  const selected_time_frame = searchParams?.get('selected_time_frame');
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame || '');
  const timeFrame = extractTimeFrame(sectionKey)?.split(":")[1] || "monthly";
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select onValueChange={onTimeFrameChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {children}
    </div>
  );
} 