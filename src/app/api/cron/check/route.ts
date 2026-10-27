import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/cron/check
 * Invoked by the GitHub Actions scheduler (check.yml) every minute.
 * Iterates all active monitors and runs HTTP checks via lib/checker.ts.
 */
export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorized invocations
  const secret = req.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: import { runChecks } from '@/lib/checker';
  // await runChecks();

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
