"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check, Globe2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const languages = [
  { value: "en", label: "English", nativeName: "English", flag: "🇺🇸" },
  { value: "es", label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { value: "pt", label: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
];

export default function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [open, setOpen] = useState(false);

  const currentLanguage = languages.find(
    (lang) => lang.value === selectedLanguage
  );

  const handleLanguageSelect = (languageValue: string) => {
    setSelectedLanguage(languageValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="  cursor-pointer ">
          <Languages />
          <span className="text-lg">{currentLanguage?.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="w-[90vw] max-w-xs sm:w-64 sm:max-w-sm md:w-72 md:max-w-md overflow-auto"
      >
        <div className="space-y-1">
          <div className="px-3 py-2 text-sm font-medium  border-b ">
            Select Language
          </div>
          {languages.map((language) => (
            <Button
              variant={"ghost"}
              key={language.value}
              onClick={() => handleLanguageSelect(language.value)}
              className="w-full h-16 flex items-center gap-3 px-3  cursor-pointer text-left  rounded-md transition-colors"
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex-1">
                <div className="font-medium ">{language.label}</div>
                <div className="text-xs font-semibold text-muted-foreground ">
                  {language.nativeName}
                </div>
              </div>
              {selectedLanguage === language.value && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
