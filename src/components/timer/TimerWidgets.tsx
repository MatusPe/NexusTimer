import StatisticsPanel from './StatisticsPanel';
import OverviewPanel from './OverviewPanel';
import ScramblePanel from './ScrambleImagePanel';
import { useTimerStore } from '@/store/timerStore';
import { useSettingsModalStore } from '@/store/SettingsModalStore';
import { useTranslations } from 'next-intl';
import { TimerStatus } from '@/enums/TimerStatus';
import { useMemo } from 'react';
import { TimerMode } from '@/enums/TimerMode';

export default function TimerWidgets() {
  const isSolving = useTimerStore(store => store.isSolving);
  const timerStatus = useTimerStore(store => store.timerStatus);
  const timerStatistics = useTimerStore(store => store.timerStatistics);
  const lastSolve = useTimerStore(store => store.lastSolve);
  const settings = useSettingsModalStore(store => store.settings);
  const t = useTranslations("Index.HomePage");
  const timerMode = useTimerStore(store => store.timerMode);
  const bestAverageAlert = useMemo(() => {
    const { ao5, ao12, ao50, ao100 } = timerStatistics.global;
    const { ao5: sessionAo5, ao12: sessionAo12, ao50: sessionAo50, ao100: sessionAo100 } = timerStatistics.session;

    const newBestAverages = [];
    if (ao5 !== 0 && ao5 === sessionAo5) newBestAverages.push("Ao5");
    if (ao12 !== 0 && ao12 === sessionAo12) newBestAverages.push("Ao12");
    if (ao50 !== 0 && ao50 === sessionAo50) newBestAverages.push("Ao50");
    if (ao100 !== 0 && ao100 === sessionAo100) newBestAverages.push("Ao100");

    if (settings.alerts.bestAverage && newBestAverages.length > 0) {
      return (
        <div className="flex justify-end" id="touch">
          <div className="p-1 text-xs border rounded-md bg-background">
            {t("new_best_average")}: {newBestAverages.join(", ")}
          </div>
        </div>
      );
    }
    return null;
  }, [timerStatistics, settings.alerts.bestAverage, t]);

  const worstTimeAlert = useMemo(() => {
    if (
      settings.alerts.worstTime &&
      timerStatistics.global.count > 1 &&
      lastSolve &&
      lastSolve.time > timerStatistics.global.worst
    ) {
      return (
        <div className="p-1 text-xs border rounded-md bg-background w-fit ms-auto">
          {t("new_worst_time")}
        </div>
      );
    }
    return null;
  }, [settings.alerts.worstTime, timerStatistics.global.count, lastSolve, timerStatistics.global.worst, t]);

  return (
    <>
      <div className={`flex flex-col gap-1 pb-1 ${!(isSolving || timerStatus !== TimerStatus.IDLE) ? "visible" : "invisible"}`} id="touch">
        {!isSolving && bestAverageAlert}
        {!isSolving && worstTimeAlert}
        <div
          className="items-center justify-between w-full text-xs md:text-sm flex"
        >
          {settings.features.sessionStats && !isSolving && <OverviewPanel/>}
          {settings.features.scrambleImage && !isSolving && timerMode !== TimerMode.VIRTUAL && (<ScramblePanel />)}
          {settings.features.sessionStats && !isSolving && <StatisticsPanel />}
        </div>
      </div>
    </>
  );
}
