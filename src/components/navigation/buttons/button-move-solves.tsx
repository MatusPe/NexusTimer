import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSolveFiltersStore } from "@/store/SolvesFilters";
import { EnterIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export default function ButtonMoveSolves() {
  const { handleChangeIsOpenMoveSolvesDialog } = useSolveFiltersStore();
  const t = useTranslations("Index");
  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className={"size-7 m-auto"}
              onClick={() => handleChangeIsOpenMoveSolvesDialog()}
            >
              <EnterIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("SolvesPage.tooltips.move-to-history")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
