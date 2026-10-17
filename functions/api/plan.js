export async function onRequestGet(context) {
  try {
    const { env } = context;
    if (!env.PLAN_KV) {
      return new Response(JSON.stringify({ error: 'PLAN_KV binding mangler i Cloudflare Pages' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      });
    }
    const data = await env.PLAN_KV.get('current_plan', 'json');
    return new Response(JSON.stringify(data || null), {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    if (!env.PLAN_KV) {
      return new Response(JSON.stringify({ error: 'PLAN_KV binding mangler i Cloudflare Pages' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      });
    }

    const pin = request.headers.get('X-Admin-Pin');
    const expectedPin = env.ADMIN_PIN || '7676';
    if (pin !== expectedPin) {
      return new Response(JSON.stringify({ error: 'Ugyldig PIN-kode for redigering' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      });
    }

    const body = await request.json();
    if (!body || typeof body !== 'object' || !Array.isArray(body.groups)) {
      return new Response(JSON.stringify({ error: 'Ugyldig plan-format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      });
    }
    body.updatedAt = new Date().toISOString();
    await env.PLAN_KV.put('current_plan', JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true, updatedAt: body.updatedAt }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
  }
}
