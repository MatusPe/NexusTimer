"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useTimerStore } from "@/store/timerStore";
import { useTranslations } from "next-intl";

const HeaderTimer = dynamic(() => import("@/components/timer/HeaderTimer"), {
  ssr: false,
});
const TimerWidgets = dynamic(() => import("@/components/timer/TimerWidgets"), {
  ssr: false,
});
const TimerContainer = dynamic(
  () => import("@/components/timer/TimerContainer"),
  { ssr: false }
);
const MainTimer = dynamic(
  () => import("@/components/timer/MainTimer").then((m) => m.MainTimer),
  { ssr: false }
);
const ScrambleModal = dynamic(
  () => import("@/components/timer/ScrambleModal"),
  { ssr: false, loading: () => null }
);
const FadeIn = dynamic(() => import("@/components/fade-in/fade-in"), {
  ssr: false,
});
const FireworksBackground = dynamic(
  () =>
    import("@/components/ui/shadcn-io/fireworks-background").then(
      (m) => m.FireworksBackground
    ),
  { ssr: false, loading: () => <div /> } // optional placeholder
);
const DialogFirstRunNoCubes = dynamic(
  () =>
    import(
      "@/components/dialogs/dialog-first-run-no-cubes/dialog-first-run-no-cubes"
    ),
  { ssr: false, loading: () => null } // optional placeholder while loading
);

export default function Home() {
  const resetTimerStore = useTimerStore((state) => state.reset);
  const t = useTranslations("Metadata");
  const timerStatistics = useTimerStore((store) => store.timerStatistics);
  const lastSolve = useTimerStore((store) => store.lastSolve);
  const isSolving = useTimerStore((store) => store.isSolving);

  const isRecord = useMemo(() => {
    return timerStatistics.global.best === lastSolve?.time && !isSolving;
  }, [isSolving, lastSolve, timerStatistics.global.best]);

  useEffect(() => {
    resetTimerStore();
  }, [resetTimerStore]);

  return (
    <>
      <FadeIn className={"flex flex-col grow relative"}>
        <h1 className="sr-only">{t("description")}</h1>
        <TimerContainer>
          <HeaderTimer />
          <MainTimer />
          <TimerWidgets />
        </TimerContainer>
        <ScrambleModal />

        {isRecord && (
          <div className="absolute inset-0 z-1">
            <FireworksBackground
              fireworkSpeed={{ min: 8, max: 16 }}
              fireworkSize={{ min: 4, max: 10 }}
              particleSpeed={{ min: 4, max: 14 }}
              particleSize={{ min: 2, max: 10 }}
            />
          </div>
        )}
      </FadeIn>
      <DialogFirstRunNoCubes />
    </>
  );
}
