import { useRef, useState, useEffect } from "react";
import { TimerStatus } from "@/enums/TimerStatus";

interface UseInspectionProps {
  setTimerStatus: (status: TimerStatus) => void;
  setSolvingTime: (time: number) => void;
  settings: any;
}

export default function useInspection({
  setTimerStatus,
  setSolvingTime,
  settings
}: UseInspectionProps) {

  const inspectionDuration = Number(settings.timer.inspectionTime || 15000);
  const startInspectionTime = useRef<number | null>(null);
  const inspectionId = useRef<any>(null);
  const [inspectionTime, setInspectionTime] = useState<number>(inspectionDuration / 1000);

  const startInspection = () => {
    startInspectionTime.current = Date.now() - 1;
    setTimerStatus(TimerStatus.INSPECTING);
    let reproduced8 = false;
    let reproduced12 = false;
    inspectionId.current = setInterval(() => {
      if (startInspectionTime.current) {
        const now = Date.now();
        const difference = inspectionDuration - (now - startInspectionTime.current);

        const timeRemaining = difference / 1000;

        if (settings.timer.startCue) {
          if (timeRemaining <= 8 && !reproduced8) {
            reproduced8 = true;
            const audio8 = new Audio("/sounds/en/8.wav");
            audio8.play();
          }

          if (timeRemaining <= 12 && !reproduced12) {
            reproduced12 = true;
            const audio12 = new Audio("/sounds/en/12.wav");
            audio12.play();
          }
        }

        setInspectionTime(timeRemaining);
        if (difference <= 0) {
          setTimerStatus(TimerStatus.IDLE);
          setSolvingTime(0);
          removeInspection();
          const audio = new Audio("/sounds/en/reset.wav");
          audio.play();
        }
      }
    }, 10);
  };

  const removeInspection = () => {
    startInspectionTime.current = null;
    clearInterval(inspectionId.current);
    inspectionId.current = null;
    setInspectionTime(inspectionDuration / 1000);
  };

  useEffect(() => {
    return () => {
      if (inspectionId.current) {
        clearInterval(inspectionId.current);
        inspectionId.current = null;
      }
    };
  }, []);

  return {
    inspectionTime,
    startInspection,
    removeInspection,
    inspectionId,
    startInspectionTime,
    inspectionDuration,
  };
}
