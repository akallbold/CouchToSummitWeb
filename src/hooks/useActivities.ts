// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { ActivityObject, ProgressObject } from 'src/utils/types';
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
import useAuth from './useAuth';
import { idGenerator } from '../utils/utils';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityObject[]>([]);
  const [totalProgress, setTotalProgress] = useState<ProgressObject>(null);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  // upsert - create if new, edit if existing
  useEffect(() => {
    if (activities.length) {
      const totalElevation = activities.reduce((acc, curr) => {
        return acc + curr.elevation;
      }, 0);
      const totalDistance = activities.reduce((acc, curr) => {
        return acc + curr.distance;
      }, 0);
      setTotalProgress({
        totalActivities: activities.length,
        totalElevation,
        totalDistance,
      });
    } else {
      setTotalProgress({
        totalActivities: 0,
        totalElevation: 0,
        totalDistance: 0,
      });
    }
  }, [activities]);

  const saveActivity = async (activity: ActivityObject) => {
    setLoadingActivities(true);
    const activityId = activity.id || idGenerator('activity');
    const {
      activityName,
      dateClimbed,
      timeToComplete,
      allTrailsId,
      packWeight,
      elevation,
      distance,
    } = activity;

    try {
      const res = await setDoc(doc(db, 'activities', activityId), {
        activityName,
        allTrailsId,
        createdAt: Timestamp.now(),
        dateClimbed,
        deletedAt: null,
        distance,
        elevation,
        packWeight,
        timeToComplete,
        type: 'hike',
        user: user.email,
      });
      console.log({ res });
      getActivities();
    } catch (e) {
      console.error({ e });
    } finally {
      setLoadingActivities(false);
    }
  };

  const deleteActivity = async ({ activityId }) => {
    setLoadingActivities(true);
    await setDoc(doc(db, 'activities', activityId), {
      deletedAt: Timestamp.now(),
    });
    setLoadingActivities(false);
  };

  const getActivities = async () => {
    setLoadingActivities(true);

    const q = query(
      collection(db, 'activity'),
      where('deletedAt', '==', null),
      where('user', '==', 'a.kallenbornbolden@gmail.com'),
      orderBy('createdAt', 'desc'),
      limit(30),
    );

    try {
      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      console.log('Fetched activities:', data);
      setActivities(data);
    } catch (e) {
      console.error('Error fetching documents:', e);
      setActivities([]);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return {
    activities,
    loadingActivities,
    saveActivity,
    deleteActivity,
    totalProgress,
  };
};

export default useActivities;
