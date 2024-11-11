import React from 'react';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-orange-500/20">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[60vh] bg-transparent border-none resize-none focus:outline-none font-mono text-orange-50 placeholder-orange-500/30"
        placeholder="Начните писать здесь... / Start writing here..."
      />
    </div>
  );
}
