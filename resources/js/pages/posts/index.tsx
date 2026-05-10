import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRef } from 'react';
import { debounce } from 'lodash';
import InertiaPagination from '@/components/inertia-pagination';

interface PostType {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
    image: string | null;
}

interface LinksType {
    url: string;
    label: string;
    active: boolean;
}

interface PostsType {
    data: PostType[];
    links: LinksType[];
    from: number;
    to: number;
    total: number;
}

export default function index({ posts }: { posts: PostsType }) {

    const {flash} = usePage<{ flash: { success?: string; error?: string } }>().props;

    console.log(posts);

    const handleSearch = useRef(
        debounce((value: string) => {

            router.get(
                '/posts',
                { search: value },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500)
    ).current;

    function onSearchChange(value: string) {
        handleSearch(value);
    }

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);

    return (
        <>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded border p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Input placeholder="Search posts..." type='search' onChange={(e) => onSearchChange(e.target.value)} className="mb-4" />
                        </div>

                        <Button>

                            <Link href="/posts/create"> Create Post </Link>
                            
                        </Button>
                    </div>

                    
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                 <TableBody>
                                        {posts.data?.map((post, index) => (
                                            <TableRow key={post.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    {post.image ? (
                                                        <img src={`/storage/${post.image}`} alt={post.title} className="w-14 rounded" />
                                                    ) : (
                                                        <PlaceholderPattern />
                                                    )}
                                                </TableCell>
                                                <TableCell>{post.title}</TableCell>
                                                <TableCell>{post.content}</TableCell>
                                                <TableCell>{post.category}</TableCell>
                                                <TableCell>
                                                    <Badge className={post.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                                                        {post.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-1">
                                                    <Button asChild size={'sm'}>
                                                        <Link href={`/posts/${post.id}/edit`} prefetch>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button size={'sm'} variant={'destructive'}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <InertiaPagination posts={posts} />
                </div>
            </div>
        </>
    );
}

index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
