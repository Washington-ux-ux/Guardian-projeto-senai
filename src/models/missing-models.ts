export interface Missing {
    id: number;
    name: string;

    description: {
        nickname?: string;
        skinColor?: string;
        hairColor?: string;
        eyeColor?: string; 
        height?: number; 
        behavior?: string;
        clothes?: string;
        accessories?: string;
        physicalDetails?: string;
        lastSeenCondition?: string;
        extra?: string;
    };

    date: Date;

    location: {
        lastSeen: string;
        city: string;
        state: string;
        referencePoint?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };

    contactInfo: {
        phone: string;
        whatsapp?: string;
        email?: string;
        name?: string;
    };

    age?: number;

    gender?: "male" | "female" | "other";

    photoUrl?: string;

    status: "missing" | "found";

    createdAt: Date;
    updatedAt?: Date;

    
}