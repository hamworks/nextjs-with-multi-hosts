import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { hostname } = new URL('https://' + req.headers.get('host'))
  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (url.pathname.includes(`/_sites`)) {
    return new Response(null, { status: 404 })
  }
  const site = url.searchParams.get('site') || hostname;
  if (
    !url.pathname.includes('.') && // exclude all files in the public folder
    !url.pathname.startsWith('/api') // exclude all API routes
  ) {
    url.pathname = `/_sites/${site}`
    return NextResponse.rewrite(url)
  }
}