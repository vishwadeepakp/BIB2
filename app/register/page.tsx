import { RegisterComp } from '@/components/register'
import { Suspense } from 'react'
export default function Register() {
    return <Suspense fallback={<div>Loading...</div>}><RegisterComp /></Suspense>
} 