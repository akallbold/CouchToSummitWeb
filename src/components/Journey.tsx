import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import '../App.css';
import dayjs from 'dayjs';
import trainingDataJson from '../data/suggestedTraining.json';
import {
  ActivityTypeEnum,
  TrainingActivity,
  TrainingSuggestion,
} from '../utils/types';

const Journey = () => {
  const [toDoTrainingData, setToDoTrainingData] = useState<
    TrainingActivity[] | null
  >(null);
  const [doneTrainingData, setDoneTrainingData] = useState<
    TrainingActivity[] | null
  >(null);
  const today = dayjs();
  const dateOfNextClimb = today.add(3, 'month');
  const monthsDifference = dateOfNextClimb.diff(today, 'month');
  const weekDifference = dateOfNextClimb.diff(today, 'week');
  const dayDifference = dateOfNextClimb.diff(today, 'day');
  const countDownText = () => {
    if (weekDifference > 8) {
      return `${monthsDifference} Months to Go`;
    } else if (weekDifference <= 8) {
      if (dayDifference < 10) {
        return `It's the final stretch. Only ${dayDifference} Days to Go`;
      }
      return `${weekDifference} Weeks to Go`;
    }
  };
  console.log({ weekDifference, toDoTrainingData, doneTrainingData });
  useEffect(() => {
    if (trainingDataJson) {
      trainingDataJson.forEach((week: TrainingSuggestion) => {
        if (week.week === weekDifference) {
          const done: TrainingActivity[] = [];
          const todo: TrainingActivity[] = [];
          week.activities.forEach((activity: TrainingActivity) => {
            console.log({ activity });
            if (activity.dateClimbed) {
              done.push(activity);
            } else {
              todo.push(activity);
            }
          });
          setDoneTrainingData(done);
          setToDoTrainingData(todo);
        }
      });
    }
  }, [weekDifference]);

  const renderRowData = (data, index) => {
    if (
      data.type === ActivityTypeEnum.HIKE ||
      data.type === ActivityTypeEnum.STAIR
    ) {
      return (
        // use associated image
        <div key={index}>
          <div>Day {data.rank}</div>
          <div>{data.activityName}</div>

          <div>
            {data.suggestedTimeToComplete} | {data.suggestedPackWeight}
          </div>
        </div>
      );
    } else {
      // get stock image
      return (
        <div key={index}>
          <div>Day {data.rank}</div>
          <div>{data.activityName}</div>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MainHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <h2>{countDownText()}</h2>
          <h2>To do this Week</h2>

          {toDoTrainingData &&
            toDoTrainingData.map((activity: TrainingActivity, i: number) =>
              renderRowData(activity, i),
            )}
          <h2>Workouts completed this week</h2>
          {doneTrainingData &&
            doneTrainingData.map((activity: TrainingActivity, i: number) =>
              renderRowData(activity, i),
            )}
        </main>
      </div>
    </div>
  );
};

export default Journey;
