/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

export interface ActivityObject {
  activityName: string;
  address?: string;
  allTrailsId?: string;
  createdAt?: string | dayjs.Dayjs;
  dateClimbed?: string | dayjs.Dayjs;
  difficultyRating?: string;
  distance?: number;
  elevation?: number;
  id: string;
  packWeight?: string;
  stairs?: number;
  status?: string;
  suggestedTimeToComplete?: string;
  suggestedPackWeight?: string;
  actualTimeToComplete?: string;
  type: ActivityTypeEnum;
}

export enum ActivityTypeEnum {
  HIKE = 'hike',
  STAIR = 'stair',
  REST = 'rest',
  STRETCH = 'stretch',
}

export interface ProgressObject {
  totalActivities: number;
  totalDistance: number;
  totalElevation: number;
}

export interface AppUserObject {
  displayName: string;
  email: string;
  id: string;
  favoriteHikes: string[];
  favoriteStairs: string[];
  profilePhotoUrl?: string;
  providerId: string;
  providerData?: any;
  units: 'imperial' | 'metric';
}

export interface GoogleUserObject {
  email: string;
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
  providerData?: any[];
  providerId: string;
  reloadListender?: any;
  reloadUserInfo: any;
  stsTokenManager: any;
  tenantId?: any;
  uid: string;
}
interface GeoObject {
  latitude: number;
  longitude: number;
}
export interface RawHikeObject {
  _geoloc: GeoObject;
  city_name: string;
  difficulty_rating: string;
  elevation_gain: number;
  length: number;
  minutes_to_complete_rainier?: number;
  name: string;
  objectID: string;
  popularity: number;
  profile_photo_url: string;
  snow?: boolean;
}

export interface HikeObject {
  id: string;
  cityName: string;
  difficultyRating: string;
  elevationGain: number;
  geoLocation: GeoObject;
  length: number;
  minutesToCompleteRainier?: number;
  name: string;
  popularity: number;
  profilePhotoUrl: string;
  snow?: boolean;
}

export interface RawStairObject {
  OBJECTID: number;
  UNITDESC_ASSET: string;
  STAIRWAYLENGTH: number;
  STAIRWAYWIDTH: number;
  Shape__Length: number;
}

export interface StairObject {
  address: string;
  elevation: number;
  id: string;
  name?: string;
  numberOfStairs: number;
  objectId: string;
  Shape__Length: number;
  STAIRWAYLENGTH: number;
  STAIRWAYWIDTH: number;
}
export interface TrainingActivity extends ActivityObject {
  rank: number;
}

export interface TrainingSuggestion {
  week: number;
  activities: TrainingActivity[];
}
