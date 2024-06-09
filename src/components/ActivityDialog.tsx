import React, { useState } from 'react';
import '../App.css';
import useActivities from '../hooks/useActivities';
import { ActivityObject, ActivityTypeEnum } from 'src/utils/types';
import { Combobox } from './shad-ui/ui/combo-box';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shad-ui/ui/dialog';
import { Label } from './shad-ui/ui/label';
import { Button } from './shad-ui/ui/button';
import { Input } from './shad-ui/ui/input';
import { PlusCircle } from 'lucide-react';
import useHikeAndStairData from '../hooks/useHikeAndStairData';
import dayjs from 'dayjs';

interface NewActivityModalProps {
  activityToBeEdited?: ActivityObject;
}

const defaultActivityObject = {
  activityName: '',
  timeToComplete: '60',
  packWeight: '20',
  dateClimbed: dayjs(),
  type: ActivityTypeEnum.HIKE,
  id: null,
  distance: 0,
  elevation: 0,
};

const ActivityDialog = ({ activityToBeEdited }: NewActivityModalProps) => {
  const [activity, setActivity] = useState<ActivityObject>(
    activityToBeEdited || defaultActivityObject,
  );
  const [selectedTab, setSelectedTab] = useState(ActivityTypeEnum.HIKE);
  const { saveActivity } = useActivities();
  const { hikes = [], stairs = [] } = useHikeAndStairData(); // default to empty array if undefined

  const handleOnChange = (key, value) => {
    setActivity({ ...activity, [key]: value });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    handleOnChange('type', tab);
  };
  console.log({ hikes, stairs });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {activityToBeEdited ? 'Edit Activity' : 'New Activity'}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {activityToBeEdited ? 'Edit Activity' : 'New Activity'}
          </DialogTitle>
          <DialogDescription>
            {activityToBeEdited
              ? 'Make changes to your activity. Click save once completed.'
              : 'Add a new activity here. Click save once completed.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 py-4">
          <button
            className={`px-4 py-2 ${selectedTab === ActivityTypeEnum.HIKE ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => handleTabChange(ActivityTypeEnum.HIKE)}
          >
            Hike
          </button>
          <button
            className={`px-4 py-2 ${selectedTab === ActivityTypeEnum.STAIR ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => handleTabChange(ActivityTypeEnum.STAIR)}
          >
            Stair
          </button>
        </div>
        {selectedTab === ActivityTypeEnum.HIKE && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hikeSelector" className="text-right">
                Pick from a predefined hike
              </Label>
              <Combobox
                data={hikes}
                value={activity.activityName}
                className="col-span-3"
                onChange={(event) =>
                  handleOnChange('activityName', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activityName" className="text-right">
                Name
              </Label>
              <Input
                id="activityName"
                value={activity.activityName}
                className="col-span-3"
                onChange={(event) =>
                  handleOnChange('activityName', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="distance" className="text-right">
                Distance (miles)
              </Label>
              <Input
                id="distance"
                value={activity.distance}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('distance', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="elevation" className="text-right">
                Elevation Gain (feet)
              </Label>
              <Input
                id="elevation"
                value={activity.elevation}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('elevation', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="packWeight" className="text-right">
                Pack Weight
              </Label>
              <Input
                id="packWeight"
                value={activity.packWeight}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('packWeight', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="timeToComplete" className="text-right">
                Time it took (minutes)
              </Label>
              <Input
                id="timeToComplete"
                value={activity.timeToComplete}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('timeToComplete', event.target.value)
                }
              />
            </div>
          </div>
        )}
        {selectedTab === ActivityTypeEnum.STAIR && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stairSelector" className="text-right">
                Pick from a predefined stair
              </Label>
              <Combobox
                data={stairs}
                value={activity.activityName}
                className="col-span-3"
                onChange={(event) =>
                  handleOnChange('activityName', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activityName" className="text-right">
                Name
              </Label>
              <Input
                id="activityName"
                value={activity.activityName}
                className="col-span-3"
                onChange={(event) =>
                  handleOnChange('activityName', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={activity.address || ''}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('timeToComplete', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pack" className="text-right">
                Pack Weight (lbs)
              </Label>
              <Input
                id="pack"
                value={activity.packWeight}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('packWeight', event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="timeToComplete" className="text-right">
                Time it took (minutes)
              </Label>
              <Input
                id="timeToComplete"
                value={activity.timeToComplete}
                className="col-span-3"
                type="number"
                onChange={(event) =>
                  handleOnChange('timeToComplete', event.target.value)
                }
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => saveActivity({ ...activity, type: selectedTab })}
            >
              Save
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
