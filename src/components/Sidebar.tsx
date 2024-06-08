import React, { useState } from 'react';
import {
  TrendingUp,
  Settings,
  MountainSnow,
  Boxes,
  NotebookText,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from './shad-ui/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const linkClass = (path) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
      selected === path
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground'
    } md:h-8 md:w-8`;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/journey"
                className={linkClass('/journey')}
                onClick={() => setSelected('/journey')}
              >
                <NotebookText className="h-5 w-5" />
                <span className="sr-only">My Journey</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">My Journey</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/activity"
                className={linkClass('/activity')}
                onClick={() => setSelected('/activity')}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="sr-only">My Activity</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">My Activity</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/hikes"
                className={linkClass('/hikes')}
                onClick={() => setSelected('/hikes')}
              >
                <MountainSnow className="h-5 w-5" />
                <span className="sr-only">Hikes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Hikes</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/stairs"
                className={linkClass('/stairs')}
                onClick={() => setSelected('/stairs')}
              >
                <Boxes className="h-5 w-5" />
                <span className="sr-only">Stairs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Stairs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className={linkClass('/settings')}
                onClick={() => setSelected('/settings')}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
