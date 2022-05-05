export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findAll(): Promise<T[]>;
  find(id: string): Promise<T>;
}
