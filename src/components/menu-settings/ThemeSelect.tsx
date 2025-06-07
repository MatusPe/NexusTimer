import { Themes } from "@/interfaces/types/Themes";
import loadSettings from "@/lib/loadSettings";
import { setSetting } from "@/lib/settingsUtils";
import { useBackgroundImageStore } from "@/store/BackgroundThemeStore";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTheme } from "next-themes";

interface Variation {
  bg: string;
  text: string;
  name: string;
  key: Themes;
}

export default function ThemeSelect() {
  const { settings, setSettings } = useSettingsModalStore();
  const { backgroundImage, deleteBackgroundImage } = useBackgroundImageStore();
  const { setTheme } = useTheme();
  const variation: Variation[] = [
    {
      bg: "bg-neutral-100",
      text: "text-white",
      name: "Light",
      key: "light",
    },
    {
      bg: "bg-zinc-950",
      text: "text-white",
      name: "Dark",
      key: "dark",
    },
  ];

  const handleSelectTheme = (themeKey: "light" | "dark") => {
    setSetting(settings.theme.background.key, themeKey);
    const updatedSettings = loadSettings();
    setSettings(updatedSettings);
    setTheme(themeKey);
  };

  return (
    <div className="flex mx-3 gap-3">
      {variation.map((item) => (
        <div
          key={item.key}
          onClick={() => handleSelectTheme(item.key)}
          className="flex flex-col items-center justify-center"
        >
          <div
            className={`cursor-pointer size-20 rounded-full ${item.bg} ${
              item.key === settings.theme.background.color
                ? "ring"
                : "border border-neutral-400"
            }`}
          ></div>
          <div className="mt-1 text-xs font-medium">{item.name}</div>
        </div>
      ))}
      {backgroundImage && (
        <div
          className="relative cursor-pointer size-20 rounded-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            onClick={deleteBackgroundImage}
            className="absolute top-0 -right-2 w-6 h-6 text-white rounded-xl bg-red-600 text-center align-middle hover:scale-110 transition duration-200 mt-1 me-1"
          >
            X
          </div>
        </div>
      )}
    </div>
  );
}
