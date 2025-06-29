# Shopping Mall – フロントエンド（React + Vite + Tailwind CSS）

## 概要
- React (Vite) と Tailwind CSS で構築されたショッピングサイトの UI
- 画面遷移、API 呼び出し、状態管理、フォーム検証、各種コンポーネントを提供

## 主な機能
- 会員登録・ログイン（react-hook-form + JWT ヘッダー自動追加）
- 商品一覧表示・検索・フィルター
- 商品詳細ページ（レビュー投稿・表示）
- カート追加・削除機能
- 購入履歴表示
- お問い合わせフォーム・FAQ
- 広告バナー・スライダーコンポーネント
- ルートガード（ProtectedRoute／NotAuthRoute）

## 技術スタック
- React (Vite)  
- Tailwind CSS  
- Redux Toolkit + redux-persist  
- React Router v6  
- react-hook-form, react-toastify  
- axios (withCredentials, CSRF 自動送信, JWT ヘッダー)  
- dayjs, qs  

## セットアップ
1. リポジトリをクローン  
2. 依存パッケージをインストール  
3. `.env` に `VITE_SERVER_URL` を設定  
4. `npm run dev` で開発サーバー起動  
5. `npm run build` でプロダクションビルド

## デプロイ
- Vercel と GitHub を連携して自動デプロイ  
- 環境変数は Vercel ダッシュボードで管理

## ライセンス
- MIT License
