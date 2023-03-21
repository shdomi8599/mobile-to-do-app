export const decryption = async (params: {
  iv: string;
  ciphertext: string;
}) => {
  console.log(params);
  const ivString = params.iv;
  const ciphertextString = params.ciphertext;
  if (!ivString || !ciphertextString) {
    console.log("Missing iv or ciphertext in query params");
    return;
  }

  const iv = new Uint8Array(Array.from(ivString).map((c) => c.charCodeAt(0)));
  const ciphertext = new Uint8Array(
    Array.from(ciphertextString).map((c) => c.charCodeAt(0))
  );

  const algorithm = { name: "AES-CBC", length: 256 };
  const key = await window.crypto.subtle.generateKey(algorithm, true, [
    "encrypt",
    "decrypt",
  ]);

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    ciphertext
  );
  const plaintext = new TextDecoder().decode(decrypted);

  let scheduleData;
  try {
    scheduleData = JSON.parse(plaintext);
  } catch (error) {
    console.log("Error parsing JSON:", error);
    return;
  }

  return scheduleData;
};
