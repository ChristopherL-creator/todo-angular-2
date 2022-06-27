export interface Todo { 
    name: string;
    tags: string[];
    priority: number;
    creationDate: number;
    id?: string; 
    doneDate?: number;
}
