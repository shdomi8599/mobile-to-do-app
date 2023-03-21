export const encryption = async () => {
  const scheduleData = {
    "8": "빵먹기",
    "9": "밥먹기",
    "10": "치킨먹기",
    "11": "피자먹기",
  };
  const plaintext = JSON.stringify(scheduleData);
  const hostName = window.location.href;
  const algorithm = { name: "AES-CBC", length: 256 };
  const key = await window.crypto.subtle.generateKey(algorithm, true, [
    "encrypt",
    "decrypt",
  ]);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const encodedData = new TextEncoder().encode(plaintext);
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    encodedData
  );

  const ivString = Array.from(iv)
    .map((b) => String.fromCharCode(b))
    .join("");
  const ciphertextString = Array.from(new Uint8Array(encrypted))
    .map((b) => String.fromCharCode(b))
    .join("");
  const encryptedData = new URLSearchParams({
    iv: ivString,
    ciphertext: ciphertextString,
  }).toString();
  const url = `${hostName}?scheduleData=${encryptedData}`;
  console.log(url);
};
