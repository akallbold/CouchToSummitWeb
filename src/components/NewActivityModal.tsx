import React, { useState, Dispatch, SetStateAction } from 'react';
import '../App.css';
import useActivities from '../hooks/useActivities';
import { ActivityObject } from 'src/utils/types';

interface NewActivityModalProps {
  setNewActivityModalOpen: Dispatch<SetStateAction<boolean>>;
  activityToBeEdited?: ActivityObject;
}

const defaultObject = { name: '', date: '', time: '', id: '' };

function NewActivityModal({
  setNewActivityModalOpen,
  activityToBeEdited,
}: NewActivityModalProps) {
  const [newActivity, setNewActivity] = useState<ActivityObject>(
    activityToBeEdited || defaultObject,
  );
  const { saveNewActivity, editActivity } = useActivities();

  const handleSave = () => {
    // make it so these are the same...add if new, edit if existing!
    if (activityToBeEdited) {
      editActivity({ editedActivity: newActivity });
    } else {
      saveNewActivity({ newActivity });
    }
    setNewActivityModalOpen(false);
  };
  console.log('Modal!');
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {activityToBeEdited ? 'Edit Activity' : 'New Activity'}
        </h2>
        <form>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Activity Name"
            className="w-full px-3 py-2 border rounded mb-4"
            onChange={(e) =>
              setNewActivity({ ...newActivity, name: e.target.value })
            }
            value={newActivity.name}
          />
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="w-full px-3 py-2 border rounded mb-4"
            onChange={(e) =>
              setNewActivity({ ...newActivity, date: e.target.value })
            }
            value={newActivity.date}
          />
          <label htmlFor="time">How long did it take? (in minutes) </label>
          <input
            id="time"
            type="number"
            className="w-full px-3 py-2 border rounded mb-4"
            onChange={(e) =>
              setNewActivity({ ...newActivity, time: e.target.value })
            }
            value={newActivity.time}
          />
          <button
            type="button"
            className="mt-4 bg-forestGreen text-coolWhite px-4 py-2 rounded hover:bg-leafyGreen transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="reset"
            className="mt-4 bg-forestGreen text-coolWhite px-4 py-2 rounded hover:bg-leafyGreen transition-colors"
            onClick={() => {
              setNewActivityModalOpen(false);
            }}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewActivityModal;
