import { Negociacao } from './Negociacao';
/*import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';*/
import {MeuObjeto} from './MeuObjeto';
import { logarTempoDeExecucao } from '../helpers/decorators/index';
//export class Negociacoes implements Imprimivel, Igualavel<Negociacoes>{
export class Negociacoes implements MeuObjeto<Negociacoes>{

    //private _negociacoes: Array<Negociacao> = [];
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao){
        this._negociacoes.push(negociacao);
    }

    //@logarTempoDeExecucao()
    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto() : void {
        console.log("Impressão");
        console.log(JSON.stringify(this._negociacoes));
    }

    

    ehIgual(negociacoes:Negociacoes): boolean{
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}