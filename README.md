# Página “1 mês de trenzinhos”

Mini site romântico, pronto para publicar no GitHub Pages.

## Como colocar as fotos definitivas

1. Abra a pasta `assets/fotos`.
2. Apague ou substitua os arquivos:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`
   - ...
   - `foto8.jpg`
3. Use exatamente esses nomes nos novos arquivos.
4. A primeira imagem (`foto1.jpg`) será a foto principal ao abrir o site.

Caso queira usar mais ou menos fotos, abra `js/app.js` e altere a lista `fotosIniciais`.

Exemplo:

```js
const fotosIniciais = [
  "assets/fotos/foto1.jpg",
  "assets/fotos/foto2.jpg",
  "assets/fotos/foto3.jpg"
];
```

## Sobre o botão “Adicionar fotos”

O botão permite escolher imagens no celular ou computador, mas elas aparecem apenas naquele aparelho e durante aquela visita.

Para sua namorada abrir o link e já visualizar as fotos, coloque os arquivos na pasta `assets/fotos` antes de publicar.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas deste projeto.
3. No repositório, vá em:
   `Settings` → `Pages`
4. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Pasta: `/root`
5. Clique em `Save`.
6. O GitHub mostrará o endereço público da página.

O link terá um formato parecido com:

`https://seuusuario.github.io/nome-do-repositorio/`

## Personalizar o texto

Abra `index.html` e procure o bloco:

```html
<p class="love-note">
```

Edite o texto dentro dele.

## Estrutura

- `index.html`: conteúdo da página
- `css/style.css`: aparência
- `js/app.js`: carrossel, animações e envio local de fotos
- `assets/fotos`: fotos da página
