import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  type: 'minted' | 'listed' | 'escrowed' | 'transferred' | 'verified';
  title: string;
  description: string;
  date: string;
  txHash?: string;
  address?: string;
}

interface OwnershipTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const eventIcons = {
  minted: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  listed: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  escrowed: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  transferred: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  verified: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const eventColors = {
  minted: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  listed: 'bg-primary/20 text-primary border-primary/30',
  escrowed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  transferred: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  verified: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const OwnershipTimeline = ({ events, className }: OwnershipTimelineProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        On-Chain Ownership History
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="relative pl-10">
              {/* Timeline Dot */}
              <div className={cn(
                "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2",
                eventColors[event.type]
              )}>
                {eventIcons[event.type]}
              </div>

              {/* Event Card */}
              <div className="bg-card/50 rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    
                    {event.address && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Address:</span>
                        <code className="text-xs font-mono text-primary">{event.address}</code>
                      </div>
                    )}

                    {event.txHash && (
                      <a 
                        href={`https://polygonscan.com/tx/${event.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                      >
                        <span className="font-mono">{event.txHash}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {event.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        All ownership records are permanently stored on the Polygon blockchain
      </p>
    </div>
  );
};

export default OwnershipTimeline;
