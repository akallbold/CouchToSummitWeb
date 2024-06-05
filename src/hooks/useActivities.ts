// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { ActivityObject, ProgressObject } from 'src/utils/types';
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
import useAuthentication from './useAuthentication';
import { idGenerator } from '../utils/utils';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityObject[]>([]);
  const [totalProgress, setTotalProgress] = useState<ProgressObject>(null);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const { user } = useAuthentication();
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
    }
  }, [activities]);

  const saveNewActivity = async ({ newActivity }) => {
    setLoadingActivities(true);
    // check for existing ID
    const activityId = idGenerator('activity');
    const { name, date, time } = newActivity;

    console.log({ activityId, name, date, time, user });
    try {
      const res = await setDoc(doc(db, 'activities', activityId), {
        name,
        time,
        date,
        createdAt: Timestamp.now(),
        // user: '12345',
        user: user.email,
        deletedAt: null,
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
  // do we want this or just addEdit?
  const editActivity = async ({ editedActivity }) => {
    setLoadingActivities(true);
    const editedActivityRef = doc(db, 'activities', editedActivity.id);
    // add the edited timestamp!
    //  const docRef = doc(db, 'objects', 'some-id');
    // Update the timestamp field with the value from the server
    // const updateTimestamp = await updateDoc(docRef, {
    //   timestamp: serverTimestamp()
    // });
    //     await updateDoc(editedActivityRef, {
    //       capital: true
    //     });
    setLoadingActivities(false);
  };

  const getActivities = async () => {
    setLoadingActivities(true);

    const q = query(
      collection(db, 'activities'),
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
    saveNewActivity,
    deleteActivity,
    editActivity,
  };
};

export default useActivities;
