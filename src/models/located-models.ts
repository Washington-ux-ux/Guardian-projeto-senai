export interface Located {
    id: number;
    name?: string; 
    possibleMatchId?: number; 

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
        condition?: string; 
        extra?: string;
    };

  
    foundAt: Date;

    location: {
        foundPlace: string;
        city: string;
        state: string;
        referencePoint?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };


    foundBy: {
        name?: string;
        phone?: string;
        email?: string;
    };

  
    currentStatus: {
        location: string; 
        responsibleOrganization?: string; 
        safe: boolean;
    };

   
    contactInfo: {
        phone: string;
        email?: string;
        name?: string;
        whatsapp?: string;
    };

    
    age?: number;
    gender?: "male" | "female" | "other";
    photoUrl?: string;

    status: "unidentified" | "identified" | "reunited";

    createdAt: Date;
    updatedAt?: Date;
}