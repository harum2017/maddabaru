import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verify the token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth verification error:', authError)
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get request body
    const { name, avatarUrl } = await req.json()

    // Validate input
    if (!name || typeof name !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Nama harus diisi' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Sanitize name
    const sanitizedName = name.trim().substring(0, 255)
    if (sanitizedName.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Nama minimal 2 karakter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate name format (only letters, spaces, and common punctuation)
    const nameRegex = /^[a-zA-Z\s\.\,\'\-]+$/
    if (!nameRegex.test(sanitizedName)) {
      return new Response(
        JSON.stringify({ error: 'Nama hanya boleh mengandung huruf, spasi, dan tanda baca umum' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare update data
    const updateData: { name: string; avatar_url?: string } = {
      name: sanitizedName
    }

    // Validate avatarUrl if provided
    if (avatarUrl !== undefined && avatarUrl !== null) {
      if (typeof avatarUrl === 'string' && avatarUrl.length > 0) {
        // Validate URL format
        try {
          const url = new URL(avatarUrl)
          if (!['http:', 'https:'].includes(url.protocol)) {
            return new Response(
              JSON.stringify({ error: 'URL avatar tidak valid' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
          updateData.avatar_url = avatarUrl
        } catch {
          return new Response(
            JSON.stringify({ error: 'URL avatar tidak valid' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      } else if (avatarUrl === '' || avatarUrl === null) {
        // Allow clearing the avatar
        updateData.avatar_url = null as unknown as string
      }
    }

    // Update profile in database
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Profile update error:', updateError)
      return new Response(
        JSON.stringify({ error: 'Gagal mengupdate profil: ' + updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Also update user metadata in auth
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: { name: sanitizedName }
    })

    console.log('Profile updated successfully for user:', user.email)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Profil berhasil diperbarui',
        data: updateData
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Terjadi kesalahan server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
