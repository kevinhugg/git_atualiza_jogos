document.addEventListener('DOMContentLoaded', () =>{

    //Puxa o carrinho do localStorage ou cria um array vazio se este carrinho não existir
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    //usa uma função para atualizar o carrinho e o localStorage
    function updateCart() {

        //Salva a atualização do carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        //calcula e exibe o total
        calcularTotal();

    }

    //faz o calculo dos produtos e exibe o valor final
    function calcularTotal() {

        //usa o reduce para somar o preço dos itens
        const total = cart.reduce((acc, item) => acc = item.price * item.quantity, 0);

        //exibe o valor final
        console.log(`Total: R$${total.toFixed(2)}`);

    }

    //Adiciona os realizadores de eventos aos botões
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); //Muda a ação padrão do link

            const name = button.getAttribute('data-name'); //Puxa o nome do produto pelo data-name
            const price = parseFloat(button.getAttribute('data-price')); //puxa o preço e transforma em float

            //verifica se o item está no carrinho
            const item = cart.find(i => i.name === name);

            if (item) {
                //se o item ja estiver no carrinho el aumenta em quantidade
                item.quantity += 1;
            }else{
                //se o item não estiver ele é adicionado
                cart.push({ name, price, quantity: 1 });
            }

            //atualiza o carrinho
            updateCart();
        });
    });

    //calcula o total depois do recarregamento da página
    calcularTotal();

});