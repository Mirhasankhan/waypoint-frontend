"use client";

import { useState } from "react";
import { AssessmentQuestion, AnswerValue } from "../../../types/assessment";
import { COUNTRIES } from "@/utils/countries";

interface QuestionFieldProps {
  question: AssessmentQuestion;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

export function QuestionField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  const label = (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {question.questionText}
      {!question.isOptional && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );

  if (question.isCountry) {
    if (question.inputType === "MULTI_SELECT") {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div>
          {label}
          <CountryMultiSelect selected={selected} onChange={onChange} />
        </div>
      );
    }
    return (
      <div>
        {label}
        <CountrySingleSelect
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      </div>
    );
  }

  switch (question.inputType) {
    case "TEXT":
    case "EMAIL":
      return (
        <div>
          {label}
          <input
            type={question.inputType === "EMAIL" ? "email" : "text"}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-[7px] px-3 py-2 w-full"
          />
          {question.helpText && (
            <p className="text-xs text-gray-400 mt-1">{question.helpText}</p>
          )}
        </div>
      );

    case "NUMBER":
      return (
        <div>
          {label}
          <input
            type="number"
            min={question.minValue ?? undefined}
            max={question.maxValue ?? undefined}
            value={
              value === null || value === undefined ? "" : (value as number)
            }
            onChange={(e) =>
              onChange(e.target.value === "" ? null : Number(e.target.value))
            }
            className="border rounded-[7px] px-3 py-2 w-full"
          />
        </div>
      );

    case "TEXTAREA":
      return (
        <div>
          {label}
          <textarea
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-[7px] px-3 py-2 w-full min-h-[100px]"
          />
        </div>
      );

    case "DATE": {
      const today = new Date().toISOString().split("T")[0];
      return (
        <div>
          {label}
          <input
            type="date"
            value={(value as string) ?? ""}
            max={question.dateNotAllowed === "future" ? today : undefined}
            min={question.dateNotAllowed === "past" ? today : undefined}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-[7px] px-3 py-2 w-full"
          />
        </div>
      );
    }

    case "SELECT":
      return (
        <div>
          {label}
          <select
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-[7px] px-3 py-2 w-full bg-white"
          >
            <option value="" disabled>
              Select an option
            </option>
            {question.options.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
        <div>
          {label}
          <div className="flex flex-wrap gap-2">
            {question.options.map((opt) => {
              const active = selected.includes(opt.value);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggle(opt.value)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    active
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case "BOOLEAN":
      return (
        <div>
          {label}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange(true)}
              className={`px-6 py-2 rounded-[7px] font-medium ${value === true ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onChange(false)}
              className={`px-6 py-2 rounded-[7px] font-medium ${value === false ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"}`}
            >
              No
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
}

function CountrySingleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative">
      <input
        className="border rounded-[7px] px-3 py-2 w-full"
        value={open ? query : value}
        placeholder="Search country"
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
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = COUNTRIES.filter(
    (c) =>
      c.toLowerCase().includes(query.toLowerCase()) && !selected.includes(c),
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-1 border rounded-[7px] px-2 py-1.5">
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
          placeholder="Add country"
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
