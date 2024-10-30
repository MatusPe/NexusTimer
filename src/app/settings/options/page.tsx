"use client";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import ThemeSelect from "@/components/menu-settings/ThemeSelect";
import { MenuSection } from "@/components/menu-settings/MenuSection";
import { MenuOption } from "@/components/menu-settings/MenuOption";
import { DataImportExport } from "@/components/menu-settings/DataImportExport";
import { useTranslations } from "next-intl";
import {
  BellIcon,
  BoxModelIcon,
  ComponentBooleanIcon,
  FileTextIcon,
  LapTimerIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import MenuSelectLanguage from "@/components/menu-settings/MenuSelectLanguage";
import CustomTheme from "@/components/menu-settings/CustomTheme";
import MenuSelectDefaultStartCube from "@/components/menu-settings/MenuSelectDefaultStartCube";
import ImportModal from "@/components/menu-settings/ImportModal";
import AccountHeader from "@/components/account/account-header/account-header";

export default function Page() {
  const { settings } = useSettingsModalStore();
  const t = useTranslations("Index.Settings-menu");
  return (
    <>
      <div className="overflow-y-auto">
        <div className="max-w-md mx-auto bg-background/90 backdrop-blur-lg">
          <AccountHeader back="/settings" label={"Options"} />

          <MenuSelectLanguage />

          <MenuSection icon={<LapTimerIcon />} title={t("timer")}>
            <MenuOption
              setting={settings.timer.inspection}
              label={t("inspection")}
            />
            <MenuOption
              setting={settings.timer.startCue}
              label={t("start-cue")}
            />
            <MenuOption
              setting={settings.timer.holdToStart}
              label={t("hold-to-start")}
            />
            <MenuOption
              setting={settings.timer.manualMode}
              label={t("manual-mode")}
            />
          </MenuSection>

          <MenuSection icon={<MagicWandIcon />} title={t("features")}>
            <MenuOption
              setting={settings.features.scrambleImage}
              label={t("scramble-image")}
            />
            <MenuOption
              setting={settings.features.sessionStats}
              label={t("session-stats")}
            />
            <MenuOption
              setting={settings.features.quickActionButtons}
              label={t("quick-action-buttons")}
            />
            <MenuOption
              setting={settings.features.hideWhileSolving}
              label={t("hide-while-solving")}
            />
            <MenuOption
              setting={settings.features.scrambleBackground}
              label={t("scramble-background")}
            />
          </MenuSection>

          <MenuSection icon={<BellIcon />} title={t("alerts")}>
            <MenuOption
              setting={settings.alerts.bestTime}
              label={t("best-time")}
            />
            <MenuOption
              setting={settings.alerts.bestAverage}
              label={t("best-average")}
            />

            <MenuOption
              setting={settings.alerts.worstTime}
              label={t("worst-time")}
            />
          </MenuSection>

          <MenuSection icon={<ComponentBooleanIcon />} title={t("theme")}>
            <ThemeSelect />
            <CustomTheme />
          </MenuSection>

          <MenuSection icon={<FileTextIcon />} title={t("data")}>
            <DataImportExport />
          </MenuSection>

          <MenuSection icon={<BoxModelIcon />} title={t("preferences")}>
            <MenuSelectDefaultStartCube />
          </MenuSection>
        </div>
      </div>
      <ImportModal />
    </>
  );
}
