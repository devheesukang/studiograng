import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_session')?.value
  if (!token) return false
  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}
