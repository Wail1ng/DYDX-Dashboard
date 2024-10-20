'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { format, addDays, subMonths, startOfMonth, endOfMonth, startOfDay } from 'date-fns';


import { Calendar as CalendarIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react';
import { DateRange } from 'react-day-picker';

export default function FilterDate({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchOption, setSearchOption] = useState(searchParams.get('filterMonth') ?? '');
    const [date, setDate] = useState<DateRange | undefined>(() => {
        const fromParam = searchParams.get('fromDateTime');
        const toParam = searchParams.get('toDateTime');
        if (fromParam && toParam) {
            return {
                from: new Date(fromParam),
                to: new Date(toParam)
            };
        }
        return undefined;
    });

    useEffect(() => {
        handleSearch();
    }, [searchOption, date]);

    const getDateRangeForOption = (option: string): DateRange => {
        const today = startOfDay(new Date());
        switch (option) {
            case 'current':
                return { from: startOfMonth(today), to: endOfMonth(today) };
            case 'lastMonth':
                const lastMonth = subMonths(today, 1);
                return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
            case 'last3Month':
                return { from: startOfMonth(subMonths(today, 3)), to: today };
            case 'last6Month':
                return { from: startOfMonth(subMonths(today, 6)), to: today };
            default:
                return { from: undefined, to: undefined };
        }
    };

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        let dateRange = date;

        if (searchOption) {
            dateRange = getDateRangeForOption(searchOption);
        }

        if (dateRange?.from) {
            params.set('fromDateTime', format(dateRange.from, 'yyyy-MM-dd'));
        } else {
            params.delete('fromDateTime');
        }

        if (dateRange?.to) {
            params.set('toDateTime', format(dateRange.to, 'yyyy-MM-dd'));
        } else {
            params.delete('toDateTime');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex flex-1 flex-shrink-0 flex-col space-y-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && !searchOption && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : searchOption ? (
                            <span>{searchOption}</span>
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <Select
                        onValueChange={(value) => {
                            setSearchOption(value);
                            setDate(undefined);
                        }}
                        value={searchOption}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="current">Current Month</SelectItem>
                            <SelectItem value="lastMonth">Last Month</SelectItem>
                            <SelectItem value="last3Month">Last 3 Months</SelectItem>
                            <SelectItem value="last6Month">Last 6 Months</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={(newDate) => {
                                setDate(newDate);
                                setSearchOption('');
                            }}
                            numberOfMonths={2}
                        />
                    </div>
                </PopoverContent>
            </Popover>
            <Label htmlFor="search">{placeholder}</Label>
            <Button onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}