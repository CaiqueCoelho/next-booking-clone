import { fetchResults } from '@/lib/fetchResults';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    searchParams: SearchParams;
}

export type SearchParams = {
    url: URL,
    ss: string,
    checkin: string,
    checkout: string,
    group_adults: string,
    group_children: string,
    no_rooms: string
}

// I can add async in the component here because this component is server side
export default async function SearchPage({ searchParams }: Props) {
    if(!searchParams.url) return notFound();

    const results = await fetchResults(searchParams)

    if (!results) return <div>No results...</div>

    return (
        <section>
            <div className='mx-auto max-w-7xl p-6 lg:px-8'>
                <h1 className='text-4xl font-bold pb-3'>Your trip results</h1>

                <h2 className='pb-3'>
                    Dates of trip:
                    <span className='italic ml-2'>
                        {searchParams.checkin} to {searchParams.checkout}
                    </span>
                </h2>

                <hr className='mb-5' />

                <h3 className='font-semibold text-xl'>
                    {results.content.total_listings}
                </h3>

                <div className='space-y-2 mt-5'>
                    {results.content.listings.map((listing, index) => (
                        <div
                            key={index}
                            className='flex space-y-2 justify-between space-x-4 p-5 border rounded-lg'
                        >
                            <Image
                                width={44}
                                height={44}
                                className='w-80 h-72 object-cover rounded-lg pb-2'
                                src={listing.url}
                                alt={listing.title}
                            />

                            <div className='flex flex-1 space-x-5 justify-between'>
                                <div>
                                    <Link
                                        href={listing.url}
                                        className='font-bold text-blue-500 hover:text-blue-600 hover:underline'
                                    >
                                        {listing.title}
                                    </Link>
                                    <p className='text-xs'>{listing.description}</p>
                                </div>

                                <div className='flex flex-col justify-between'>
                                    <div className='flex items-start justify-end space-x-2 text-right'>
                                        <div>
                                            <p className='front-bold'>{listing.rating_word}</p>
                                            <p className='front-bold'>{listing.rating_count}</p>
                                        </div>

                                        <p className='flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0'>
                                            {listing.rating || "N/A"}
                                        </p>
                                    </div>

                                    <div className='text-right'>
                                        <p className='text-sm'>{listing.booking_metadata}</p>
                                        <p className='text-2xl front-bold'>{listing.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
