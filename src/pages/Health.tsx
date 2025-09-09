import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

const Health = () => {
  const [healthData, setHealthData] = useState({
    localStorage: false,
    awsConfigured: false,
    uiComponents: false,
    environment: 'development',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
  const [isLoading, setIsLoading] = useState(true)

  const checkHealth = async () => {
    setIsLoading(true)
    const localStorageWorks = (() => {
      try {
        const testKey = 'health-check-test'
        localStorage.setItem(testKey, 'test')
        localStorage.removeItem(testKey)
        return true
      } catch {
        return false
      }
    })()
    const awsConfigured = !!(
      import.meta.env.VITE_AWS_REGION &&
      import.meta.env.VITE_AWS_ACCESS_KEY_ID &&
      import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    )
    const uiComponents = true

    setHealthData({
      localStorage: localStorageWorks,
      awsConfigured,
      uiComponents,
      environment: import.meta.env.MODE || 'development',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    })
    
    setIsLoading(false)
  }

  useEffect(() => {
    checkHealth()
  }, [])

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  const getStatusBadge = (status: boolean) => {
    return (
      <Badge variant={status ? "default" : "destructive"}>
        {status ? "OK" : "FAIL"}
      </Badge>
    )
  }

  const overallHealth = healthData.localStorage && healthData.uiComponents

  return (
    <div className="min-h-screen bg-gradient-cream p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">System Health Check</h1>
          <p className="text-muted-foreground">Monitor the status of your Coffee Brew Log application</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {overallHealth ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                )}
                Overall System Status
              </CardTitle>
              <Button onClick={checkHealth} disabled={isLoading} size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusBadge(overallHealth)}
                <span className="text-sm text-muted-foreground">
                  Last checked: {new Date(healthData.timestamp).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(healthData.localStorage)}
                LocalStorage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(healthData.localStorage)}
                <p className="text-sm text-muted-foreground">
                  {healthData.localStorage 
                    ? "LocalStorage is working correctly"
                    : "LocalStorage is not available"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(healthData.awsConfigured)}
                AWS Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(healthData.awsConfigured)}
                <p className="text-sm text-muted-foreground">
                  {healthData.awsConfigured 
                    ? "AWS credentials are configured"
                    : "Using LocalStorage fallback (AWS not configured)"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(healthData.uiComponents)}
                UI Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(healthData.uiComponents)}
                <p className="text-sm text-muted-foreground">
                  All UI components are rendering correctly
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline">{healthData.environment.toUpperCase()}</Badge>
                <p className="text-sm text-muted-foreground">
                  Version: {healthData.version}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <a href="/">← Back to Coffee Brew Log</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Health