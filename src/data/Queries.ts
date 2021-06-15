export const queries = (tablename: string) => ({
    getAll: () => `SELECT * FROM ${tablename}`,
    getById: (id:any) => `SELECT * FROM ${tablename} WHERE id=${id}`,
});