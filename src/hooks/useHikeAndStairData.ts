// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { HikeObject, StairObject } from 'src/utils/types';
import {
  doc,
  setDoc,
  Timestamp,
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
import testStairData from 'src/data/testStairs.json';

const useHikeAndStairData = () => {
  const [hikes, setHikes] = useState<HikeObject[]>([]);
  const [stairs, setStairs] = useState<StairObject[]>([]);
  const [loadingHikes, setLoadingHikes] = useState<boolean>(false);
  const [loadingStairs, setLoadingStairs] = useState<boolean>(false);

  const uploadHikeDataToFirestore = async () => {
    setLoadingHikes(true);
    testData.forEach(async (data) => {
      const id = idGenerator('hike');
      try {
        const res = await setDoc(doc(db, 'hike', id), {
          id,
          objectId: data.objectID,
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
  const uploadStairDataToFirestore = async () => {
    setLoadingStairs(true);
    const id = idGenerator('stair');
    testStairData.forEach(async (data) => {
      try {
        const stringObjectId = data.OBJECTID.toString();
        const res = await setDoc(doc(db, 'stair', id), {
          id,
          name: '',
          address: data.UNITDESC_ASSET,
          elevation: 0,
          objectId: data.OBJECTID,
          length: data.STAIRWAYLENGTH,
          STAIRWAYWIDTH: data.STAIRWAYWIDTH,
          numberOfStairs: 0,
          Shape__Length: data.Shape__Length,
          STAIRWAYLENGTH: data.STAIRWAYLENGTH,
          createdAt: Timestamp.now(),
          deletedAt: null,
          createdBy: 'system',
        });
        console.log({ res });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStairs(false);
      }
    });
  };
  useEffect(() => {
    // only do this once to seed db.
    // uploadStairDataToFirestore();
    // uploadHikeDataToFirestore();
  }, []);

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
