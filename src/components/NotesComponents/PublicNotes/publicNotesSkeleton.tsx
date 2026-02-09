import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const PublicNotesSkeleton = () => {
  return (
    <article className="flex flex-col gap-4">
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full animate-pulse"
        >
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start w-full gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar Skeleton */}
                  <div className="h-10 w-10 rounded-full bg-[var(--muted)] flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    {/* Name Skeleton */}
                    <div className="h-4 w-32 bg-[var(--muted)] rounded mb-2" />
                    {/* Date Skeleton */}
                    <div className="h-3 w-24 bg-[var(--muted)] rounded" />
                  </div>
                </div>
                {/* Favorite Button Skeleton */}
                <div className="h-9 w-9 rounded-lg bg-[var(--muted)] flex-shrink-0" />
              </div>

              <div className="flex flex-col gap-2">
                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-[var(--muted)] rounded" />
                {/* Language Badge Skeleton */}
                <div className="h-6 w-20 bg-[var(--muted)] rounded-full" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Code Block Skeleton */}
            <div className="rounded-md p-4 bg-[#282a36] space-y-2">
              <div className="h-4 w-full bg-[var(--muted)] rounded opacity-50" />
              <div className="h-4 w-5/6 bg-[var(--muted)] rounded opacity-50" />
              <div className="h-4 w-4/6 bg-[var(--muted)] rounded opacity-50" />
              <div className="h-4 w-full bg-[var(--muted)] rounded opacity-50" />
              <div className="h-4 w-3/4 bg-[var(--muted)] rounded opacity-50" />
            </div>
          </CardContent>
        </Card>
      ))}
    </article>
  )
}
