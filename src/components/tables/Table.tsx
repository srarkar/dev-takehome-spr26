import React from "react";
import Dropdown, { DropdownStatus } from "../atoms/Dropdown";

export interface ItemRequest {
  _id?: string;
  id?: string;
  requestorName: string;
  itemRequested: string;
  status: DropdownStatus;
  createdAt?: string;
  lastEditedDate?: string;
}

interface TableProps {
  data: ItemRequest[];
  onStatusChange: (id: string, newStatus: DropdownStatus) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
};

export default function Table({ data, onStatusChange }: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-text">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Item Requested
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm text-gray-400"
                >
                  No item requests found.
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const itemId = item._id || item.id || "";
                const displayDate = formatDate(
                  item.lastEditedDate || item.createdAt
                );

                return (
                  <tr
                    key={itemId}
                    className="transition hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.requestorName}
                    </td>
                    <td className="px-6 py-4">{item.itemRequested}</td>
                    <td className="px-6 py-4 text-gray-500">{displayDate}</td>
                    <td className="px-6 py-4">
                      <Dropdown
                        value={item.status}
                        onChange={(newStatus) =>
                          onStatusChange(itemId, newStatus)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
