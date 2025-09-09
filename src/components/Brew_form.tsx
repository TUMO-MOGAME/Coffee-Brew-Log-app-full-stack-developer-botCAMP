import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { BrewEntry, BrewMethod } from '@/lib/aws'
import { brewMethods } from '@/lib/aws'
import { Coffee, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BrewFormProps {
  onSubmit: (brew: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  initialData?: BrewEntry
  isEditing?: boolean
  onCancel?: () => void
}

export default function BrewForm({ onSubmit, initialData, isEditing, onCancel }: BrewFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>>({
    coffee_type: initialData?.coffee_type || '',
    brew_method: initialData?.brew_method || '',
    grind_size: initialData?.grind_size || '',
    water_temp: initialData?.water_temp || 200,
    brew_time: initialData?.brew_time || 240,
    ratio: initialData?.ratio || '1:15',
    notes: initialData?.notes || '',
    rating: initialData?.rating || 3
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.coffee_type.trim()) newErrors.coffee_type = 'Coffee type is required'
    if (!formData.brew_method) newErrors.brew_method = 'Brew method is required'
    if (!formData.grind_size.trim()) newErrors.grind_size = 'Grind size is required'
    if (!formData.ratio.trim()) newErrors.ratio = 'Ratio is required'
    if (formData.water_temp < 80 || formData.water_temp > 212) {
      newErrors.water_temp = 'Water temperature must be between 80°F and 212°F'
    }
    if (formData.brew_time < 30) newErrors.brew_time = 'Brew time must be at least 30 seconds'
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating must be between 1 and 5'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      toast({
        title: isEditing ? "Brew Updated!" : "Brew Logged!",
        description: `Your ${formData.brew_method} brew has been ${isEditing ? 'updated' : 'saved'}.`,
      })
      
      if (!isEditing) {
        setFormData({
          coffee_type: '',
          brew_method: '',
          grind_size: '',
          water_temp: 200,
          brew_time: 240,
          ratio: '1:15',
          notes: '',
          rating: 3
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save brew entry. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Card className="shadow-warm hover-lift animate-scale-in border-0 overflow-hidden">
      <CardHeader className="bg-gradient-cream rounded-t-lg border-b border-primary/10">
        <CardTitle className="flex items-center gap-3 text-primary text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Coffee className="h-6 w-6" />
          </div>
          {isEditing ? 'Edit Brew Entry' : 'Log New Brew'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
                Coffee Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coffee_type">Coffee Type *</Label>
              <Input
                id="coffee_type"
                value={formData.coffee_type}
                onChange={(e) => updateField('coffee_type', e.target.value)}
                placeholder="e.g., Ethiopian Yirgacheffe"
                className={`input-focus-glow ${errors.coffee_type ? 'border-destructive' : ''}`}
              />
              {errors.coffee_type && <p className="text-sm text-destructive">{errors.coffee_type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brew_method">Brew Method *</Label>
              <Select 
                value={formData.brew_method} 
                onValueChange={(value: BrewMethod) => updateField('brew_method', value)}
              >
                <SelectTrigger className={errors.brew_method ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select brew method" />
                </SelectTrigger>
                <SelectContent>
                  {brewMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brew_method && <p className="text-sm text-destructive">{errors.brew_method}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grind_size">Grind Size *</Label>
              <Input
                id="grind_size"
                value={formData.grind_size}
                onChange={(e) => updateField('grind_size', e.target.value)}
                placeholder="e.g., Medium-Fine"
                className={errors.grind_size ? 'border-destructive' : ''}
              />
              {errors.grind_size && <p className="text-sm text-destructive">{errors.grind_size}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratio">Coffee to Water Ratio *</Label>
              <Input
                id="ratio"
                value={formData.ratio}
                onChange={(e) => updateField('ratio', e.target.value)}
                placeholder="e.g., 1:15"
                className={errors.ratio ? 'border-destructive' : ''}
              />
              {errors.ratio && <p className="text-sm text-destructive">{errors.ratio}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
            Brewing Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            <div className="space-y-2">
              <Label htmlFor="water_temp">Water Temperature (°F) *</Label>
              <Input
                id="water_temp"
                type="number"
                min="80"
                max="212"
                value={formData.water_temp}
                onChange={(e) => updateField('water_temp', parseInt(e.target.value) || 200)}
                className={errors.water_temp ? 'border-destructive' : ''}
              />
              {errors.water_temp && <p className="text-sm text-destructive">{errors.water_temp}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brew_time">Brew Time (seconds) *</Label>
              <Input
                id="brew_time"
                type="number"
                min="30"
                value={formData.brew_time}
                onChange={(e) => updateField('brew_time', parseInt(e.target.value) || 240)}
                className={errors.brew_time ? 'border-destructive' : ''}
              />
              {errors.brew_time && <p className="text-sm text-destructive">{errors.brew_time}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">
            Experience & Notes
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5 stars) *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => updateField('rating', star)}
                    className="p-1 hover:scale-125 transition-all duration-200 hover-lift"
                  >
                  <Star
                    className={`h-6 w-6 ${
                      star <= formData.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating} star{formData.rating !== 1 ? 's' : ''}
              </span>
            </div>
            {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Tasting Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Describe the flavor, aroma, body, acidity..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2 pt-6 border-t border-primary/10">
            {isEditing && onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-coffee hover:opacity-90 transition-all duration-300 hover-lift"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Brew' : 'Log Brew')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}