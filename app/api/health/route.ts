import { NextResponse } from 'next/server';

interface HealthResponse {
  status: 'healthy';
  timestamp: string;
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const response: HealthResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}