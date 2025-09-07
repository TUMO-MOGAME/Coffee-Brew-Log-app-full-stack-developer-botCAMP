import {cn} from "@/lib/utils"

interface CappuccinoIconProps {
  className?: string
}

export const CappuccinoIcon = ({ className }: CappuccinoIconProps) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="currentColor"
      >
        {/* Cup body */}
        <path
          d="M20 35 L20 75 Q20 85 30 85 L60 85 Q70 85 70 75 L70 35 Z"
          className="fill-current opacity-90"
        />
        
        {/* Cup rim */}
        <ellipse
          cx="45"
          cy="35"
          rx="25"
          ry="4"
          className="fill-current"
        />
        
        {/* Coffee surface */}
        <ellipse
          cx="45"
          cy="38"
          rx="22"
          ry="3"
          className="fill-current opacity-80"
        />
        
        {/* Foam/milk foam */}
        <ellipse
          cx="45"
          cy="36"
          rx="20"
          ry="2.5"
          className="fill-current opacity-60"
        />
        
        {/* Handle */}
        <path
          d="M70 45 Q80 45 80 55 Q80 65 70 65"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="opacity-90"
        />
        
        {/* Saucer */}
        <ellipse
          cx="45"
          cy="88"
          rx="30"
          ry="3"
          className="fill-current opacity-40"
        />
      </svg>
      
      {/* Animated steam */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Steam wisps */}
          <div className="absolute animate-steam-rise-1">
            <svg width="4" height="20" viewBox="0 0 4 20" className="text-current opacity-60">
              <path
                d="M2 20 Q1 15 2 10 Q3 5 2 0"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute left-2 animate-steam-rise-2">
            <svg width="4" height="18" viewBox="0 0 4 18" className="text-current opacity-50">
              <path
                d="M2 18 Q3 13 2 8 Q1 3 2 0"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute -left-2 animate-steam-rise-3">
            <svg width="4" height="16" viewBox="0 0 4 16" className="text-current opacity-40">
              <path
                d="M2 16 Q1 11 2 6 Q3 1 2 0"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      
    </div>
  )
}