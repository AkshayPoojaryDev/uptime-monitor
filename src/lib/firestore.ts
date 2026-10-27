/**
 * firestore.ts — Firestore data-access layer.
 * Wraps firebase-admin SDK calls so app code never touches the SDK directly.
 */

// TODO: install firebase-admin and initialize here.
// import { initializeApp, cert, getApps } from 'firebase-admin/app';
// import { getFirestore, Timestamp } from 'firebase-admin/firestore';
//
// if (!getApps().length) {
//   initializeApp({
//     credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
//   });
// }
// export const db = getFirestore();

export interface Monitor {
  id: string;
  name: string;
  url: string;
  intervalSeconds: number;
  active: boolean;
  createdAt: Date;
}

export interface CheckRecord {
  monitorId: string;
  url: string;
  status: number | null;
  latencyMs: number;
  ok: boolean;
  checkedAt: Date;
  error?: string;
}

// ── Monitors ──────────────────────────────────────────────────────────────────

export async function listMonitors(): Promise<Monitor[]> {
  // TODO: const snap = await db.collection('monitors').where('active', '==', true).get();
  // return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Monitor));
  return [];
}

export async function getMonitor(id: string): Promise<Monitor | null> {
  // TODO: const doc = await db.collection('monitors').doc(id).get();
  // return doc.exists ? ({ id: doc.id, ...doc.data() } as Monitor) : null;
  return null;
}

export async function createMonitor(
  data: Omit<Monitor, 'id' | 'createdAt'>
): Promise<Monitor> {
  // TODO: const ref = await db.collection('monitors').add({ ...data, createdAt: Timestamp.now() });
  throw new Error('Not implemented');
}

export async function updateMonitor(
  id: string,
  data: Partial<Omit<Monitor, 'id' | 'createdAt'>>
): Promise<void> {
  // TODO: await db.collection('monitors').doc(id).update(data);
}

export async function deleteMonitor(id: string): Promise<void> {
  // TODO: await db.collection('monitors').doc(id).delete();
}

// ── Check Records ─────────────────────────────────────────────────────────────

export async function saveCheckResult(record: CheckRecord): Promise<void> {
  // TODO: await db.collection('checks').add({ ...record, checkedAt: Timestamp.fromDate(record.checkedAt) });
}

export async function getCheckHistory(
  monitorId: string,
  limitN = 100
): Promise<CheckRecord[]> {
  // TODO: query 'checks' collection ordered by checkedAt desc, filtered by monitorId
  return [];
}
