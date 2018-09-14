// Array contendo todos ingredientes selecionados
var ingredientes = [];

// Número máximo de ingredientes
var numMaximoDeIngredientes = 2;

// Tamanho do prato
var tamanhoPrato;

var enviarBtn = document.querySelector("#enviar");
enviarBtn.addEventListener("click", function(event){
	event.preventDefault();
	enviarForm(obterForm());
	for (var i = 0; i < ingredientes.length; i++) {
		console.log(i + ": " + ingredientes[i].name)
	}
});

var radios = document.querySelectorAll("#tam");
radios.forEach(function(radio){
	radio.addEventListener("click", function(){
		tamanhoPrato = radio.value;
	});
});

function obterForm(){
	console.log("Obtendo form");
	var form = {
		nome: document.querySelector("#nome").value,
		idade: document.querySelector("#idade").value,
		tamanho: tamanhoPrato
	};
	console.log(form.nome);
	console.log(form.idade);
	console.log(form.tamanho);
	return form;
}

function validarForm(form){
	console.log("Validando form");
	var erros = [];
	if(form.nome.length === 0){
		erros.push({
			desc: "Nome inválido!",
			id: "#erro-nome"
		});
	}
	if(form.idade <= 0){
		erros.push({
			desc: "Idade inválida!",
			id: "#erro-idade"
		});
	}
	if(form.tamanho === undefined){
		erros.push({
			desc: "Selecione um tamanho de prato.",
			id: "#erro-tamanho"
		});
	}
	return erros;
}

function enviarForm(form){
	console.log("Enviando form");
	var msgs = document.querySelectorAll(".erro");
	msgs.forEach(function(msg){
		msg.innerHTML = "";
	});
	var erros = [];
	erros = validarForm(form);
	if(erros.length > 0){
		erros.forEach(function(erro){
			var lab = document.querySelector(erro.id);
			lab.innerHTML = erro.desc;
		});
	}
}

function selecionar(num){
  numMaximoDeIngredientes = num;

  // Se selecionar um número máximo de ingredientes
  // menor que o número de ingredientes que estão no Array,
  // faço a diferença e removo do Array
  if(numMaximoDeIngredientes < ingredientes.length){
    var dif = ingredientes.length - numMaximoDeIngredientes;
    console.log("Dif: " + dif);
    for (var i = ingredientes.length-1; i >= numMaximoDeIngredientes; i--) {
      console.log("Removi " + ingredientes[i].name);
      ingredientes[i].checked = false;
      ingredientes.pop();
    }
  }

}

function handleClick(ingre){
  // Se a checkbox for ativada
	if(ingre.checked){
    // Verifico se pode adicionar ingrediente
		if(ingredientes.length < numMaximoDeIngredientes){
			ingredientes.push(ingre);
			console.log("adicionei " + ingre.name);
		}else{
			ingre.checked = false;
      console.log("não adicionei " + ingre.name);
		}
	}
  // Se a checkbox for desativada
	else if(!ingre.checked){
    // Precaução
    if(ingredientes.length === 0){
      console.log("Array vazio antes de desativar checkbox");
      return;
    }
    // Se houver 1 ingrediente, apenas removo
    if(ingredientes.length === 1){
      console.log("removi " + ingredientes[ingredientes.length-1].name);
  		ingredientes.pop();
    }
    // Se houver mais de 1 ingrediente,
    // procuro por ele no array e troco
    // ele de posição com o último para remover
    else{
      var index;
      for (var i = 0; i < ingredientes.length; i++) {
        if(ingredientes[i].name === ingre.name){
          console.log("Encontrei " + ingredientes[i].name + " na posição " + i);
          console.log("Último ingrediente no array: " + ingredientes[ingredientes.length-1].name);
          index = i;
          i = ingredientes.length;
        }
      }
      var aux = ingredientes[index];
			ingredientes[index] = ingredientes[ingredientes.length-1];
			ingredientes[ingredientes.length-1] = aux;
      console.log("---------");
      console.log("Troquei de posição:");
      console.log("index: " + ingredientes[index].name);
      console.log("último: " + ingredientes[ingredientes.length-1].name);
      console.log("removi " + ingredientes[ingredientes.length-1].name);
  		ingredientes.pop();
    }
  }
}
