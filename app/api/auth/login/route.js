import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    // console.log('check2', email, password);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
    }

    // const token = generateToken(user._id.toString());
    const { _id, username,isAdmin } = user;

    return NextResponse.json({ message: 'Login successfully',  _id, username ,isAdmin});
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
