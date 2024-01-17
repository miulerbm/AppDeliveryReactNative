export interface Category {
  id?: string; // Es opcional porque a la hora de crear una nueva categoría, este id no existirá (momentáneamente)
  name: string;
  description: string;
  image: string;
}
