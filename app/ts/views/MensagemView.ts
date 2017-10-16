//namespace Views {
    //export class MensagemView extends Views.View<string> {
import { View } from './View';
export class MensagemView extends View<string> {

    template(modelo:string) :string {
        return `<p class="alert alert-info">${modelo}</p>`;
    }
}
//}