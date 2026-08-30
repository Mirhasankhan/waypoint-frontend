"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AssessmentQuestion, AnswerValue } from "@/types/assessment";
import { COUNTRIES } from "@/utils/countries";

interface QuestionFieldProps {
  question: AssessmentQuestion;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  error?: string;
  className?: string;
}

export function QuestionField({
  question,
  value,
  onChange,
  error,
  className,
}: QuestionFieldProps) {
  const containerClass =
    className ??
    (question.inputType === "MULTI_SELECT" || question.inputType === "TEXTAREA"
      ? "md:col-span-2"
      : "");
  const placeholder = question.label ?? undefined;
  const label = (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {question.questionText}
      {question.helpText && (
        <span className="relative inline-flex align-middle ml-1.5 group">
          <button
            type="button"
            aria-label="More information"
            className="text-emerald-600 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
          >
            <Info className="w-4 h-4" aria-hidden="true" />
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-72 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-left text-xs font-normal leading-relaxed text-white shadow-xl group-hover:block group-focus-within:block"
          >
            {question.helpText}
          </span>
        </span>
      )}
      {!question.isOptional ? (
        <span className="text-red-500 ml-0.5">*</span>
      ) : (
        <span className="text-gray-400 text-xs ml-1">(optional)</span>
      )}
    </label>
  );

  const errorText = error ? (
    <p className="text-xs text-red-500 mt-1">{error}</p>
  ) : null;
  const inputBorder = error
    ? "border-red-400 focus:border-red-500"
    : "border-gray-300";

  if (question.isCountry) {
    if (question.inputType === "MULTI_SELECT") {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className={containerClass}>
          {label}
          <CountryMultiSelect
            selected={selected}
            onChange={onChange}
            hasError={!!error}
            placeholder={placeholder ?? "Add country"}
          />
          {errorText}
        </div>
      );
    }
    return (
      <div className={containerClass}>
        {label}
        <CountrySingleSelect
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          hasError={!!error}
          placeholder={placeholder ?? "Search country"}
        />
        {errorText}
      </div>
    );
  }

  switch (question.inputType) {
    case "TEXT":
    case "EMAIL":
      return (
        <div className={containerClass}>
          {label}
          <input
            type={question.inputType === "EMAIL" ? "email" : "text"}
            value={(value as string) ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded-[7px] px-3 py-2 w-full ${inputBorder}`}
          />
          {errorText}
        </div>
      );

    case "NUMBER":
      return (
        <div className={containerClass}>
          {label}
          <input
            type="number"
            min={question.minValue ?? undefined}
            max={question.maxValue ?? undefined}
            value={
              value === null || value === undefined ? "" : (value as number)
            }
            placeholder={placeholder}
            onChange={(e) =>
              onChange(e.target.value === "" ? null : Number(e.target.value))
            }
            className={`border rounded-[7px] px-3 py-2 w-full ${inputBorder}`}
          />
          {errorText}
        </div>
      );

    case "TEXTAREA":
      return (
        <div className={containerClass}>
          {label}
          <textarea
            value={(value as string) ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded-[7px] px-3 py-2 w-full min-h-[100px] ${inputBorder}`}
          />
          {errorText}
        </div>
      );

    case "DATE": {
      const today = new Date().toISOString().split("T")[0];
      return (
        <div className={containerClass}>
          {label}
          <input
            type="date"
            value={(value as string) ?? ""}
            placeholder={placeholder}
            max={question.dateNotAllowed === "future" ? today : undefined}
            min={question.dateNotAllowed === "past" ? today : undefined}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded-[7px] px-3 py-2 w-full ${inputBorder}`}
          />
          {errorText}
        </div>
      );
    }

    case "SELECT":
      return (
        <div className={containerClass}>
          {label}
          <select
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded-[7px] px-3 py-2 w-full bg-white ${inputBorder}`}
          >
            <option value="" disabled>
              {placeholder ?? "Select an option"}
            </option>
            {question.options.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errorText}
        </div>
      );

    case "MULTI_SELECT": {
      const selected = Array.isArray(value) ? value : [];
      const toggle = (val: string) =>
        onChange(
          selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val],
        );
      return (
        <div className={containerClass}>
          {label}
          <p className="text-gray-500 text-xs mb-3">Please select all the applicable options.</p>
          <div
            className={`flex flex-wrap gap-2 ${error ? "p-2 border border-red-400 rounded-[7px]" : ""}`}
          >           
            {question.options.map((opt) => {
              const active = selected.includes(opt.value);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggle(opt.value)}
                  className={`px-4 py-2 font-medium rounded-[7px] border text-sm ${active
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700 border-gray-300"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {errorText}
        </div>
      );
    }

    case "BOOLEAN":
      return (
        <div className={containerClass}>
          {label}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange(true)}
              className={`px-8 py-1.5 rounded-[7px] font-medium ${value === true
                  ? "bg-emerald-600 text-white"
                  : `bg-gray-100 text-gray-400 ${error ? "ring-1 ring-red-400" : ""}`
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onChange(false)}
              className={`px-8 py-1.5 rounded-[7px] font-medium ${value === false
                  ? "bg-emerald-600 text-white"
                  : `bg-gray-100 text-gray-400 ${error ? "ring-1 ring-red-400" : ""}`
                }`}
            >
              No
            </button>
          </div>
          {errorText}
        </div>
      );

    default:
      return null;
  }
}

function CountrySingleSelect({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative">
      <input
        className={`border rounded-[7px] px-3 py-2 w-full ${hasError ? "border-red-400" : "border-gray-300"}`}
        value={open ? query : value}
        placeholder={"Search country"}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && (
        <ul className="absolute z-10 bg-white border rounded-[7px] mt-1 max-h-56 overflow-auto w-full shadow">
          {filtered.map((c) => (
            <li
              key={c}
              onMouseDown={() => {
                onChange(c);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CountryMultiSelect({
  selected,
  onChange,
  hasError,
  placeholder,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
  hasError?: boolean;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = COUNTRIES.filter(
    (c) =>
      c.toLowerCase().includes(query.toLowerCase()) && !selected.includes(c),
  );

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap gap-1 border rounded-[7px] px-2 py-1.5 ${hasError ? "border-red-400" : "border-gray-300"}`}
      >
        {selected.map((c) => (
          <span
            key={c}
            className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
          >
            {c}
            <button
              type="button"
              onClick={() => onChange(selected.filter((s) => s !== c))}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[100px] outline-none text-sm py-1"
          value={query}
          placeholder={placeholder ?? "Add country"}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
      </div>
      {open && (
        <ul className="absolute z-10 bg-white border rounded-[7px] mt-1 max-h-56 overflow-auto w-full shadow">
          {filtered.map((c) => (
            <li
              key={c}
              onMouseDown={() => {
                onChange([...selected, c]);
                setQuery("");
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
