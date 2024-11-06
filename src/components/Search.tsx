'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export default function Search({ placeholder }: { placeholder: string | undefined }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateAddress = (address: string): boolean => {
        const generalBlockchainAddressRegex = /^[a-zA-Z0-9]{26,43}$/;
        return generalBlockchainAddressRegex.test(address);
    };

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            if (!validateAddress(searchTerm)) {
                setError('Invalid blockchain address. Please enter a valid address.');
                return;
            }
            setError('');
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                params.set('query', searchTerm);
            } else {
                params.delete('query');
            }
            await replace(`${pathname}?${params.toString()}`);
        } catch (err) {
            setError('An error occurred while searching');
        } finally {
            setIsLoading(false);
        }
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
                    defaultValue={process.env.DEFAULT_ADDRESS}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                    disabled={isLoading}
                />
                <Button
                    onClick={handleSearch}
                    className="ml-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </Button>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
    );
}
