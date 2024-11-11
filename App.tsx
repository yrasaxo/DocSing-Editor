import React, { useState } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { FileInfo } from './components/FileInfo';

function App() {
  const [content, setContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('untitled');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleSave = () => {
    const docsingData = {
      metadata: {
        fileName: `${fileName}.docsing`,
        savedAt: new Date().toISOString(),
        version: "1.0"
      },
      content: content
    };

    const blob = new Blob([JSON.stringify(docsingData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.docsing`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setLastSaved(new Date().toLocaleTimeString());
  };

  const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result !== 'string') {
          throw new Error('Failed to read file');
        }

        const docsingData = JSON.parse(result);
        if (!docsingData.content) {
          throw new Error('Invalid .docsing file format');
        }

        setContent(docsingData.content);
        const newFileName = docsingData.metadata?.fileName?.replace('.docsing', '') || file.name.replace('.docsing', '');
        setFileName(newFileName);
        setLastSaved(null);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Ошибка при чтении файла. Убедитесь, что это правильный .docsing файл\nError reading file. Please ensure it is a valid .docsing file');
      }
    };

    reader.onerror = () => {
      alert('Ошибка при чтении файла\nError reading file');
    };

    reader.readAsText(file, 'UTF-8');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header onSave={handleSave} onFileOpen={handleFileOpen} />
        <FileInfo 
          fileName={fileName}
          onFileNameChange={setFileName}
          lastSaved={lastSaved}
        />
        <Editor 
          content={content}
          onChange={setContent}
        />
      </div>
    </div>
  );
}

export default App;
