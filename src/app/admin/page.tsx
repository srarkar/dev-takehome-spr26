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
    }
}
