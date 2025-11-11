import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return NextResponse.json({ error: 'No token' }, { status: 401 });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Access granted', userId: decoded.id });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
