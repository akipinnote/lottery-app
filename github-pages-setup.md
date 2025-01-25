# GitHub Pages設定の緊急確認手順

## 現在の状態
- gh-pagesブランチにファイルは存在する
- HTTPステータス200で応答あり
- コンテンツが正しく配信されていない

## 確認手順
1. GitHubリポジトリの設定を確認
   - リポジトリページで Settings タブをクリック
   - 左サイドバーの "Pages" をクリック
   - "Source" セクションを確認

2. 必要な設定
   - Source: Deploy from a branch
   - Branch: gh-pages
   - フォルダ: / (root)
   - Save ボタンをクリック

3. デプロイ状態の確認
   - "GitHub Pages" セクションの上部でデプロイ状態を確認
   - "Your site is published at https://akipinnote.github.io/lottery-app/" という表示があるはず

4. キャッシュクリア手順
   - ブラウザのプライベートウィンドウで開く
   - シフト+リロードで強制リフレッシュ
   - または ?timestamp=<現在時刻> をURLに追加

## トラブルシューティング
1. Settings > Pages で現在の設定を確認
2. gh-pagesブランチの内容を確認
3. デプロイログを確認
4. 必要に応じて再デプロイを実行

## デプロイ再実行コマンド
```bash
git checkout gh-pages
git clean -fd
cp index.html style.css app.js .
git add index.html style.css app.js
git commit -m "Re-deploy $(date)"
git push origin gh-pages --force
git checkout main
```

## 注意事項
- 設定変更後、反映まで数分かかることがあります
- GitHub側でキャッシュが使用される場合があります
- エラーが発生した場合は GitHub Status (https://www.githubstatus.com/) で障害情報を確認