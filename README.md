# Kauuru - フロントエンド（React + Vite + Tailwind CSS）

## 概要  
本リポジトリは、React (Vite) と Tailwind CSS をベースに構築されたショッピングサイトのフロントエンドです。  
画面遷移、API 呼び出し、状態管理、フォームバリデーション、UI コンポーネント、お気に入り機能などを提供します。

## 主な機能  
- 会員登録・ログイン・ログアウト（react-hook-form + JWT ヘッダー自動付与）  
- 商品一覧表示・検索・絞り込み（キーワード／カテゴリ／ページネーション）  
- 商品詳細表示（画像スライダー、レビュー投稿・表示）  
- カート機能（追加・削除・数量変更）  
- 購入履歴表示  
- ウィッシュリスト（お気に入り登録・解除・一覧表示）  
- レビュー投稿・取得（購入済みユーザーのみ）  
- お問い合わせ投稿・取得  
- FAQ 表示  
- 広告バナー・動画スライダーコンポーネント  
- ルートガード（ProtectedRoute / NotAuthRoute / AdminProtectedRoutes）  
- 商品アップロード（画像アップロード／FileUpload コンポーネント）  
- マイプロダクト管理（自分が出品した商品の編集・削除）  
- 掲示板機能（コメント投稿・表示／Board コンポーネント）  
- グローバルナビゲーション（Navbar・Footer）  
- カスタムフック（useConfirmAlert, usePageTitle など）  
- 共通 UI コンポーネント（Button, Input, Modal など）  
- 状態管理（Redux Toolkit + redux-persist）  
- HTTP クライアント設定（axios withCredentials／CSRF／JWT）  
- 通知（react-toastify）  
- 日付操作（dayjs）／クエリ操作（qs）

## フロントエンドのデプロイ
- Vercel を使用し、`main` ブランチに push すると自動的に再デプロイされます。

## 使用技術スタック  
- **React** (Vite)  
- **Tailwind CSS**  
- **Redux Toolkit** + **redux-persist**  
- **React Router v6**  
- **react-hook-form**  
- **react-toastify**  
- **react-image-gallery**  
- **axios**（withCredentials、CSRFトークン自動送信、JWT ヘッダー）  
- **dayjs**  
- **qs**  



