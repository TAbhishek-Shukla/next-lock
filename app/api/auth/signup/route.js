import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();
  console.log(`signup route is called at least`);
  
  const { username, email, phone, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
   console.log('data got signup route handler',username, email, phone, password);
   
  try {
    const newUser = await User.create({ username, email, phone, password: hashed });
    return NextResponse.json({ message: 'User Successfully Signup',_id: newUser._id,
    username: newUser.username,});
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'User already exists or invalid data' }, { status: 400 });
  }
}
