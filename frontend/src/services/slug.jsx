 
 export const createSlug = (text) => {
    return text
        .trim()  
        .toLowerCase()  
        .replace(/[^a-z0-9\s-]/g, '')  
        .replace(/\s+/g, '-')  
        .replace(/--+/g, '-')  
        .substring(0, 100);  
};
