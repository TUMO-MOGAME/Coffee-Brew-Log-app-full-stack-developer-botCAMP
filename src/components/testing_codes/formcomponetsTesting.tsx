import { useState } from "react";
import {useForm} from "react-hook-form"
import { Card, CardContent, CardHeader,CardTitle}from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Form } from "react-hook-form";



type testFormData = {
    brew_method:string;
    brewer:string;
    brewer_model:string;
    brewer_setting:string;
    brewer_notes:string;
    brewer_image:string;
    brewer_video:string;
    brewer_audio:string;
    brewer_date:string;
    brewer_time:string;
    brewer_location:string;
    brewer_temperature:string;
    brewer_pressure:string;
    brewer_flow_rate:string;
    brewer_tds:string;
}
export default function FormcomponetsTesting() {
    const [selectedMethod, setSelectedMethod] = useState<string>("")
    const [notes, setNotes] = useState("")

    const form = useForm<testFormData>({
    defaultValues: {
      brew_method: "French Press",
      brewer: "Bodum",
      brewer_model: "Chambord",
      brewer_setting: "1:00",
      brewer_notes: "This is a note",},
  });

    const onSubmit = (data: testFormData) => {
        console.log(data);
      };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Brew Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={setSelectedMethod}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a brew method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="French Press">French Press</SelectItem>
                            <SelectItem value="Aeropress">Aeropress</SelectItem>
                            <SelectItem value="V60">V60</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <Button type="submit">Submit</Button>
        </form>
    );
}

