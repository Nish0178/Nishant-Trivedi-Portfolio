import { NextResponse } from "next/server";
import { getUnifiedProjects, CACHE_REVALIDATION_SECONDS } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { projects, source, error } = await getUnifiedProjects();

    return NextResponse.json(
      {
        success: true,
        source,
        count: projects.length,
        timestamp: new Date().toISOString(),
        error: error || null,
        projects,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_REVALIDATION_SECONDS}, stale-while-revalidate=${CACHE_REVALIDATION_SECONDS * 2}`,
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
