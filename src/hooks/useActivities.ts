// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { ActivityObject } from 'src/utils/types';
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
import { v4 as uuidv4 } from 'uuid';

const idGenerator = (prefix: string) => {
  return `${prefix}-${uuidv4()}`;
};

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityObject[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const { user } = useAuthentication();
  // upsert - create if new, edit if existing
  const saveNewActivity = async ({ newActivity }) => {
    setLoadingActivities(true);
    console.log({ newActivity });
    // check for existing ID
    const activityId = idGenerator('activity');
    const { name, date, time } = newActivity;
    // get some sort of ID from the user - i think this will be saved by us separate of google auth
    console.log('in hook', { activities });
    // make sure timestamp gets generated automatically
    console.log({ activityId, name, date, time, user });
    try {
      const res = await setDoc(doc(db, 'activities', activityId), {
        name,
        time,
        date,
        createdAt: Timestamp.now(),
        user: '12345',
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
    console.log('Fetching activities...');
    setLoadingActivities(true);

    const q = query(
      collection(db, 'activities'),
      where('deletedAt', '==', null),
      // Uncomment and modify this line with the correct user ID
      // where('user', '==', '123'),
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
