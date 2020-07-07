export default interface ApiAntikvitetDto {
    antikvitetId?: number;
    name?: string;
    year?: string;
    description?: string;
    price?: number;
    countryId?: number;
    ingredients?: {
        ingredient: number;
    };
    photos?: {
        
        imagePath: string
    };


}