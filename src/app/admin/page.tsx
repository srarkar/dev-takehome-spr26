"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import { useEffect, useState } from "react";
import Table, { ItemRequest } from "@/components/tables/Table";
import { DropdownStatus } from "@/components/atoms/Dropdown";

/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default function ItemRequestsPage() {
  const [requests, setRequests] = useState<ItemRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchRequests = async () => {
    try {
      setError(null);
      const response = await fetch("/api/requests");

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setRequests(data);
      } else if (data && Array.isArray(data.data)) {
        setRequests(data.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      setError("Loading item requests failed.");
      setRequests([]);
    } finally {
      setLoading(false);
    }

    useEffect(() => { fetchRequests(); }, []);

    // update backend status
    const handleStatusUpdate = async(id: string, newStatus: DropdownStatus) => {
      if (!id) return;

      const prevRequests = [...requests];
      
      setRequests((prevRequests) =>
      prevRequests.map((item) => {
        const itemId = item._id ?? item.id;

        if (itemId === id) {
          return { ...item, status: newStatus };
        }

        return item;
        })
      );

      try {
        const response = await fetch("/api/requests", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({ id, status: newStatus, }),
        });
        
        if (!response.ok) {
          throw new Error("PATCH failed");
        }
      } catch (err: unknown) {
        setRequests(prevRequests); // go back to old state if error
      }
    };
    return (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col items-center gap-6 px-4">
      <h2 className="text-2xl font-bold text-gray-900">Item Requests</h2>

      {error && (
        <div className="w-full p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading requests...</p>
      ) : (
        <Table data={requests} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
