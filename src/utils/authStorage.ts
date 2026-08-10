//health-platform-mobile/src/utils/authStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";


const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const USER_ID = "user_id";


export async function saveAuthData(data: {
  accessToken: string;
  refreshToken: string;
  userId: string;
}) {

  await AsyncStorage.multiSet([
    [
      ACCESS_TOKEN,
      data.accessToken,
    ],
    [
      REFRESH_TOKEN,
      data.refreshToken,
    ],
    [
      USER_ID,
      data.userId,
    ],
  ]);

}



export async function getAuthData() {

  const data = await AsyncStorage.multiGet([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_ID,
  ]);


  const accessToken = data[0][1];
  const refreshToken = data[1][1];
  const userId = data[2][1];


  if (
    !accessToken ||
    !refreshToken ||
    !userId
  ) {
    return null;
  }


  return {
    accessToken,
    refreshToken,
    userId,
  };

}



export async function clearAuthData() {

  await AsyncStorage.multiRemove([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_ID,
  ]);

}