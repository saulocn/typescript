/*import { Negociacao } from '../models/Negociacao';
import { Negociacoes } from '../models/Negociacoes';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';*/

import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';

let timer = 0;

export class NegociacaoController {
    /*private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;*/

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService();

    constructor(){
        /*this._inputData = <HTMLInputElement> document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement> document.querySelector('#valor');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');*/
        this._negociacoesView.update(this._negociacoes);
    }

    //@logarTempoDeExecucao()
    //adiciona(event:Event){
    @throttle(200)
    adiciona(){
        /*event.preventDefault();
        const negociacao = new Negociacao(
                                new Date(this._inputData.value.replace(/-/g, ',')), 
                                parseInt(this._inputQuantidade.value), 
                                parseFloat(this._inputValor.value));*/
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            this._mensagemView.update("Somente negociações em dias úteis, por favor!");
            return;
        }


        const negociacao = new Negociacao(
            data, 
            parseInt(this._inputQuantidade.val()), 
            parseFloat(this._inputValor.val()));
        this._negociacoes.adiciona(negociacao);
       
        imprime(negociacao, this._negociacoes);
       
       /* negociacao.paraTexto();
        this._negociacoes.paraTexto();
        console.log(
            `Data: ${negociacao.data}
            Quantidade: ${negociacao.quantidade}, 
            Valor: ${negociacao.valor}, 
            Volume: ${negociacao.volume}`
        )
        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });*/
        this._mensagemView.update("Negociação adicionada com sucesso!");
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    //importaDados(){
    async importaDados(){
        try{
            const isOk:HandlerFunction = (res:Response) =>{
                if(res.ok)
                    return res;
                throw new Error(res.statusText);
            }
    
    
            const negociacoesParaImportar = await this._negociacaoService
            .obterNegociacoes(isOk);
    
            const negociacoesJaImportadas = this._negociacoes.paraArray();
    
    
            negociacoesParaImportar
            .filter(negociacao=> 
                !negociacoesJaImportadas.some(jaImportada => 
                    negociacao.ehIgual(jaImportada)))
            .forEach(negociacao => {
                this._negociacoes.adiciona(negociacao)
            });
            this._negociacoesView.update(this._negociacoes);
            
        } catch (err){
            this._mensagemView.update(err.message);
        }
       
 /*
        this._negociacaoService
            .obterNegociacoes(isOk)
           .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();


                negociacoesParaImportar
                .filter(negociacao=> 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => {
                    this._negociacoes.adiciona(negociacao)
                });
                this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => this._mensagemView.update(err.message));
/*
        fetch(`http://localhost:8084/dados`)
        .then(res => isOk(res))
        .then(res => res.json())
        .then((dados:NegociacaoParcial[]) => 
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao)))
        .then(()=> this._negociacoesView.update(this._negociacoes))
        .catch(err => {
            console.log(err.message);
        });
*/
      
        
    }

    private _ehDiaUtil(data:Date){
        return data.getDay() !=DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }
}

enum DiaDaSemana {
    Domingo = 0,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}