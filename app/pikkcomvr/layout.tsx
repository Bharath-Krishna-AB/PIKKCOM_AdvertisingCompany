import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'PikkcomVR | Creative Studio',
    description: 'Cool sounds to supercharge digital and real-life moments. Explore our studio.',
}

export default function PikkcomVRLayout({
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
