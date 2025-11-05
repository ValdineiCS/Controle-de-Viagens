let form=document.getElementById('formViagem')

let inOrigem=document.getElementById('inOrigem');
let inDestino=document.getElementById('inDestino');
let inDistancia=document.getElementById('inDistancia');
let inValor=document.getElementById('inValor');
let botao=document.getElementById('botSalvar')
let msg=document.getElementById('msg')
botao.addEventListener('click', e=>{
    e.preventDefault();

    const origem=inOrigem.value;
    const destino=inDestino.value;
    const distancia=Number(inDistancia.value);
    const valor=Number(inValor.value);

    if(!origem || !destino || distancia<=0 || valor<=0){
        msg.textContent='Preencha todos os campos corretamente.';
        msg.style.color='red';
        return;
    }

    const viagem={ origem, destino, distancia, valor};

    const viagens=JSON.parse(localStorage.getItem('viagens'))|| [];
    viagens.push(viagem);

    localStorage.setItem('viagens', JSON.stringify(viagens));
    msg.textContent="Viagem salva com sucesso!"
    msg.style.color='lime';
    setTimeout(()=>msg.textContent='', 3000)

    form.reset();

});