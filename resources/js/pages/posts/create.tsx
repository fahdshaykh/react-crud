import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

export default function create() {

    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        category: string;
        status: string;
        content: string;
        image: File | null;
    }>({
        title: '',
        category: '',
        status: '',
        content: '',
        image: null
    });

    function handleFormSubmit(e:React.FormEvent) {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                setData({
                    title: '',
                    category: '',
                    status: '',
                    content: '',
                    image: null
                });
            }
        });
    }

    return (
        <>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded border p-6 shadow-xl">
                    
                    <div className="mb-4 flex items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            Create Post
                        </div>

                        <Button>

                            <Link href="/posts"> Back to Posts </Link>
                            
                        </Button>
                    </div>


                    <Card>
                        <CardContent>
                            <form onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor='title'>Title</label>
                                        <Input id='title' placeholder="Title" className="mb-4" value={data.title} onChange={e => setData('title', e.target.value)} 
                                        aria-invalid={!!errors.title}
                                        />

                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor='category'>Category</label>
                                        <Select value={data.category} 
                                        onValueChange={(value) => setData('category', value)}
                                        
                                        >
                                            <SelectTrigger id='category' className="w-[560px]" aria-invalid={!!errors.category}>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="Marvel">Marvel</SelectItem>
                                                <SelectItem value="DC">DC</SelectItem>
                                                <SelectItem value="Arcane">Arcane</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor='status'>Status</label>
                                        <Select value={data.status} 
                                        onValueChange={(value) => setData('status', value)}
                                        aria-invalid={!!errors.status}
                                        >
                                            <SelectTrigger id='status' className="w-[560px]" aria-invalid={!!errors.status}>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor='content'>Content</label>
                                        <Textarea id='content' placeholder="Content" className="mb-4" value={data.content} 
                                        onChange={(e) => setData('content', e.target.value)} 
                                        aria-invalid={!!errors.content}
                                        />
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor='image'>Image</label>
                                        <Input id='image' type="file" className="mb-4" 
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)} 
                                        aria-invalid={!!errors.image}
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                        {data.image && (
                                            <div className="mt-4">
                                                <img src={URL.createObjectURL(data.image)} alt="Preview" className="h-48 w-auto rounded" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <Button size={'lg'} type='submit' disabled={processing}>
                                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Create Post
                                        </Button>
                                    </div>

                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

create.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
