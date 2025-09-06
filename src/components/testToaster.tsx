import {Button} from "./ui/button";
import {Card,CardHeader,CardTitle,CardContent} from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import {Toast as sonnerToast} from "./ui/toast";
import { toast } from "sonner";

export default function TestToaster() {
    const {toast} = useToast();

    const testToast = () => {
        toast({
            title: "Toast",
            description: "This is a Toast",
        });
    };

    const testSonnerToast = () => {
        toast({
            title: "Sonner Toast",
            description: "This is a Sonner Toast",
        });
    };

    return (
        <div>
            <Button onClick={testToast}>Test Toast</Button>
            <Button onClick={testSonnerToast}>Test Sonner Toast</Button>
        </div>
    );
}

   
