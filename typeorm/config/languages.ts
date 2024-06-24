const frameworks = {
  javascript: ["react", "vue", "angular"],
  typescript: ["react", "nestjs"],
  golang: ["gin", "echo"],
  cpp: ["qt", "boost"],
  c: ["gtk", "libuv"],
};

export const validLanguages = Object.keys(frameworks);
export const validFrameworks = (language: string) =>
  frameworks[language as keyof typeof frameworks];
