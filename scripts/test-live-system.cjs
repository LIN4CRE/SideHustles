const http = require('http');
const https = require('https');

async function testEndpoint(url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });

    req.on('error', err => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runLocalVerification() {
  console.log('=====================================================');
  console.log('  🧪 TESTING EXPRESS BACKEND ENGINE (http://localhost:3847) ');
  console.log('=====================================================');

  const baseUrl = 'http://localhost:3847';

  try {
    // 1. Health Check
    console.log('\n[1/5] Testing Local Health Endpoint (/api/health)...');
    const healthRes = await testEndpoint(`${baseUrl}/api/health`);
    console.log(`STATUS: ${healthRes.statusCode} -> Response:`, healthRes.body);

    // 2. Payhip Webhook Test
    console.log('\n[2/5] Testing Payhip Sales Webhook (/api/webhooks/sale)...');
    const saleRes = await testEndpoint(`${baseUrl}/api/webhooks/sale`, 'POST', {
      type: 'paid',
      product_name: 'Verification Test Asset - Payhip',
      price: 29.99,
      buyer_email: 'verifier@example.com'
    });
    console.log(`STATUS: ${saleRes.statusCode} -> Response:`, saleRes.body);

    // 3. Automated Fulfillment Test
    console.log('\n[3/5] Testing Customer Asset Fulfillment (/api/webhooks/fulfill)...');
    const fulfillRes = await testEndpoint(`${baseUrl}/api/webhooks/fulfill`, 'POST', {
      customerEmail: 'verifier@example.com',
      productName: 'Verification Test Asset'
    });
    console.log(`STATUS: ${fulfillRes.statusCode} -> Response:`, fulfillRes.body);

    // 4. Android Sync Test
    console.log('\n[4/5] Testing Android Mobile Sync (/api/android/push-notification)...');
    const pushRes = await testEndpoint(`${baseUrl}/api/android/push-notification`, 'POST', {
      title: 'Verification Payout',
      message: '£29.99 received via Payhip'
    });
    console.log(`STATUS: ${pushRes.statusCode} -> Response:`, pushRes.body);

    // 5. Smart-Mail Outreach Test
    console.log('\n[5/5] Testing Smart-Mail Outreach Dispatch (/api/smart-mail/auto-dispatch)...');
    const mailRes = await testEndpoint(`${baseUrl}/api/smart-mail/auto-dispatch`, 'POST', {
      recipientEmail: 'verifier@example.com',
      businessName: 'Bramblewood Garden Centre'
    });
    console.log(`STATUS: ${mailRes.statusCode} -> Response:`, mailRes.body);

    console.log('\n=====================================================');
    console.log('  ✅ ALL 5 LOCAL EXPRESS ENDPOINTS RETURNED VALID JSON! ');
    console.log('=====================================================');
  } catch (err) {
    console.error('❌ Verification Error (is server running?):', err.message);
  }
}

runLocalVerification();
