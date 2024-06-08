import { File, ListFilter, MoreHorizontal, Search } from 'lucide-react';
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
import '../App.css';
import useActivities from '../hooks/useActivities';
import ActivityDialog from './ActivityDialog';
import useAuth from 'src/hooks/useAuth';
import { ProgressCard } from './ProgressCard';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';

const ActivityHistory = () => {
  const { activities, totalProgress } = useActivities();
  const { isAuthenticated } = useAuth();
  console.log('ON ACTIVITY', { isAuthenticated });
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MainHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hikes">Hikes</TabsTrigger>
                <TabsTrigger value="stairs">Stairs</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>

                <ActivityDialog />
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:flex-wrap">
                    <div>
                      <CardTitle>Activity History</CardTitle>
                      <CardDescription>
                        Track your hikes and workouts here.
                      </CardDescription>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <ProgressCard
                        title="Total Activities"
                        value={totalProgress?.totalActivities || 0}
                        units="activities"
                      />

                      <ProgressCard
                        title="Total Elevation"
                        value={totalProgress?.totalElevation || 0}
                        units="feet"
                      />

                      <ProgressCard
                        title="Total Distance"
                        value={totalProgress?.totalDistance || 0}
                        units="miles"
                      />
                    </div>
                  </div>
                </CardHeader>
                {isAuthenticated ? (
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Pack Weight
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Time
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date Completed
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activities.map((activity, index) => (
                          <TableRow key={index}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/placeholder.svg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {activity.activityName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {activity.difficultyRating || 'Done'}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {activity.packWeight || 'Not Availble'}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {activity.timeToComplete || 'Not Availble'}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {activity.dateClimbed || 'Not Availble'}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <span>
                      <Link
                        to="/login"
                        className="cursor-pointer underline text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Login
                      </Link>{' '}
                      to track and save your activity history
                    </span>
                  </div>
                )}
                <CardFooter>{renderPaginationText()}</CardFooter>{' '}
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ActivityHistory;
