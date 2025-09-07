import AWS from 'aws-sdk';

// Configure AWS SDK with my credentials and region
AWS.config.update({
    region: import.meta.env.AWS_REGION,
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
});


const dynamoDB = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = import.meta.env.AWS_TABLE_NAME || 'CoffeeBrewLog'

// representing an entry for a coffee brew , including details that are typically inluded when brewing coffee
export type brew_entry = {
    id?: string
    coffee_type: string
    brew_method: string
    grind_size: string
    water_temp: number
    brew_time: number
    ratio: string
    notes?: string
    rating: number
    created_at?: string
    updated_at?: string
}
// this is a type that represents the different brew methods that are available and they are immutable (as const) will enforce that 
const brew_method = [
  "French Press",
  "Pour Over",
  "Espresso",
  "AeroPress",
  "Cold Brew",
  "Chemex",
  "V60",
  "Moka Pot",
  "Drip Coffee",
] as const; 

export type BrewMethod = typeof brew_method[number];
brew_method.map((method: BrewMethod) => {
  console.log(method);
});
export function isBrewMethod(x: string): x is BrewMethod {
  return (brew_method as readonly string[]).includes(x);
}

                     // aws dynamodb operations 
export const aws_operations = {
    async create_brew_entry(brew_data: Omit<brew_entry, 'id' | 'created_at' | 'updated_at'>): Promise<brew_entry> {
        const id = Date.now().toString()
        const timestamp = new Date().toISOString()
        const item: brew_entry = {
            ...brew_data,
            id,
            created_at: timestamp,
            updated_at: timestamp,
        }

        await dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise()
        return item
        
    },
    async get_brew_entry(id: string): Promise<brew_entry | null> {
        const result = await dynamoDB.get({ TableName: TABLE_NAME, Key: { id } }).promise()
        return result.Item as brew_entry | null
    },
    async update_brew_entry(brew_data: brew_entry): Promise<brew_entry> {
        const timestamp = new Date().toISOString()
        const item: brew_entry = {
            ...brew_data,
            updated_at: timestamp,
        }

        await dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise()
        return item
    },
    async delete_brew_entry(id: string): Promise<void> {
        await dynamoDB.delete({ TableName: TABLE_NAME, Key: { id } }).promise()
    },
    async list_brew_entries(): Promise<brew_entry[]> {
        const result = await dynamoDB.scan({ TableName: TABLE_NAME }).promise()
        return result.Items as brew_entry[]
    },
    async get_brew_by_id(id: string): Promise<brew_entry | null> {
        const result = await dynamoDB.get({ TableName: TABLE_NAME, Key: { id } }).promise()
        return result.Item as brew_entry | null
    },

    async update_brew(id: string, brew_data: Omit<brew_entry, 'id' | 'created_at' | 'updated_at'>): Promise<brew_entry> {
        const timestamp = new Date().toISOString()
        const param = {
            TableName: TABLE_NAME,
            Key: { id },
            UpdateExpression: 'set #coffee_type = :coffee_type, #brew_method = :brew_method, #grind_size = :grind_size, #water_temp = :water_temp, #brew_time = :brew_time, #ratio = :ratio, #notes = :notes, #rating = :rating, #updated_at = :updated_at',
            ExpressionAttributeNames: {
                '#coffee_type': 'coffee_type',
                '#brew_method': 'brew_method',
                '#grind_size': 'grind_size',
                '#water_temp': 'water_temp',
                '#brew_time': 'brew_time',
                '#ratio': 'ratio',
                '#notes': 'notes',
                '#rating': 'rating',
                '#updated_at': 'updated_at',
            },
            ExpressionAttributeValues: {
                ':coffee_type': brew_data.coffee_type,
                ':brew_method': brew_data.brew_method,
                ':grind_size': brew_data.grind_size,
                ':water_temp': brew_data.water_temp,
                ':brew_time': brew_data.brew_time,
                ':ratio': brew_data.ratio,
                ':notes': brew_data.notes,
                ':rating': brew_data.rating,
                ':updated_at': timestamp,
            },
            ReturnValues: 'ALL_NEW',
        }

        const result = await dynamoDB.update(param).promise()
        return result.Attributes as brew_entry
    },
}

    // this will be my local storage for fallback 
export const local_storage_operatios = {
    get_brew_entries(): brew_entry[] {
        const brew_entries = localStorage.getItem('brew_entries')
        return brew_entries ? JSON.parse(brew_entries) : []
    },
    set_brew_entries(brew_entries: brew_entry[]): void {
        localStorage.setItem('brew_entries', JSON.stringify(brew_entries))
        },
    add_brew_entry(brew_entry: brew_entry): void {
        const brew_entries = this.get_brew_entries()
        brew_entries.push(brew_entry)
        this.set_brew_entries(brew_entries)
        },
    update_brew_entry(brew_entry: brew_entry): void {
        const brew_entries = this.get_brew_entries()
        const index = brew_entries.findIndex((entry) => entry.id === brew_entry.id)
        if (index === -1) {
            return
            }
        brew_entries[index] = brew_entry
        this.set_brew_entries(brew_entries)
        },
    delete_brew_entry(id: string): void {
        const brew_entries = this.get_brew_entries()
        const index = brew_entries.findIndex((entry) => entry.id === id)
        if (index === -1) {
            return
            }
        brew_entries.splice(index, 1)
        this.set_brew_entries(brew_entries)
        },
    }


