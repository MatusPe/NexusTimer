import { UserDocument } from '@/models/user';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, ExternalLink, GitCompareIcon } from 'lucide-react';
import moment from 'moment/moment';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useCompareUsersStore } from '@/store/CompareUsers';

export const UserCard = ({ user }: { user: UserDocument }) => {
  const router = useRouter();
  const addUser = useCompareUsersStore(state => state.addUser);
  const removeUser = useCompareUsersStore(state => state.removeUser);
  const users = useCompareUsersStore(state => state.users);
  const isAdded = users.find(u => u._id === user._id);

  return (
    <Card
      className="transition-all duration-200 animate-fadeIn h-auto"
    >
      <CardHeader className="pb-2 flex flex-col items-center">
        <Avatar className="size-24 mb-2 ring-2 ring-primary/30">
          <AvatarImage className={'object-cover'} src={user.image} alt={user.name}/>
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-center">{user.name}</h2>
      </CardHeader>
      <CardContent className="pb-2 pt-0 flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <Calendar className="size-3.5"/>
          <span>Joined {moment(user.createdAt).format('MMM Do YYYY')}</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button
            onClick={() => isAdded ? removeUser(user._id) : addUser(user)}
            variant={isAdded ? "secondary": "ghost"}
            size="sm"
            className="gap-1 text-xs"
          ><GitCompareIcon/> Compare</Button>
          <Button
            size="sm"
            className="gap-1 text-xs"
            onClick={() => router.push(`/people/${user._id}`)}
          >
            View Profile <ExternalLink className="size-3.5"/>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
