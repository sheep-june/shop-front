# Shopping Mall – フロントエンド（React + Vite + Tailwind CSS）

## 概要  
このリポジトリは、ショッピングサイトのフロントエンドを React (Vite) と Tailwind CSS で実装しています。  
ユーザー操作に応じた画面遷移、API 呼び出し、状態管理、フォームバリデーション、UI コンポーネントをまとめています。

## 主な機能  
- 会員登録／ログインフォーム（react-hook-form + JWT ヘッダー自動追加）  
- 商品一覧表示・検索・絞り込み  
- 商品詳細ページ（レビュー投稿・表示）  
- カート追加・削除機能  
- 購入履歴ページ  
- お問い合わせフォーム・FAQ  
- 広告バナー・スライダーコンポーネント  
- ルートガード（ProtectedRoute／NotAuthRoute）  

## 技術スタック  
- **言語／フレームワーク**：React (Vite), Tailwind CSS  
- **状態管理**：Redux Toolkit + redux-persist  
- **ルーティング**：React Router v6  
- **フォーム／通知**：react-hook-form, react-toastify  
- **HTTP クライアント**：axios (withCredentials, CSRF 自動送信, JWT ヘッダー)  
- **ユーティリティ**：dayjs, qs  

## セットアップ／実行方法  
1. リポジトリをクローン  
   ```bash

