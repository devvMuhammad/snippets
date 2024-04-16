"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { languages } from "@/config/languages";
import CodeSnippets from "./code-snippets";

export default function EditorForm() {
  // for language
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // for framework
  const [frameworkOpen, setFrameworkOpen] = React.useState(false);
  const [frameworkValue, setFrameworkValue] = React.useState("");
  // current framework array based on the language selected
  const currentFrameworkArray = languages.find(
    (language) => language.value === value
  )?.frameworks;
  // for snippets

  return (
    <>
      {" "}
      <div className="space-y-2">
        <Label htmlFor="title" className="inline text-lg">
          Title
        </Label>
        <Input id="title" placeholder="Title for your snippet goes here ..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="inline text-lg">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Description for your snippet goes here ..."
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="inline text-lg">Language</Label>
        <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
          <PopoverTrigger className="min-w-[150px]" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={languageOpen}
              className="justify-between"
            >
              {value
                ? languages.find((language) => language.value === value)?.label
                : "Select language..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      key={language.value}
                      value={language.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setFrameworkValue("");
                        setLanguageOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === language.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {language.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {currentFrameworkArray && (
        <div className="flex items-center gap-2">
          <Label className="inline text-lg">Framework</Label>
          <Popover open={frameworkOpen} onOpenChange={setFrameworkOpen}>
            <PopoverTrigger className="min-w-[150px]" asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={frameworkOpen}
                className="justify-between"
              >
                {frameworkValue || "Select framework..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {currentFrameworkArray.map((framework) => (
                      <CommandItem
                        key={framework}
                        value={framework}
                        onSelect={(currentFrameworkArray) => {
                          setFrameworkValue(
                            currentFrameworkArray === value
                              ? ""
                              : currentFrameworkArray
                          );
                          setFrameworkOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            framework === frameworkValue
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}{" "}
      <CodeSnippets key={value} language={value} framework={frameworkValue} />
    </>
  );
}
