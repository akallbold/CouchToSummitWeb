import { Home as HomeIcon, LineChart, ListFilter, Star } from 'lucide-react';

import { Badge } from './shad-ui/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shad-ui/ui/dropdown-menu';
import { Input } from './shad-ui/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shad-ui/ui/table';
import { Tabs, TabsContent } from './shad-ui/ui/tabs';
import useAuth from 'src/hooks/useAuth';
import useHikeAndStairData from '../hooks/useHikeAndStairData';
import '../App.css';
import { Button } from './shad-ui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './shad-ui/ui/card';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';

const Stairs = () => {
  const { stairs } = useHikeAndStairData();
  const renderPaginationText = () => {
    const firstRowOnPage = 1; // for now
    const totalOnPage = Math.min(stairs.length, 10);
    const totalResults = stairs.length;
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
          stairs
        </span>
      </div>
    );
  };
  const { currentUser } = useAuth();
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
                      <CardTitle>Stairs</CardTitle>
                      <CardDescription>
                        Stair data pulled from City of Seattle data.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {/* <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead> */}
                        <TableHead>Address</TableHead>
                        <TableHead>Elevation</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Elevation
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Length
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          City
                        </TableHead> */}
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Favorite</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stairs.map((stair, index) => (
                        <TableRow key={index}>
                          {/* <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={hike.profile_photo_url}
                              width="64"
                            />
                          </TableCell> */}
                          <TableCell className="font-medium">
                            {stair.address}
                          </TableCell>
                          {/* <TableCell>
                            <Badge variant="outline">
                              {stair.difficulty_rating}
                            </Badge>
                          </TableCell> */}
                          <TableCell className="hidden md:table-cell">
                            {stair.elevation}
                          </TableCell>
                          {/* <TableCell className="hidden md:table-cell">
                            {hike.length}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {hike.city_name}
                          </TableCell> */}
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

export default Stairs;
