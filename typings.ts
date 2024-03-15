export type Listing = {
    url: string;
    title: string;
    rating: string | null;
    price: string;
    description: string;
    link: string;
    booking_metadata: string;
    rating_count: string | null;
    rating_word: string;
}

export type Result = {
    content: {
        listings: Listing[];
        total_listings: string;
    }
};