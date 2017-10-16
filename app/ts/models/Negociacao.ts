/*import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';*/

import {MeuObjeto} from './MeuObjeto';

//export class Negociacao extends Imprimivel{
//export class Negociacao implements Imprimivel, Igualavel<Negociacao>{
export class Negociacao implements MeuObjeto<Negociacao>{

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number){
        //super();
    }
    

    get volume(){
        return this.quantidade * this.valor;
    }

    /*constructor(private _data: Date, private _quantidade: number, private _valor: number){}

    get data() {
        return this._data;
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }*/

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }

    ehIgual(negociacao:Negociacao): boolean{
        return this.data.getDate()==negociacao.data.getDate() 
                &&
                this.data.getMonth() == negociacao.data.getMonth()
                &&
                this.data.getFullYear() == negociacao.data.getFullYear();
    }
}