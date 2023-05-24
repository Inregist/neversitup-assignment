interface Repository<T> {
  create(entity: T): Promise<T>;

  update(id: number | string, entity: T): Promise<T>;

  delete(id: number | string): Promise<T>;

  findById(id: number | string): Promise<T>;

  findAll(): Promise<T[]>;
}

export default Repository;
