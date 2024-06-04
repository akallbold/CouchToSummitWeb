import React, { useState, useEffect } from 'react';
import '../App.css';
import useActivities from '../hooks/useActivities';
import { ActivityObject } from 'src/utils/types';
import NewActivityModal from './NewActivityModal';

const defaultObject = { name: '', date: '', time: '', id: '' };

function Home() {
  const [newActivityModalOpen, setNewActivityModalOpen] =
    useState<boolean>(false);
  const [editActivityModalOpen, setEditActivityModalOpen] =
    useState<boolean>(false);
  // const [activities, setActivities] = useState<ActivityObject[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityObject | null>(null);
  const {
    activities,
    saveNewActivity,
    deleteActivity,
    editActivity,
    loadingActivities,
  } = useActivities();

  // useEffect(() => {
  //   setActivities([
  //     { name: 'Granite Lake Trail', date: '2021-08-01', time: '90', id: '1' },
  //     { name: 'Mailbox Peak', date: '2021-08-02', time: '290', id: '2' },
  //     { name: 'Mount Si', date: '2021-08-03', time: '290', id: '3' },
  //   ]);
  // }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-skyBlue to-waterBlue p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-forestGreen mb-8">Home Screen!</h1>
      <button
        onClick={() => setNewActivityModalOpen(true)}
        className="mb-4 bg-forestGreen text-coolWhite px-4 py-2 rounded hover:bg-leafyGreen transition-colors"
      >
        Add New Activity
      </button>
      {activities.length === 0 && !loadingActivities && (
        <div className="text-2xl text-gray-600">No activities to show</div>
      )}
      <div className="w-full max-w-2xl flex flex-col items-center space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="w-full p-4 bg-white rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
          >
            <div>
              <div className="text-lg font-semibold text-forestGreen">
                {activity.name}
              </div>
              <div className="text-gray-600">
                <span className="block">{activity.date}</span>
                <span className="block">{activity.time} mins</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {
                  setSelectedActivity(activity);
                  setEditActivityModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => deleteActivity({ activityId: activity.id })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {newActivityModalOpen && (
        <NewActivityModal setNewActivityModalOpen={setNewActivityModalOpen} />
      )}

      {editActivityModalOpen && selectedActivity && (
        <NewActivityModal
          setNewActivityModalOpen={setEditActivityModalOpen}
          activityToBeEdited={selectedActivity}
        />
      )}
    </div>
  );
}

export default Home;
