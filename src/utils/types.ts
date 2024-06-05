export interface ActivityObject {
  date: string;
  id: string;
  name: string;
  time: string;
}

export interface GoogleUserObject {
  email: string;
  password: string;
}

export interface EmailUserObject {
  accessToken: string;
  auth: any;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber?: string;
  photoUrl?: string;
  proactiveRefresh: any;
  providerData: any[];
  providerId: string;
  reloadListender?: any;
  reloadUserInfo: any;
  stsTokenManager: any;
  tenantId?: any;
  uid: string;
}
