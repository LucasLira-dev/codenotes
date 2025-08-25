// import {Card, CardHeader, CardTitle, CardDescription} from '../ui/card'

interface cardFeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;    
}

export const CardFeature = ({ icon, title, description }: cardFeatureProps) => {
    return(
        <div
        className='flex flex-col bg-[var(--card)] rounded-lg p-4 border-1 border-[var(--border)] hover:shadow-lg transition-shadow'>
            <div
            className="flex flex-col">
                {icon}
                <div
                className="mt-2 text-[var(--foreground)] font-bold">
                    {title}
                </div>
                <div
                className="text-[var(--muted-foreground)]">
                    {description}
                </div>
            </div>
        </div>
    )
}