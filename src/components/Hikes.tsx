import { ListFilter, Star } from 'lucide-react';

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
import { Tabs, TabsContent } from './shad-ui/ui/tabs';
import '../App.css';
import Sidebar from './Sidebar';
import useHikeAndStairData from '../hooks/useHikeAndStairData';
import MainHeader from './MainHeader';

const Hikes = () => {
  const { hikes } = useHikeAndStairData();
  const renderPaginationText = () => {
    const firstRowOnPage = 1; // for now
    const totalOnPage = Math.min(hikes.length, 10);
    const totalResults = hikes.length;
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
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:flex-wrap">
                    <div>
                      <CardTitle>Hikes</CardTitle>
                      <CardDescription>
                        Hike data pulled from AllTrails.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Elevation
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Length
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          City
                        </TableHead>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Favorite</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hikes.map((hike, index) => (
                        <TableRow key={index}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={hike.profile_photo_url}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {hike.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {hike.difficultyRating}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {hike.elevationGain}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {hike.length}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {hike.cityName}
                          </TableCell>
                          <TableCell>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Star className="h-4 w-4" />
                              <span className="sr-only">Add to Favorites</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>{renderPaginationText()}</CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Hikes;
