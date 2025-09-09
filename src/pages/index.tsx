import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import type {BrewEntry } from '@/lib/aws'
import BrewForm from '@/components/Brew_form'
import BrewList from '@/components/Brew_list'
import { Plus, BookOpen } from 'lucide-react'
import { CappuccinoIcon } from '@/components/ui/cappuccino-icon'
import { useToast } from '@/hooks/use-toast'
import coffeeHeroImage from '@/assets/coffee-hero.jpg'
import { awsOperations } from "@/lib/aws";
import { localStorageOperations } from "@/lib/aws";

const Index = () => {
  const { toast } = useToast()
  const [brews, setBrews] = useState<BrewEntry[]>([])
  const [editingBrew, setEditingBrew] = useState<BrewEntry | null>(null)
  const [activeTab, setActiveTab] = useState('log')
  const [isLoading, setIsLoading] = useState(true)

  const loadBrews = async () => {
    try {
  
      const brews = await awsOperations.getAllBrews()
      const sortedBrews = brews.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )
      setBrews(sortedBrews)
    } catch (error) {
      console.info('AWS not configured - using local storage fallback')
      toast({
        title: "Local Storage Mode",
        description: "Your brews are saved locally. Configure AWS DynamoDB for cloud sync.",
        variant: "default"
      })
      const localBrews = localStorageOperations.getBrews()
      const sortedLocalBrews = localBrews.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )
      setBrews(sortedLocalBrews)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBrews()
  }, [])

  const handleCreateBrew = async (brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newBrew = await awsOperations.createBrew(brewData)
      setBrews(current => [newBrew, ...current])
      setActiveTab('view')
    } catch (error) {
      console.error('Error creating brew in AWS:', error)
      const newBrew = localStorageOperations.createBrew(brewData)
      setBrews(current => [newBrew, ...current])
      setActiveTab('view')
    }
  }

  const handleUpdateBrew = async (brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingBrew?.id) return

    try {
      const updatedBrew = await awsOperations.updateBrew(editingBrew.id, brewData)
      setBrews(current =>
        current.map(brew => brew.id === editingBrew.id ? updatedBrew : brew)
      )
    } catch (error) {
      console.error('Error updating brew in AWS:', error)
      try {
        const updatedBrew = localStorageOperations.updateBrew(editingBrew.id, brewData)
        setBrews(current =>
          current.map(brew => brew.id === editingBrew.id ? updatedBrew : brew)
        )
      } catch (localError) {
        console.error('Error updating brew locally:', localError)
      }
    } finally {
      setEditingBrew(null)
      setActiveTab('view')
    }
  }

  const handleDeleteBrew = async (id: string) => {
    try {
      await awsOperations.deleteBrew(id)
      setBrews(current => current.filter(brew => brew.id !== id))
    } catch (error) {
      console.error('Error deleting brew from AWS:', error)
      localStorageOperations.deleteBrew(id)
      setBrews(current => current.filter(brew => brew.id !== id))
    }
  }

  const handleEditBrew = (brew: BrewEntry) => {
    setEditingBrew(brew)
    setActiveTab('log')
  }

  const handleCancelEdit = () => {
    setEditingBrew(null)
    setActiveTab('view')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <CappuccinoIcon className="h-12 w-12 text-primary mx-auto animate-bounce-gentle" />
          <p className="text-primary">Loading your brew log...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-cream">
      <header className="relative bg-gradient-coffee shadow-coffee overflow-hidden animate-fade-in">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${coffeeHeroImage})`,
          }}
        />
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 animate-slide-up">
              <div className="glass-effect p-3 rounded-xl hover-lift">
                <CappuccinoIcon className="h-10 w-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-foreground mb-1">
                  Coffee Brew Log
                </h1>
                <p className="text-primary-foreground/90 text-lg">
                  Brews: {brews.length}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => {
                setEditingBrew(null)
                setActiveTab('log')
              }}
              className="glass-effect text-primary-foreground hover:bg-primary-foreground/20 border border-primary-foreground/20 shadow-warm hover-lift animate-scale-in"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Brew
            </Button>
          </div>
        </div>
      </header>

      <main className="relative min-h-screen">
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 animate-fade-in">
          <div className="glass-effect rounded-2xl p-2 shadow-coffee border border-primary/20">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setEditingBrew(null)
                  setActiveTab('log')
                }}
                className={`group relative p-4 rounded-xl transition-all duration-300 hover-lift ${
                  activeTab === 'log' && !editingBrew
                    ? 'bg-gradient-coffee text-primary-foreground shadow-warm'
                    : 'hover:bg-primary/10 text-primary'
                }`}
                title="Log New Brew"
              >
                <Plus className="h-6 w-6" />
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Log New Brew
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEditingBrew(null)
                  setActiveTab('view')
                }}
                className={`group relative p-4 rounded-xl transition-all duration-300 hover-lift ${
                  activeTab === 'view'
                    ? 'bg-gradient-coffee text-primary-foreground shadow-warm'
                    : 'hover:bg-primary/10 text-primary'
                }`}
                title="View Brews"
              >
                <BookOpen className="h-6 w-6" />
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  View Brews ({brews.length})
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="pl-32 pr-8 py-8 min-h-screen bg-coffee-beans">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 animate-slide-up bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-warm border border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-primary mb-2">
                    {activeTab === 'log' 
                      ? (editingBrew ? 'Edit Your Brew' : 'Create New Brew')
                      : 'Your Brew Collection'
                    }
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {activeTab === 'log' 
                      ? (editingBrew ? 'Update your brewing experience' : 'Record your perfect cup')
                      : `${brews.length} brewing ${brews.length === 1 ? 'session' : 'sessions'} logged`
                    }
                  </p>
                </div>
                
                {editingBrew && (
                  <div className="glass-effect px-4 py-2 rounded-full text-sm text-primary border border-primary/20">
                    Editing: {editingBrew.coffee_type}
                  </div>
                )}
              </div>
            </div>
            <div className="animate-fade-in">
              {activeTab === 'log' && (
                <div className="max-w-4xl">
                  <BrewForm
                    onSubmit={editingBrew ? handleUpdateBrew : handleCreateBrew}
                    initialData={editingBrew || undefined}
                    isEditing={!!editingBrew}
                    onCancel={editingBrew ? handleCancelEdit : undefined}
                  />
                </div>
              )}

              {activeTab === 'view' && (
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-warm border border-primary/10">
                  <BrewList
                    brews={brews}
                    onEdit={handleEditBrew}
                    onDelete={handleDeleteBrew}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </main>
      {brews.length === 0 && !isLoading && (
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-card rounded-lg p-6 shadow-warm max-w-2xl mx-auto hover-lift animate-fade-in">
            <h3 className="text-lg font-semibold text-primary mb-3">
              Get Started with Your Coffee Brew Log
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                To fully enable this app with AWS cloud persistence, you'll need to:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>Set up AWS credentials and DynamoDB table</li>
                <li>Add your AWS configuration to environment variables</li>
                <li>Configure the DynamoDB table with 'id' as primary key</li>
              </ol>
              <p className="text-xs">
                For now, the app works with local storage for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index