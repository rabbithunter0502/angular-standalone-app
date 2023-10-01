
export interface ICategory {
    key: string;
    value: string;
}
export interface IProject {
    id: string;
    title: string;
    description?: string;
    image?: string;
    category?: ICategory;

}
