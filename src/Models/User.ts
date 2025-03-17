class User implements IUser {
    public id;
    public name;
    public age;
    constructor(id: number, name: string, age: number) {
        this.id = id; 
        this.name = name; 
        this.age = age; 
    }
    
}