import { Sequelize } from "sequelize/types"

export type GroceryType = {
    name: string,
    cost: number,
}

export const Grocery = Sequelize.create({
    name: {
        DataTypes.STRING,
        allowNull: false,
    },

})

export const Groceries:GroceryType[] = [
    {
        name: 'G1',
        cost: 200,
    },
    {
        name: 'G2',
        cost: 200,
    },
    {
        name: 'G3',
        cost: 200,
    },
    {
        name: 'G4',
        cost: 200,
    },
    {
        name: 'G5',
        cost: 200,
    },
    {
        name: 'G6',
        cost: 200,
    },
    {
        name: 'G7',
        cost: 200,
    },
]