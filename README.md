# Casper

O tema padrão para a plataforma de blogs [Ghost](http://github.com/MatheusMK3/Casper-pt_BR/), traduzida para o Português Brasileiro.

Esta é a versão mais recente da tradução, em desenvolvimento. Você pode encontrar as releases mais recentes do tema oficial [aqui](https://github.com/TryGhost/Casper/releases), ou (futuramente) da tradução [aqui](https://github.com/MatheusMK3/Casper-pt_BR/releases).

&nbsp;

![screenshot-desktop](https://user-images.githubusercontent.com/120485/27221326-1e31d326-5280-11e7-866d-82d550a7683b.jpg)

&nbsp;


# Tradução

Esta é tradução open-source, com objetivo de incentivar o uso do Ghost no Brasil e ampliar sua comunidade. Sinta-se à vontade para explorar o código e sugerir novas traduções ou correções!

## Não seria melhor usar o [WorldCasper2](https://github.com/juan-g/WorldCasper2)?

Algumas partes do tema, como a formatação de datas, precisam ser alteradas diretamente nos templates. Portanto, foi melhor criar um projeto dedicado ao português brasileiro.

Porém, caso queria utilizar o WorldCasper2, o arquivo de localizações utilizado neste tema utiliza o mesmo padrão de nomenclatura, podendo assim ser usado.

## As datas dos meus posts estão erradas, como posso corrigir?

Você pode alterar as opções "Set timezone" e "Publication language" de seu blog para corrigir a exibição de datas nos posts.
Estas opções podem ser encontradas em "SETTINGS > General"


# Primeira vez usando um tema do Ghost?

O Ghost usa o sistema de templates [Handlebars](http://handlebarsjs.com/).

Nós documentamos nosso tema padrão de uma forma que seja bem fácil de se entender o que está sendo feito, apenas lendo o código e os comentários. Quando já estiver mais à vontade com tudo, leia nossa [documentação da API de temas](https://themes.ghost.org), que explica cada um dos helpers e templates do Handlebars.

**Os arquivos principais são:**

- `default.hbs` - Arquivo principal do tema
- `index.hbs` - Usado na home do blog
- `post.hbs` - Usado para posts individuais
- `page.hbs` - Usado para páginas individuais
- `tag.hbs` - Usado para listagens de tags
- `author.hbs` - Usado para listagens de autores

Um truque bem interessante é que você pode criar templates espaeciais para páginas e templates! Basta inserir a slug do endereço na frente do arquivo. Por exemplo:

- `page-sobre.hbs` - Template personalizado para a página `/sobre/`
- `tag-noticias.hbs` - Template personalizado para a listagem de tags `/tag/noticias/`
- `author-matt.hbs` - Template personalizado para o autor `/author/matt/`


# Desenvolvimento

Os estilos do Casper são compilados utilizando Gulp e PostCSS para aplicar polyfills de funcionalidades CSS ainda não lançadas. Para utilizar, você precisará ter o Node e o Gulp instalados globalmente. Após isto, vá na pasta do tema e execute:

```bash
$ yarn install
$ yarn dev
```

Agora você pode editar os arquivos `/assets/css/`, que serão compilados para a pasta `/assets/built/` automaticamente.

A tarefa Gulp `zip` irá comprimir os arquivos do tema em `dist/<nome-do-tema>.zip`, facilitando o upload no seu blog.

```bash
$ yarn zip
```

# Funcionalidades do PostCSS Utilizadas

- Autoprefixer - Elimina a necessidade de se escrever extensões e prefixos específicos para cada navegador. Tudo é feito automaticamente, com suporte para as últimas duas versões "major" de cada navegador.
- Variáveis - Variáveis CSS simples e puras
- [Função Color](https://github.com/postcss/postcss-color-function)


# Ícones SVG

O Casper utiliza ícones inline em SVG, que são incluídos utilizando partials do Handlebars. Você pode encontrar todos os ícones dentro da pasta `/partials/icons`. Para utilizar um ícone, apenas inclua o nome do arquivo relevante. Por exemplo, para incluir o arquivo SVG `/partials/icons/rss.hbs`, utilize: `{{> "icons/rss"}}`.

Você pode adicionar seus próprios ícones SVG da mesma forma.


# Copyright & Licenças

Copyright (c) 2013-2018 Ghost Foundation - Released under the [MIT license](LICENSE).
