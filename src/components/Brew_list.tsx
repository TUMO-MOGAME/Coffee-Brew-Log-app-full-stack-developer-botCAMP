import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { brewMethods, type BrewEntry } from '@/lib/aws'
import { Coffee, Edit, Trash2, Star, Clock, Thermometer, Scale } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BrewListProps {
  brews: BrewEntry[]
  onEdit: (brew: BrewEntry) => void
  onDelete: (id: string) => Promise<void>
}

export default function BrewList({ brews, onEdit, onDelete }: BrewListProps) {
  const { toast } = useToast()
  const [filterMethod, setFilterMethod] = useState<string>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const filteredBrews = brews.filter(brew => 
    filterMethod === 'all' || brew.brew_method === filterMethod
  )

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id)
      toast({
        title: "Brew Deleted",
        description: "The brew entry has been removed from your log.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete brew entry. Please try again.",
        variant: "destructive"
      })
    } finally {
      setDeleteId(null)
    }
  }

  const formatBrewTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 
      ? `${minutes}m ${remainingSeconds}s`
      : `${seconds}s`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (brews.length === 0) {
    return (
      <Card className="text-center py-12 animate-fade-in hover-lift">
        <CardContent className="flex flex-col items-center space-y-4">
          <Coffee className="h-16 w-16 text-muted-foreground animate-bounce-gentle" />
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">No brews logged yet</h3>
            <p className="text-muted-foreground">Start logging your coffee brewing journey!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between animate-slide-up">
        <div className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">
            {filteredBrews.length} brew{filteredBrews.length !== 1 ? 's' : ''} logged
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-sm font-medium">
            Filter by method:
          </label>
          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-[180px] hover-lift">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              {brewMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Brew Cards */}
      <div className="grid gap-4">
        {filteredBrews.map((brew, index) => (
          <Card 
            key={brew.id} 
            className="shadow-warm hover:shadow-coffee transition-all duration-300 hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {brew.coffee_type}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-latte text-primary font-medium"
                      >
                        {brew.brew_method}
                      </Badge>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < brew.rating
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brewing Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Scale className="h-4 w-4" />
                      <span>{brew.ratio}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Thermometer className="h-4 w-4" />
                      <span>{brew.water_temp}°F</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{formatBrewTime(brew.brew_time)}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">Grind:</span> {brew.grind_size}
                    </div>
                  </div>

                  {/* Notes */}
                  {brew.notes && (
                    <div className="bg-muted/50 rounded-md p-3">
                      <p className="text-sm text-muted-foreground italic">
                        "{brew.notes}"
                      </p>
                    </div>
                  )}

                  {/* Date */}
                  {brew.created_at && (
                    <p className="text-xs text-muted-foreground">
                      Brewed on {formatDate(brew.created_at)}
                    </p>
                  )}
                </div>
                
                <div className="flex lg:flex-col gap-2 lg:w-auto w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(brew)}
                    className="flex-1 lg:flex-initial"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(brew.id!)}
                    className="flex-1 lg:flex-initial text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brew Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this brew entry from your log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}