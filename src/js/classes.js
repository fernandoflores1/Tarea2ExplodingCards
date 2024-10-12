export class Card{
    type;
    description;
    icon;
    value;

    constructor(type, description, icon, value = null){
        this.type = type;
        this.description = description;
        this.icon = icon;
        this.value = value;
    }
}