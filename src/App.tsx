import { Toaster} from "@/components/ui/toaster";
import {toaster as Sonner} from "@/components/ui/sonner";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import TestToaster from "./components/testToaster";
import { Coffee } from "lucide-react";

const app = () => {
  const [brews, setBrews] = useState(0);
  return (  
    <div className="flex flex-col gap-4">
      <TestToaster />
    </div>
  );
};

export default app;
