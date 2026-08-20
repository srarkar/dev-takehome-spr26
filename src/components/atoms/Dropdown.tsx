import React from "react";

type DropdownStatus = "pending" | "approved" | "rejected" | "completed";

interface DropdownProps {
	value: DropdownStatus;
	onChange: (newStatus: DropdownStatus) => void;
	label?: string; // text that will render above it
}

interface StatusStyle {
	badge: string; // used for bg color
	dot: string;   // used for indicator dot
}

const statusStyles: Record<DropdownStatus, StatusStyle> = {
  pending: {
    badge: "bg-amber-50 border-amber-200 text-amber-700",
    dot: "bg-amber-500",
  },
  approved: {
    badge: "bg-green-50 border-green-200 text-green-700",
    dot: "bg-green-500",
  },
  completed: {
    badge: "bg-teal-50 border-teal-200 text-teal-700",
    dot: "bg-teal-500",
  },
  rejected: {
    badge: "bg-rose-50 border-rose-200 text-rose-700",
    dot: "bg-rose-500",
  },
};

export default function Dropdown( { value = "pending", onChange, label,}: DropdownProps) {
	const currentStyle = statusStyles[value] || statusStyles.pending;

  return (
    <div>
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <div
        className={`relative inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border transition ${currentStyle.badge}`}
      >
        <span className={`h-2 w-2 rounded-full ${currentStyle.dot}`} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as DropdownStatus)}
          className="bg-transparent border-none p-0 pr-4 text-xs font-medium focus:outline-none cursor-pointer appearance-none capitalize"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
        <svg
          className="w-3 h-3 pointer-events-none absolute right-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  ); 
}
