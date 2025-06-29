# Shopping Mall – オンラインショッピングサイト フロントエンド（React + Vite + Tailwind CSS）

## 概要  
本リポジトリは、React (Vite) と Tailwind CSS をベースに構築されたショッピングサイトのフロントエンドです。  
画面遷移、API 呼び出し、状態管理、フォームバリデーション、UI コンポーネント、お気に入り機能などを提供します。

## 主な機能  
- 会員登録・ログイン・ログアウト（react-hook-form + JWT ヘッダー自動付与）  
- 商品一覧表示・検索・絞り込み  
- 商品詳細ページ（画像スライダー、レビュー投稿・表示）  
- カート追加・削除・数量変更  
- 購入履歴確認ページ  
- お気に入り（Wishlist）機能  
- お問い合わせフォーム・FAQ 表示  
- 広告バナー・動画スライダーコンポーネント  
- ルートガード（ProtectedRoute / NotAuthRoute）

## 使用技術スタック  
- **React** (Vite)  
- **Tailwind CSS**  
- **Redux Toolkit** + **redux-persist**  
- **React Router v6**  
- **react-hook-form**, **react-toastify**, **react-image-gallery**  
- **axios**（withCredentials、CSRF トークン自動送信、JWT ヘッダー）  
- **dayjs**, **qs**

## 注意事項 
- CSRF トークンは axios インスタンスが自動的に `x-xsrf-token` ヘッダーに設定します。  

