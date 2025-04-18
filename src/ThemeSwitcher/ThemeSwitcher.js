import React, { useRef, useState, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import i18next from "i18next";

export const ThemeSwitcher = () => {
  const [iconClassName, setIconClassName] = useState("pi-moon");
  const [language, setLanguage] = useState(i18next.language);
  const menu = useRef(null);

  let items = [
    {
      label: "English",
      icon: "fi fi-gb",
      command: () => {
        i18next.changeLanguage("en");
      },
    },
    {
      label: "Français",
      icon: "fi fi-fr",
      command: () => {
        i18next.changeLanguage("fr");
      },
    },
    {
      label: "العربية",
      icon: "fi fi-sa",
      command: () => {
        i18next.changeLanguage("ar");
      },
    },
  ];

  const onThemeToggler = () => {
    const root = document.getElementsByTagName("html")[0];

    root.classList.toggle("dark");
    setIconClassName((prevClassName) =>
      prevClassName === "pi-moon" ? "pi-sun" : "pi-moon"
    );
  };

  const handleLanguageChange = () => {
    setLanguage(i18next.language);
  };

  useEffect(() => {
    // Set the direction based on the language
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    // Listen for language change event
    i18next.on("languageChanged", handleLanguageChange);

    // Cleanup event listener on component unmount
    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []); // Empty dependency array to run the effect only once during component mount
  console.log(language, document.documentElement.dir);

  return (
    <div className="card flex justify-end mb-4 bg-red-400 gap-3">
      <Menu model={items} popup ref={menu} className="p-0" />
      <Button
        icon="pi pi-globe"
        rounded
        aria-label="Filter"
        onClick={(e) => menu.current.toggle(e)}
      />
      <Button
        icon={`pi ${iconClassName}`}
        severity="danger"
        rounded
        aria-label="Filter"
        onClick={onThemeToggler}
      />
    </div>
  );
};
