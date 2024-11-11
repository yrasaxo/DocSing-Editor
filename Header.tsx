import React from 'react';

interface FileInfoProps {
  fileName: string;
  onFileNameChange: (name: string) => void;
  lastSaved: string | null;
}

export function FileInfo({ fileName, onFileNameChange, lastSaved }: FileInfoProps) {
  return (
    <div className="mb-4 flex items-center gap-4 bg-gray-900 p-4 rounded-lg border border-orange-500/20">
      <input
        type="text"
        value={fileName}
        onChange={(e) => onFileNameChange(e.target.value)}
        className="bg-black border border-orange-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition-colors text-orange-100"
        placeholder="Название файла / File name"
      />
      {lastSaved && (
        <span className="text-orange-500/70">
          Сохранено в / Saved at: {lastSaved}
        </span>
      )}
    </div>
  );
}
