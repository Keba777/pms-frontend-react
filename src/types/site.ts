import type { Equipment } from "./equipment";
import type { Labor } from "./labor";
import type { Project } from "./project";
import type { User } from "./user";
import type { Warehouse } from "./warehouse";

export interface Site {
    id: string;
    name: string;
    users?: User[]
    projects?: Project[];
    warehouses?: Warehouse[]
    equipments?: Equipment[];
    labors?: Labor[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateSiteInput {
    name: string;
}

export interface UpdateSiteInput {
    id?: string;
    name?: string;
}