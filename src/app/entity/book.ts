export class Book {
    public author: string;
    public name: string;
    public page: number;
    public totalPage: number;
    public update: number;
    
    constructor() {
        this.author = '';
        this.name = '';
        this.page = null;
        this.totalPage = null;
        this.update = 0;
    }
}