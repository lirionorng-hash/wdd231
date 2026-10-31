# WDD 231 — S01 Página Inicial do Curso

Projeto da página inicial de **Lirionor Nascimento Guimarães**.

## Publicação

Este projeto é diferente do `wdd131`. Crie ou abra o repositório **wdd231** no GitHub e coloque **os arquivos e subpastas deste ZIP diretamente na raiz**. Não envie a pasta `wdd231_s01_entrega` como subpasta.

A estrutura é:

- `index.html`
- `images/logo.svg` e `images/profile.webp`
- `styles/small.css` e `styles/larger.css`
- `scripts/navigation.js`, `scripts/date.js`, `scripts/course.js`

## Ajustes pessoais a conferir

1. O curso pede que a propriedade `completed` seja verdadeira **apenas para cursos realmente concluídos**. Por não haver confirmação do histórico acadêmico, todos estão marcados `false` em `scripts/course.js`. Altere conforme seu histórico.
2. Substitua o link geral do LinkedIn no `index.html` por seu perfil, caso tenha.
3. O link **Chamber** aponta para `chamber/` e **Final** para `final/`, que serão criados nas semanas seguintes. Antes disso, são caminhos reservados.
4. Verifique se a fotografia existente é a que deseja publicar.
5. A lista de seis cursos foi elaborada conforme o primeiro certificado descrito nas instruções públicas; confirme com o array oficial do curso caso haja atualizações.

## Como testar

Abra no VS Code com Live Server. No Chrome, faça auditoria de **Mobile** no Lighthouse (Acessibilidade, Melhores Práticas e SEO precisam ficar acima de 95 segundo a rubrica), CSS Overview para contraste AA e Network para transferência inicial <= 500 kB. Execute a ferramenta oficial de auditoria WDD 231 da Semana 01. Não afirmamos que o Lighthouse foi executado neste pacote.

Para publicar via Git local:

```bash
git add .
git commit -m "Cria pagina inicial WDD 231"
git push origin main
```

Em Settings > Pages, escolha `Deploy from a branch`, `main`, `/(root)`.

A URL para entregar no Canvas será `https://lirionorng-hash.github.io/wdd231/`, **após** a publicação estar funcional.
