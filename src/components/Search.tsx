'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '');

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <Label htmlFor="search" title='Seach' />
            <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}
