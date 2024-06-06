// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import {
  ActivityObject,
  HikeObject,
  ProgressObject,
  RawHikeObject,
  StairObject,
} from 'src/utils/types';
import {
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from 'src/utils/firebase';
import { idGenerator } from '../utils/utils';
import testData from 'src/data/test-WA.json';

const useHikeAndStairData = () => {
  const [hikes, setHikes] = useState<HikeObject[]>([]);
  const [stairs, setStairs] = useState<StairObject[]>([]);
  const [loadingHikes, setLoadingHikes] = useState<boolean>(false);
  const [loadingStairs, setLoadingStairs] = useState<boolean>(false);

  const uploadDataToFirestore = async () => {
    setLoadingHikes(true);
    testData.forEach(async (data) => {
      try {
        const res = await setDoc(doc(db, 'hike', data.objectID), {
          id: data.objectID,
          name: data.name,
          popularity: data.popularity,
          geoLocation: data._geoloc,
          length: data.length,
          elevationGain: data.elevation_gain,
          difficultyRating: data.difficulty_rating,
          cityName: data.city_name,
          profilePhotoUrl: data.profile_photo_url,
          createdAt: Timestamp.now(),
          deletedAt: null,
          createdBy: 'system',
        });
        console.log({ res });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingHikes(false);
      }
    });
  };
  // uploadDataToFirestore();

  const getHikes = async () => {
    setLoadingHikes(true);

    const q = query(
      collection(db, 'hike'),
      where('deletedAt', '==', null),
      where('createdBy', '==', 'system'),
      orderBy('popularity', 'desc'),
      limit(30),
    );

    try {
      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      console.log('Fetched hikes:', data);
      setHikes(data);
    } catch (e) {
      console.error('Error fetching documents:', e);
      setHikes([]);
    } finally {
      setLoadingHikes(false);
    }
  };

  useEffect(() => {
    getHikes();
  }, []);

  return {
    hikes,
    stairs,
    loadingStairs,
    loadingHikes,
  };
};

export default useHikeAndStairData;
