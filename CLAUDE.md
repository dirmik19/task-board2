# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

SAMURAI task-board プロジェクト。テキスト入力でタスクを追加し、チェックボックスで完了・未完了を切り替え、削除もできるタスクボードアプリ。タスクはブラウザの `localStorage` に保存され、リロードしても消えない。

## デプロイ先

https://dirmik19.github.io/task-board2/

- `main` ブランチへの push をトリガーに、GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) が自動でビルド・デプロイする。
- Vite の `base` は `/task-board2/`(リポジトリ名)に固定しているため、リポジトリ名を変更する場合は [vite.config.ts](vite.config.ts) の `base` も合わせて変更すること。

## 技術スタック

- [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/) 5
- ビルドツール: [Vite](https://vite.dev/) 5(`@vitejs/plugin-react`)
- 状態管理: React標準の `useState` / `useEffect` のみ(外部の状態管理ライブラリは使用しない)
- データ永続化: ブラウザの `localStorage`(バックエンド・DBなし)
- スタイリング: 素のCSS(`App.css` / `index.css`)。CSSフレームワークやCSS-in-JSは導入しない
- デプロイ: GitHub Actions + GitHub Pages

## コンポーネントの命名規約

- コンポーネントファイル・関数名は **PascalCase**(例: `App.tsx` 内の `function App()`)。1ファイル1コンポーネントを基本とする。
- コンポーネントに対応するスタイルシートは同名の `.css` を同階層に置く(例: `App.tsx` ↔ `App.css`)。
- イベントハンドラ関数は `handle` + 対象 + 動作 の **camelCase**(例: `handleAddTask`, `handleToggleTask`, `handleDeleteTask`)。
- 型・インターフェースは **PascalCase**、単数名詞(例: `interface Task`)。
- CSSクラス名は **kebab-case**(例: `task-form`, `task-list`, `delete-button`)。状態を表す修飾クラスは要素名に続けて付与する(例: 完了タスクは `task completed`)。
- ローカルストレージなどのキーは `プロジェクト名:用途` の形式(例: `task-board:tasks`)で衝突を避ける。

## Git運用ルール

- **コードに変更を加えたら、その都度コミットし、GitHubにプッシュすること。** 変更をローカルに溜め込まず、作業のまとまりごとに `git add` → `git commit` → `git push` を実行する。
- コミットメッセージは変更内容が分かるように簡潔に書く(「何を」より「なぜ」を意識する)。
- 破壊的なGit操作(`git push --force`、`git reset --hard`、`git branch -D` など)は、ユーザーの明示的な許可なく実行しない。
- pushする前に `git status` で意図しないファイル(認証情報や秘密情報を含むファイルなど)が含まれていないか確認する。
- リモートリポジトリ(GitHub)が未設定の場合は、先にユーザーに確認してから設定する。

## 開発時の注意事項

- 既存のコードスタイル・命名規則に合わせる。
- 不要な抽象化やコメントを避け、シンプルで読みやすいコードを書く。
- セキュリティ上の問題(認証情報のハードコードなど)を作り込まない。
