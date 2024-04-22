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
import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { languages } from "@/config/languages";
import CodeSnippets from "./code-snippets";
import { CodeSnippetType, EditorPageData } from "@/types";
import { TestContextProvider } from "./test-context";

// receives the initial data from the server
export default function EditorForm({
  initialData,
}: {
  initialData: EditorPageData | null;
}) {
  // memoized intial data
  const memoizedIntialData = useMemo(() => initialData?.codeSnippets || [], []);
  // for tracking saved and unsaved changes
  const [configChangesMade, setConfigChangesMade] = React.useState(false);
  // for title and description
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [description, setDescription] = React.useState(
    initialData?.description || ""
  );
  // for language and framework selection
  const [value, setValue] = React.useState(initialData?.language || ""); // value refers to the selected language
  const [frameworkValue, setFrameworkValue] = React.useState(
    initialData?.framework || ""
  ); // value refers to the selected framework
  // open states for the popovers
  const [languageOpen, setLanguageOpen] = React.useState(false); // for the tooltip
  const [frameworkOpen, setFrameworkOpen] = React.useState(false); // for the tooltip
  // current array of frameworks based on the language selected
  const currentFrameworkArray = languages.find(
    (language) => language.value === value
  )?.frameworks;

  useEffect(() => {
    console.log("outer use effect");
    // console.log(
    //   {
    //     title,
    //     description,
    //     language: value,
    //     framework: frameworkValue,
    //   },
    //   "intial Data",
    //   {
    //     title: initialData?.title,
    //     description: initialData?.description,
    //     language: initialData?.language,
    //     framework: initialData?.framework,
    //   }
    // );
    console.log(
      JSON.stringify({
        title,
        description,
        language: value,
        framework: frameworkValue,
      }) !==
        JSON.stringify({
          title: initialData?.title,
          description: initialData?.description,
          language: initialData?.language,
          framework: initialData?.framework,
        })
    );
    if (
      JSON.stringify({
        title,
        description,
        language: value,
        framework: frameworkValue,
      }) !==
      JSON.stringify({
        title: initialData?.title,
        description: initialData?.description,
        language: initialData?.language,
        framework: initialData?.framework,
      })
    ) {
      setConfigChangesMade(true);
    } else {
      setConfigChangesMade(false);
    }
  }, [title, description, value, frameworkValue]);

  return (
    <>
      {" "}
      {configChangesMade && <h1>Unsaved Changes</h1>}
      <div className="space-y-2">
        <Label htmlFor="title" className="inline text-lg">
          Title
        </Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder="Title for your snippet goes here ..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="inline text-lg">
          Description
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      <TestContextProvider>
        <CodeSnippets
          initialCodeSnippets={memoizedIntialData}
          // setConfigChangesMade={setConfigChangesMade}
          key={value}
          language={value}
          framework={frameworkValue}
        />
      </TestContextProvider>
    </>
  );
}
