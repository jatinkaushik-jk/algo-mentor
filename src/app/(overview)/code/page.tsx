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

export const languages = [
  {
    language: "javascript",
    code: `// JavaScript Boilerplate
function main() {
  console.log("Hello, World!");
}

main();`,
  },
  {
    language: "python",
    code: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  },
  {
    language: "java",
    code: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    language: "cpp",
    code: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
];

const CodePage = () => {
  const [lang, setLang] = React.useState<{ language: string; code: string }>(
    languages[0]
  );
  function handleEditorChange(value: string | undefined, event: any) {
    console.log("here is the current model value:", value);
    // here is the current value
  }

  function handleEditorValidation(markers: any[]) {
    console.log("onValidate: markers", markers);
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <div className="w-full h-96">
      <div>
        <Select
          defaultValue={languages[0].language}
          onValueChange={(value) =>
            setLang(
              languages.find((lang) => lang.language === value) || languages[0]
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
      </div>
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
  );
};

export default CodePage;
