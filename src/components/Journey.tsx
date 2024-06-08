import { File, ListFilter, MoreHorizontal } from 'lucide-react';
import { Badge } from './shad-ui/ui/badge';
import { Button } from './shad-ui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './shad-ui/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shad-ui/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shad-ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './shad-ui/ui/tabs';
import useActivities from '../hooks/useActivities';
import ActivityDialog from './ActivityDialog';
import useAuth from 'src/hooks/useAuth';
import { ProgressCard } from './ProgressCard';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import '../App.css';

const Journey = () => {
  const { activities, totalProgress } = useActivities();
  const { appUser } = useAuth();

  const renderPaginationText = () => {
    const firstRowOnPage = activities.length ? 1 : 0; // for now
    const totalOnPage = Math.min(activities.length, 10);
    const totalResults = activities.length;

    return (
      <div className="text-xs text-muted-foreground">
        <span>
          Showing{' '}
          <strong>
            <span>{firstRowOnPage}</span>-<span>{totalOnPage}</span>
          </strong>{' '}
          of{' '}
          <strong>
            <span>{totalResults}</span>
          </strong>{' '}
          activities
        </span>
      </div>
    );
  };

  console.log({ appUser });
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MainHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div>🥴</div>
        </main>
      </div>
    </div>
  );
};

export default Journey;
