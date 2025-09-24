"use client";
import Editor from "@monaco-editor/react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BugPlayIcon, LockKeyholeIcon, PlayIcon } from "lucide-react";

export const languages = [
  {
    language: "javascript",
    version: "15.10.0",
    code: `// JavaScript Boilerplate
function main() {
  console.log("Hello, World!");
}

main();`,
  },
  {
    language: "python",
    version: "3.10.0",
    code: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  },
  {
    language: "java",
    version: "17.0.1",
    code: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    language: "cpp",
    version: "20.0.0",
    code: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
];

const bodyTemplate = {
  language: "js",
  version: "15.10.0",
  files: [
    {
      name: "my_cool_code.js",
      content: "console.log(process.argv)",
    },
  ],
  stdin: "",
  args: ["1", "2", "3"],
  compile_timeout: 10000,
  run_timeout: 3000,
  compile_memory_limit: -1,
  run_memory_limit: -1,
};

const isSubscribed = false; // TODO: fetch this from user session [next-auth]

const CodePage = () => {
  const [lang, setLang] = React.useState<{
    language: string;
    version: string;
    code: string;
  }>(languages[0]);
  const [code, setCode] = React.useState<string>(languages[0].code);
  const [output, setOutput] = React.useState<string>("");

  function handleEditorChange(value: string | undefined, event: any) {
    console.log("here is the current model value:", value);
    setCode(value || "");
    // here is the current value
  }

  function handleEditorValidation(markers: any[]) {
    console.log("onValidate: markers", markers);
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  async function handleRunCode() {
    console.log("Running code...");

    try {
      // use piston api to run code
      // https://piston.rs/
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bodyTemplate,
          language: lang.language,
          version: lang.version,
          files: [{ name: `code.${"user+algo"}`, content: code }],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error running code");
      }
      console.log("Response from piston:", data);
      setOutput(data.run.stdout || data.run.stderr || "No output");
    } catch (error) {
      console.error("Error running code:", error);
    }
  }

  return (
    <div className="grid grid-cols-8 grid-rows-6 gap-4 h-full lg:h-[calc(100dvh-6.2rem)]">
      <div className="chat col-span-full lg:col-span-3 bg-red-500 row-span-full">
        Chat
      </div>
      <div className="w-full col-span-5 row-span-4 lg:flex flex-col hidden">
        <div className="flex flex-row items-center justify-between mb-2">
          <Select
            defaultValue={languages[0].language}
            onValueChange={(value) =>
              setLang(
                languages.find((lang) => lang.language === value) ||
                  languages[0]
              )
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.language} value={lang.language}>
                  {lang.language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Button variant={"outline"}>
              {isSubscribed ? <BugPlayIcon /> : <LockKeyholeIcon />}
            </Button>
            <Button>
              <PlayIcon size={12} strokeWidth={4} className="mr-2" /> Run
            </Button>
          </div>
        </div>
        <div className="bg-[#1e1e1e] py-2 flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={lang.language}
            defaultLanguage={languages[0].language}
            defaultValue={lang.code}
            value={lang.code}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
          />
        </div>
      </div>
      <div className="console bg-red-800 col-span-5 lg:flex hidden row-span-2">
        Console: {output}
      </div>
    </div>
  );
};

export default CodePage;
