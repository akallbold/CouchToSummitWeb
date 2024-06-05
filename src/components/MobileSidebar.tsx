import React, { useState, useEffect } from 'react';
import {
  File,
  Home as HomeIcon,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import { Badge } from './shad-ui/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './shad-ui/ui/breadcrumb';
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
import { Input } from './shad-ui/ui/input';
import { Sheet, SheetContent, SheetTrigger } from './shad-ui/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shad-ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './shad-ui/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from './shad-ui/ui/tooltip';
import { Link } from 'react-router-dom';
import '../App.css';
import useActivities from '../hooks/useActivities';
import { ActivityObject } from 'src/utils/types';
import ActivityDialog from './ActivityDialog';
import useAuthentication from 'src/hooks/useAuthentication';
import { ResponsiveDialog } from './shad-ui/ui/responsive-dialog';
import { ProgressCard } from './ProgressCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shad-ui/ui/dialog';
import { Label } from './shad-ui/ui/label';

const MobileSidebar = () => {
  const [newActivityModalOpen, setNewActivityModalOpen] =
    useState<boolean>(false);
  const [editActivityModalOpen, setEditActivityModalOpen] =
    useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityObject | null>(null);
  const {
    activities,
    saveNewActivity,
    deleteActivity,
    editActivity,
    loadingActivities,
  } = useActivities();

  const { currentUser } = useAuthentication();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {/* <Link
            to="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link> */}
          <Link
            to="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <HomeIcon className="h-5 w-5" />
            My Activity
          </Link>
          <Link
            to="/hikes"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <HomeIcon className="h-5 w-5" />
            Hikes
          </Link>
          <Link
            to="/stairs"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Stairs
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
