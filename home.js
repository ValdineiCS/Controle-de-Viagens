const viagens=JSON.parse(localStorage.getItem('viagens'))||[];

const qtd=document.getElementById('qtd');
const valor=document.getElementById('valor')

if(viagens.length>0){
    const total=viagens.reduce((acc, v)=> acc+v.valor,0);
    qtd.textContent=viagens.length;
    valor.textContent=`R$${total.toFixed(2)}`;
}