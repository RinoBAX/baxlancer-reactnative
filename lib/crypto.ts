import { Buffer } from "@craftzdog/react-native-buffer";
import { SECURE_KEY } from "@/app/utils/constants";

export async function generateAuthUrl(roles: string) {
  const payload = JSON.stringify({ roles });
  const stateObject = { payload, SECURE_KEY };
  const jsonState = JSON.stringify(stateObject);

  // Encode ke base64
  const encodedState = Buffer.from(jsonState, "utf-8").toString("base64");

  console.log("Roles:", roles);
  console.log("Payload:", payload);
  console.log("JSON State:", jsonState);
  console.log("Encoded (Base64):", encodedState);

  return encodedState;
}

export async function generateState(roles: string) {
  const payload = JSON.stringify({ roles });
  const stateObject = { payload, SECURE_KEY };
  const jsonState = JSON.stringify(stateObject);

  // Encode ke base64 juga di sini
  const encodedState = Buffer.from(jsonState, "utf-8").toString("base64");

  console.log("Roles:", roles);
  console.log("Payload:", payload);
  console.log("Encoded (Base64):", encodedState);

  return encodedState;
}
