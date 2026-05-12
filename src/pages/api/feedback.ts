import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

interface ValidationError {
  field: string;
  message: string;
}

function validateFeedback(data: {
  name?: string;
  phone?: string;
  type?: string;
  message?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Nama harus diisi minimal 2 karakter' });
  }

  if (!data.type || !['aduan', 'saran'].includes(data.type)) {
    errors.push({ field: 'type', message: 'Jenis feedback harus "aduan" atau "saran"' });
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Pesan harus diisi minimal 10 karakter' });
  }

  if (data.phone && data.phone.trim().length < 8) {
    errors.push({ field: 'phone', message: 'Nomor telepon minimal 8 digit' });
  }

  return errors;
}

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const validationErrors = validateFeedback(body);
    if (validationErrors.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('feedback')
      .insert([{
        name: body.name.trim(),
        phone: body.phone?.trim() || '',
        type: body.type,
        category: body.category || '',
        message: body.message.trim()
      }])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      success: true,
      message: 'Feedback berhasil dikirim',
      id: data?.id
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Gagal mengirim feedback. Silakan coba lagi.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id } = body;

    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
