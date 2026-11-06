# WDD 231 — Projeto S01 + S02

## Estrutura

- `index.html`: página S01 já preparada anteriormente.
- `camara/diretorio.html`: página exigida para S02.
- `camara/estilos/`: normalizar.css, telas-pequenas.css, telas-grandes.css.
- `camara/scripts/`: menu.js, datas.js, diretorio.js.
- `camara/dados/membros.json`: 8 membros fictícios, com 7 campos obrigatórios e informações adicionais.
- `camara/imagens/`: favicon, compartilhamento e 8 imagens distintas de membros.
- `camara/inicio.html`, `associar.html`, `descobrir.html`: páginas mínimas de navegação, explicitamente marcadas como futuras; sem antecipar o conteúdo das semanas seguintes.

## Publicação sem quebrar a S01

No seu repositório `wdd231`, envie **as pastas e arquivos do interior deste ZIP**, sem criar uma segunda pasta `wdd231`.

Link para a entrega da S02:

https://lirionorng-hash.github.io/wdd231/camara/diretorio.html

### Para testar localmente

Use VS Code → Live Server. O arquivo JSON é carregado por `fetch`; abrir `diretorio.html` diretamente com `file://` bloqueia esse carregamento em vários navegadores.

### Auditorias ainda necessárias

Execute a auditoria oficial S02, Lighthouse mobile (Acessibilidade, Melhores Práticas e SEO > 95), CSS Overview nível AA e DevTools Network transferência ≤ 500 KB. Estes resultados dependem da página publicada e **não são garantidos apenas por inspeção de código**.

### Dados de demonstração

As empresas e contatos são inventados, conforme a permissão do enunciado. Os links de sites remetem a `https://example.com/` (domínio oficial reservado para exemplos). Substitua por empresas reais e suas URLs se desejar tornar o diretório factual.

## Git com o projeto extraído em seu repositório local

```bash
git add .
git commit -m "Implementa diretorio da camara S02"
git push origin main
```
