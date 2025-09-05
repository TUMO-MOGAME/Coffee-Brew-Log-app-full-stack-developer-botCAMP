import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";

export default function TestComponents() {
  return (
    <div className="flex flex-col gap-4">
      <Button>Button</Button>
      <Label>Label</Label>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    </div>
  );
  
}


