export class Filter
{
    field:string;
    values:Array<string>;
    constructor()
    {
        this.field=null;
        this.values=new Array<string>();
    }
}