import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reflexn | Creative Studio',
    description: 'Cool sounds to supercharge digital and real-life moments. Explore our studio.',
}

export default function ReflexnLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
