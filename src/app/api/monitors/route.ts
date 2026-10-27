import { NextRequest, NextResponse } from 'next/server';

// GET /api/monitors — list all monitors
export async function GET(_req: NextRequest) {
  // TODO: fetch from Firestore via lib/firestore.ts
  return NextResponse.json({ monitors: [] });
}

// POST /api/monitors — create a monitor
export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: validate body, write to Firestore
  return NextResponse.json({ monitor: body }, { status: 201 });
}

// PUT /api/monitors?id=... — update a monitor
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const body = await req.json();
  // TODO: update in Firestore
  return NextResponse.json({ id, ...body });
}

// DELETE /api/monitors?id=... — delete a monitor
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  // TODO: delete from Firestore
  return NextResponse.json({ deleted: id });
}
