import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://saigonwaterbus-bc2f6-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const rtdb = admin.database();
export const auth = admin.auth();
