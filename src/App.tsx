import { useState } from "react";
import XMLViewer from "react-xml-viewer";
import { type Theme } from "react-xml-viewer/dist/components/types";
import { FontSizeSelector } from "./components/FontSizeSelector";
import clsx from "clsx";

const customTheme: Theme = {};

export function App() {
  const [xmlString, setXmlString] = useState("");
  const [fontSizeClass, setFontSizeClass] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setXmlString(reader.result as string);
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 bg-sky-600 text-white flex-shrink-0 flex flex-row px-4 py-2 place-items-center">
        <h1 className="text-xl">XML Viewer - Secure, private, fast</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-grow overflow-hidden bg-slate-300">
        <div className="p-4 flex flex-col overflow-hidden gap-2">
          <p className="text-center">Upload the .XML file</p>
          <div className="flex flex-col gap-1">
            <label htmlFor="xmlUpload">Select XML file</label>
            <input
              id="xmlUpload"
              className="flex-shrink-0 bg-white
              flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              type="file"
              accept=".xml"
              onChange={handleFileUpload}
            />
          </div>
          <p className="text-center">Or paste the XML content</p>
          <textarea value={xmlString} className="flex-grow" onChange={(e) => setXmlString(e.target.value)} />
        </div>
        <div className="flex flex-col p-4 overflow-y-auto bg-white">
          {xmlString.length ? (
            <div className="flex flex-col">
              <FontSizeSelector
                onFontChange={(fontSizeClass) => {
                  setFontSizeClass(fontSizeClass);
                }}
              />
              <div className={clsx(fontSizeClass || "text-base")}>
                <XMLViewer
                  xml={xmlString}
                  collapsible
                  theme={customTheme}
                  indentSize={8}
                  initialCollapsedDepth={1}
                  invalidXml={
                    <div className="flex flex-col items-center justify-center flex-grow text-red-600">
                      <p>The XML is invalid</p>
                    </div>
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow">
              <p>Upload a XML to explore its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
