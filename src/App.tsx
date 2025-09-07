import { Toaster} from "@/components/ui/toaster";
import {toaster as Sonner} from "@/components/ui/sonner";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import TestToaster from "./components/testToaster";
import { Coffee } from "lucide-react";
import FormcomponetsTesting from "./components/testing_codes/formcomponetsTesting";
import type { BrewEntry} from "./lib/aws";


const App = () => {
  const [brews, setBrews] = useState<BrewEntry[] | null[]>([])
  const [showTest, setShowTest] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Sonner />
      
      <header className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Coffee Brew Log</h1>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setShowTest(!showTest)}
          >
            {showTest ? 'Hide' : 'Show'} Component Tests
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto p-6 space-y-6">
        {showTest && <FormcomponetsTesting />}
        
        {!showTest && (
          <Card>
            <CardHeader>
              <CardTitle>Your Brew Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Coffee className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No brews logged yet</p>
                <Button>Add Your First Brew</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default App