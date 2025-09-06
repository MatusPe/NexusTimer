'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';
import Navigation from '@/components/navigation/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useUsers } from '@/hooks/api/useUsers';
import FadeIn from '@/components/fade-in/fade-in';
import { UserDocument } from '@/models/user';
import { useRouter, useSearchParams } from 'next/navigation';
import ButtonNavbar from '@/components/navigation/buttons/button-navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeZones } from '@/enums/Timezones';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TablePagination } from '@/components/people/table-pagination';
import { UserCard } from '@/components/people/user-card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const region = searchParams.get('region')
  const page = searchParams.get('page')
  const [searchTerm, setSearchTerm] = useState(search)
  const [selectedRegion, setSelectedRegion] = useState(region || 'all');

  const { data, isLoading } = useUsers({
    name: search || undefined,
    region: region || undefined,
    page: Number(page) || 0
  });

  const regionOptions = useMemo(() => Object.values(TimeZones), []);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    }
    if (selectedRegion && selectedRegion !== 'all') {
      newSearchParams.set('region', selectedRegion);
    } else {
      newSearchParams.delete('region');
    }
    newSearchParams.set('page', '0');
    router.push(`/people?${newSearchParams.toString()}`);
  };

  return (
    <ScrollArea className={'max-h-dvh overflow-auto'}>
    <FadeIn>
      <div className="px-2 pt-2 flex flex-col w-full">
        <Navigation showMenu={false}>
          <div className={'flex flex-col sm:flex-row items-center justify-between gap-2'}>
            <SidebarTrigger/>
            <div className={'flex sm:flex-row items-center gap-3 w-full justify-end'}>
              <div className={'flex flex-col sm:flex-row items-center gap-2 grow justify-end'}>
                <Input
                  placeholder={'Search by name'}
                  value={searchTerm || ''}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:max-w-sm"
                />
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Region"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {regionOptions.sort().map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size={'icon'} onClick={handleSearch}><MagnifyingGlassIcon/></Button>
            </div>
          </div>
        </Navigation>

        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 overflow-auto pb-10'}>
          {isLoading && Array(10).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden min-h-96">
              <CardHeader className="pb-2 flex flex-col items-center">
                <Skeleton className="size-24 rounded-full mb-2"/>
                <Skeleton className="h-6 w-32 mb-1"/>
                <Skeleton className="h-4 w-40"/>
              </CardHeader>
              <CardContent className="pb-2 pt-0 flex flex-col items-center">
                <Skeleton className="h-4 w-36 mb-2"/>
                <Skeleton className="h-5 w-16"/>
              </CardContent>
              <CardFooter className="pt-2 flex justify-center">
                <Skeleton className="h-8 w-24"/>
              </CardFooter>
            </Card>
          ))}

          {!isLoading && (!data?.events || data.events.length === 0) && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria</p>
            </div>
          )}

          {!isLoading && data?.events && data.events.length > 0 && data.events.map((user: UserDocument) =>
            <UserCard key={user._id} user={user}/>)}
        </div>

        <div className={'opacity-70 text-xs ps-4 pt-2'}>Results: {data?.docs || 0}</div>

        {!isLoading && (
          <TablePagination
            page={data.page}
            pages={data?.pages}
            selectedRegion={selectedRegion}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </FadeIn>
    </ScrollArea>
  );
}


