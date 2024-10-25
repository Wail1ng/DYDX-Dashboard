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

    const [error, setError] = useState('');

    const validateAddress = (address: string): boolean => {
        const generalBlockchainAddressRegex = /^[a-zA-Z0-9]{26,35}$/;
        return generalBlockchainAddressRegex.test(address);
    };

    const handleSearch = () => {
        /* if (!validateAddress(searchTerm)) {
            setError('Invalid blockchain address. Please enter a valid address.');
            return; 
        }*/
        setError('');

        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex flex-col flex-1 flex-shrink-0">
            <div className="flex">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <Input
                    id="search"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handleSearch} className="ml-2">
                    Search
                </Button>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
    );
}
