import clientPromise from "@/lib/mongodb";
import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const requestorName = body?.requestorName?.trim();
    const itemRequested = body?.itemRequested?.trim();

    // Field Length Validation
    if (
      !requestorName ||
      requestorName.length < 3 ||
      requestorName.length > 30 ||
      !itemRequested ||
      itemRequested.length < 2 ||
      itemRequested.length > 100
    ) {
      throw new InputException("Invalid name or item length requirements.");
    }

    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const newRequest = {
      requestorName,
      itemRequested,
      status: "pending",
      createdAt: now,
      lastEditedDate: now,
    };

    const result = await db.collection("requests").insertOne(newRequest);

    return new Response(
      JSON.stringify({ _id: result.insertedId, ...newRequest }),
      {
        status: HTTP_STATUS_CODE.CREATED,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");

    const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;
    const pageSize = typeof PAGINATION_PAGE_SIZE === "number" ? PAGINATION_PAGE_SIZE : 10;

    const client = await clientPromise;
    const db = client.db();

    const requests = await db
      .collection("requests")
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return new Response(JSON.stringify(requests), {
      status: HTTP_STATUS_CODE.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}