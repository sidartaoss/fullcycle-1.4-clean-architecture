# Clean Architecture - Validação de Products

- Validação é um assunto que pode se apresentar como ligeiramente controverso quando se fala de _Clean Architecture_ ou _DDD_. Qual o papel da validação na Entidade de Domínio?

- Uma Entidade precisa autovalidar-se para garantir sua invariância; isto é, manter o estado consistente.

- Mas, imaginemos o uso de uma biblioteca externa dentro do Domínio para fazer a validação de uma Entidade. Isso é correto?

- Depende.

- Se formos puristas em relação ao conceito, está errado. Por quê? Porque resulta em acoplar o Domínio a um recurso externo.

- Mas, aí, quando se vê a ampla quantidade de código que é despendido apenas para validar, chegamos a um dilema quando nos deparamos com diversas bibliotecas de validação que podem nos favorecer com mais produtividade.

- Então, é necessário encontrar um balanço entre mais agilidade e, ao mesmo tempo, sem ter que poluir o Domínio inteiro com código de bibliotecas externas (e evitar, também, a famosa Grande Bola de Lama (_Big Ball of Mud_) do _DDD_).

- Nesse caso, como proceder?

- Optamos por utilizar uma biblioteca externa, mas, o Domínio deve evitar ao máximo a dependência dela. Assim, qual a melhor forma de evitar acoplamento?

- Trabalhar com interfaces, isto é, tentar inverter as dependências, de forma a não depender de uma dependência concreta. Por exemplo:

```
export default interface ValidatorInterface<T> {
    validate(entity: T): void;
}
```

- Assim, a biblioteca de validação vai funcionar como uma implementação para o método _validate_ da interface.

- E somamos a isso a criação de uma fábrica de validações:

```
export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustomerYupValidator();
    }
}
```

- Como a fábrica sempre vai retornar a interface de validação, é garantido, pelo menos, a remoção do acoplamento direto entre a Entidade e a biblioteca de validação:

```
validate() {
    CustomerValidatorFactory
        .create()
        .validate(this);
}
```

- Então, caso seja necessário trocar de biblioteca, é só criar uma nova implementação para a interface de validação.

- Dentro desse contexto, este desafio propõe:

  - Realizar o processo de validação na Entidade Product;

  - Rodar os testes para garantir que tudo continua passando.

> N.T 1.: Linguagem de programação para este desafio: _TypeScript_.
> N.T. 2: A solução envolve o arquivo:
> /src/domain/product/entity/product.ts
