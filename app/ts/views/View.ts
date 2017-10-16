//declare var $ : any;
//namespace Views {
    //export abstract class View<T> {
import { logarTempoDeExecucao } from '../helpers/decorators/index';
export abstract class View<T> {
    protected _elemento : JQuery;
    private _escapar : boolean;

    constructor(seletor:string, escapar:boolean = false){
        //this._elemento = document.querySelector(seletor);
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao(true)
    update(modelo: T): void{
        //this._elemento.innerHTML = this.template(modelo);
        let template = this.template(modelo);
        if(this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        this._elemento.html(template);
    }

    abstract template(modelo:T) : string;
}
//}