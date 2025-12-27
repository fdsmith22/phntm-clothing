"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-neutral-900 ${className}`}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="h-[420px] sm:h-[450px] bg-black border border-neutral-800 relative overflow-hidden">
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-neutral-700" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-neutral-700" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-neutral-700" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-neutral-700" />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Header skeleton */}
      <div className="p-3 flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="w-12 h-3 rounded" />
          <Skeleton className="w-16 h-2 rounded" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="w-14 h-3 rounded" />
          <Skeleton className="w-10 h-2 rounded ml-auto" />
        </div>
      </div>

      {/* Ghost letter placeholder */}
      <div className="flex-1 flex items-center justify-center py-12">
        <motion.div
          className="w-32 h-32 bg-neutral-900 rounded-sm"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Bottom info skeleton */}
      <div className="p-4 border-t border-neutral-800">
        <Skeleton className="w-16 h-2 rounded mb-2" />
        <Skeleton className="w-32 h-5 rounded" />
      </div>

      {/* CRT vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }}
      />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image skeleton */}
      <div className="aspect-square bg-neutral-950 border border-neutral-800 relative">
        <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-neutral-700" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-neutral-700" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-neutral-700" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-neutral-700" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-48 h-48 bg-neutral-900 rounded-sm"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Details skeleton */}
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-6">
          <Skeleton className="w-24 h-2 rounded mb-3" />
          <Skeleton className="w-48 h-8 rounded mb-2" />
          <Skeleton className="w-64 h-12 rounded mb-4" />
          <Skeleton className="w-32 h-8 rounded" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-3/4 h-4 rounded" />
        </div>

        <div>
          <Skeleton className="w-24 h-2 rounded mb-3" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-14 h-12 rounded" />
            ))}
          </div>
        </div>

        <Skeleton className="w-full h-14 rounded" />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="border border-neutral-800 p-6 relative">
      <div className="flex gap-6">
        {/* Image placeholder */}
        <Skeleton className="w-24 h-24 rounded flex-shrink-0" />

        {/* Details */}
        <div className="flex-1 space-y-3">
          <Skeleton className="w-16 h-2 rounded" />
          <Skeleton className="w-32 h-5 rounded" />
          <Skeleton className="w-24 h-3 rounded" />
          <Skeleton className="w-20 h-6 rounded" />
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end justify-between">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-32 h-10 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
