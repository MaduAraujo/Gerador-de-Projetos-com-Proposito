
import React from 'react';

interface InputAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ id, label, value, onChange, placeholder, disabled }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold text-gray-300">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none disabled:opacity-50"
      />
    </div>
  );
};
