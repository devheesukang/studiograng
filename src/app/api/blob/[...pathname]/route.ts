import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 0

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pathname: string[] }> }
) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse('Blob storage is not configured.', { status: 503 })
  }

  const { pathname } = await params
  const blobPathname = pathname.join('/')

  if (!blobPathname.startsWith('uploads/')) {
    return new NextResponse('Not found.', { status: 404 })
  }

  const { get } = await import('@vercel/blob')
  const result = await get(blobPathname, { access: 'private' })

  if (!result || result.statusCode !== 200) {
    return new NextResponse('Not found.', { status: 404 })
  }

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType,
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      ETag: result.blob.etag,
    },
  })
}
