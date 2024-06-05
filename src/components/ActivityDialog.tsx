import React, { useState, Dispatch, SetStateAction } from 'react';
import '../App.css';
import useActivities from '../hooks/useActivities';
import { ActivityObject } from 'src/utils/types';
import { ComboboxDemo } from './shad-ui/ui/combo-box';
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

interface NewActivityModalProps {
  activityToBeEdited?: ActivityObject;
}

const defaultObject = {
  name: '',
  date: '',
  time: '',
  id: '',
  elevation: 0,
  distance: 0,
};

const ActivityDialog = ({ activityToBeEdited }: NewActivityModalProps) => {
  const [newActivity, setNewActivity] = useState<ActivityObject>(
    activityToBeEdited || defaultObject,
  );
  const { saveNewActivity, editActivity } = useActivities();

  const handleSave = () => {
    // make it so these are the same...add if new, edit if existing!
    console.log('in save');
    if (activityToBeEdited) {
      // editActivity({ editedActivity: newActivity });
    } else {
      // saveNewActivity({ newActivity });
    }
  };

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
            {' '}
            {activityToBeEdited ? 'Edit Activity' : 'New Activity'}
          </DialogTitle>
          <DialogDescription>
            {activityToBeEdited
              ? 'Make changes to your activity. Click save once completed.'
              : 'Add a new activity here. Click save once completed.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activityName" className="text-right">
              Name
            </Label>
            <Input
              id="activityName"
              defaultValue={activityToBeEdited?.name || ''}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <ComboboxDemo />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              How long did it take?
            </Label>
            <Input
              id="time"
              defaultValue={activityToBeEdited?.time || 60}
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pack" className="text-right">
              How much did your pack weigh?
            </Label>
            <Input
              id="pack"
              defaultValue={activityToBeEdited?.packWeight || 20}
              className="col-span-3"
              type="number"
            />{' '}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
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
