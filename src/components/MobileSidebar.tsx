import {
  LineChart,
  PanelLeft,
  TrendingUp,
  MountainSnow,
  Boxes,
  NotebookText,
} from 'lucide-react';
import { Button } from './shad-ui/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './shad-ui/ui/sheet';
import { Link } from 'react-router-dom';
import '../App.css';

const MobileSidebar = () => {
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
          <Link
            to="/journey"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <NotebookText className="h-5 w-5" />
            My Journey
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <TrendingUp className="h-5 w-5" />
            My Activity
          </Link>
          <Link
            to="/hikes"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <MountainSnow className="h-5 w-5" />
            Hikes
          </Link>
          <Link
            to="/stairs"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Boxes className="h-5 w-5" />
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
