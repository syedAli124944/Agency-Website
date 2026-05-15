
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahklkvtxeawmddyqepzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2xrdnR4ZWF3bWRkeXFlcHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODIwMTYsImV4cCI6MjA5NDI1ODAxNn0.8A-5i2ecv0_5yXUTOqeBGyqDc_E7b0TgKRh8puCqnBQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function audit() {
    console.log('--- DATABASE AUDIT START ---');
    const { data, error } = await supabase.from('blog_posts').select('id, title, content, excerpt');
    if (error) {
        console.error('Audit Error:', error);
        return;
    }
    console.log(`Total Posts: ${data.length}`);
    data.forEach(p => {
        console.log(`\nID: ${p.id}`);
        console.log(`Title: ${p.title}`);
        console.log(`Content Type: ${typeof p.content}`);
        console.log(`Content Length (if string): ${typeof p.content === 'string' ? p.content.length : 'N/A'}`);
        console.log(`Content Preview: ${JSON.stringify(p.content).substring(0, 100)}...`);
    });
    console.log('\n--- DATABASE AUDIT END ---');
}

audit();
