export type UserData={
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imagePath: string;
    isVerified: boolean;
}

type tag =  "View" | "Experience" | "Food"

export type Nodes={
    id: string;
    createdAt: Date;
    title: string;
    coordinates: string;
    imageUrl: string;
    content: string;
    visitDate: Date;
    tags: tag[];
    userId: string;
}