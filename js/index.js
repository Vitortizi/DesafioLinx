var page = 1;

// Executa o documento o inicializar carregamento da página
$(document).ready(function () {
    $.get("https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1", function (data, status) {
        if (status == 'success') {
            for (let e = 0; e < data.products.length; e++) {
                var element = data.products[e];

                // Atribui o produto na pagina HTML
                $('#list-products').append(`
                    <div class="col-12 mt-4" id="">
                        <div class="w-item">
                            <div class="col-md-12">
                                <img class="img-product" src="http:${element.image}" alt="">
                            </div>

                            <div class="col-md-12 mt-1">
                                <p class="name-products">${element.name}</p>
                                <p class="description-value-products mt-1">${element.description}</p>
                                <p class="description-value-products mt-1">${formatCurrency(element.oldPrice)}</p>
                                <p class="value-products mt-1">${formatCurrency(element.price)}</p>
                                <p class="description-value-products mt-1">ou 2x de ${formatCurrency(element.price / 2)}</p>

                                <button class="buyButton mt-1">Comprar</button>
                            </div>
                        </div>
                    </div>
                `);
            }
        } else {
            $('#list-products').append(``);
        }
    });
})

// Paginação dos produtos
function viewMore() {
    page++;

    $.get(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`, function (data, status) {
        if (status == 'success') {
            for (let e = 0; e < data.products.length; e++) {
                var element = data.products[e];

                // Atribui o produto na pagina HTML
                $('#list-products').append(`
                    <div class="col-12 mt-4" id="">
                        <div class="w-item">
                            <div class="col-md-12">
                                <img class="img-product" src="http:${element.image}" alt="">
                            </div>

                            <div class="col-md-12 mt-1">
                                <p class="name-products">${element.name}</p>
                                <p class="description-value-products mt-1">${element.description}</p>
                                <p class="description-value-products mt-1">${formatCurrency(element.oldPrice)}</p>
                                <p class="value-products mt-1">${formatCurrency(element.price)}</p>
                                <p class="description-value-products mt-1">ou 2x de ${formatCurrency(element.price / 2)}</p>
                                <button class="buyButton mt-1">Comprar</button>
                            </div>
                        </div>
                    </div>
                `);
            }
        } else {
            $('#list-products').append(``);
        }
    });
}

// Paginação dos produtos
$("input").change(function (e) {
    var userinput = $(e.target).val();
    var pattern = '';

    if (e.target.id == 'email' || e.target.id == 'email2') {
        pattern = new RegExp(/^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);

        if (!pattern.test(userinput)) {
            alert('Not a valid e-mail address');
            $("#email").val("");
            return;
        }

        return;
    } else if (e.target.id == 'cpf') {
        cpf = userinput.replace(/[^\d]+/g, '');

        if (validCpf(cpf)) {
            return;
        } else {
            alert('Not a valid CPF');
            $("#cpf").val("");
            return;
        }
    }
});

function validCpf(cpf) {
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;

    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

// Formata o valor do produto para BRL
function formatCurrency(params) {
    var price = params.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return price;
}


