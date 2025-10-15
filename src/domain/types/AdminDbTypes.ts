import { ICategoryDocument } from "../../infrastructure/db/models/admin/CategoryModel";

export type categoryDbModel = ICategoryDocument &{_id: string};