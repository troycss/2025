import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FetchRequest {
  contentType: 'classes' | 'spells' | 'monsters' | 'items' | 'species' | 'backgrounds' | 'feats' | 'rules';
  url?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { contentType, url }: FetchRequest = await req.json();

    // Update sync status
    await supabase
      .from('dnd_content_sync')
      .upsert({
        content_type: contentType,
        status: 'syncing',
        last_synced: new Date().toISOString()
      }, { onConflict: 'content_type' });

    const targetUrl = url || `https://www.dndbeyond.com/sources/dnd/br-2024/${contentType}`;
    
    // Fetch content from D&D Beyond
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from D&D Beyond: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse and store content based on type
    const parsed = await parseContent(contentType, html, targetUrl);
    
    // Store in database
    const tableName = `dnd_${contentType}`;
    const { error: insertError } = await supabase
      .from(tableName)
      .upsert(parsed, { onConflict: 'name' });

    if (insertError) {
      throw insertError;
    }

    // Update sync status to completed
    await supabase
      .from('dnd_content_sync')
      .update({
        status: 'completed',
        error_message: null,
        updated_at: new Date().toISOString()
      })
      .eq('content_type', contentType);

    return new Response(
      JSON.stringify({ 
        success: true, 
        contentType,
        itemsProcessed: Array.isArray(parsed) ? parsed.length : 1
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error syncing content:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

function parseContent(contentType: string, html: string, sourceUrl: string): any {
  // This is a simplified parser - in production you'd use a proper HTML parser
  // For now, we'll return placeholder data structure
  
  const timestamp = new Date().toISOString();
  
  switch (contentType) {
    case 'classes':
      return {
        name: 'Placeholder Class',
        description: 'This content will be populated from D&D Beyond',
        source_url: sourceUrl,
        content: html.substring(0, 5000), // Store first 5000 chars
        created_at: timestamp,
        updated_at: timestamp
      };
    
    case 'spells':
      return {
        name: 'Placeholder Spell',
        level: 0,
        school: 'Evocation',
        casting_time: '1 action',
        range: '60 feet',
        components: ['V', 'S'],
        duration: 'Instantaneous',
        description: 'This content will be populated from D&D Beyond',
        classes: ['Wizard'],
        source_url: sourceUrl,
        created_at: timestamp,
        updated_at: timestamp
      };
    
    default:
      return {
        name: 'Placeholder Content',
        description: 'This content will be populated from D&D Beyond',
        source_url: sourceUrl,
        created_at: timestamp,
        updated_at: timestamp
      };
  }
}